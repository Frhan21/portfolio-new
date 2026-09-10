import { Fragment, type ReactNode } from 'react';
import { Download, FileText } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

interface LexNode {
  type?: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
  src?: string;
  publicId?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  fileName?: string;
  size?: number;
  children?: LexNode[];
}

const BOLD = 1;
const ITALIC = 2;
const STRIKETHROUGH = 8;
const UNDERLINE = 16;
const CODE = 32;

const formatBytes = (size: number) =>
  size < 1024 * 1024
    ? `${Math.ceil(size / 1024)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;

const renderText = (node: LexNode): ReactNode => {
  let el: ReactNode = node.text ?? '';
  const format = node.format ?? 0;
  if (format & CODE) el = <code>{el}</code>;
  if (format & BOLD) el = <strong>{el}</strong>;
  if (format & ITALIC) el = <em>{el}</em>;
  if (format & UNDERLINE) el = <u>{el}</u>;
  if (format & STRIKETHROUGH) el = <s>{el}</s>;
  return el;
};

const renderNode = (node: LexNode, key: number): ReactNode => {
  const children = (node.children ?? []).map((child, i) =>
    renderNode(child, i)
  );

  switch (node.type) {
    case 'text':
      return <Fragment key={key}>{renderText(node)}</Fragment>;
    case 'linebreak':
      return <br key={key} />;
    case 'link':
      return (
        <a key={key} href={node.url} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    case 'paragraph':
      return <p key={key}>{children}</p>;
    case 'heading': {
      const Tag = node.tag === 'h3' ? 'h3' : 'h2';
      return (
        <Tag key={key} className={node.tag === 'h1' ? 'text-3xl' : undefined}>
          {children}
        </Tag>
      );
    }
    case 'quote':
      return <blockquote key={key}>{children}</blockquote>;
    case 'list':
      return node.listType === 'number' ? (
        <ol key={key}>{children}</ol>
      ) : (
        <ul key={key}>{children}</ul>
      );
    case 'listitem':
      return <li key={key}>{children}</li>;
    case 'horizontalrule':
      return <hr key={key} />;
    case 'documentation-image':
      if (
        !node.src?.startsWith('https://res.cloudinary.com/') ||
        !node.alt ||
        !node.width ||
        !node.height
      ) {
        return null;
      }
      return (
        <figure key={key} className="my-10">
          <Image
            src={node.src}
            alt={node.alt}
            width={node.width}
            height={node.height}
            className="h-auto w-full rounded-2xl border border-slate-200 object-cover dark:border-slate-800"
          />
          {node.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
              {node.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'pdf-attachment':
      if (
        !node.url?.startsWith('https://res.cloudinary.com/') ||
        !node.fileName ||
        typeof node.size !== 'number'
      ) {
        return null;
      }
      return (
        <a
          key={key}
          href={node.url}
          download={node.fileName}
          target="_blank"
          rel="noopener noreferrer"
          className="not-prose my-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 no-underline transition-colors hover:border-orange-300 hover:bg-orange-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:border-orange-500/40 dark:hover:bg-orange-500/10"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold">
              {node.fileName}
            </span>
            <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
              PDF · {formatBytes(node.size)}
            </span>
          </span>
          <Download
            className="size-5 shrink-0 text-orange-500"
            aria-hidden="true"
          />
        </a>
      );
    default:
      return <Fragment key={key}>{children}</Fragment>;
  }
};

export function LexicalRenderer({
  content,
  className,
}: {
  content?: unknown;
  className?: string;
}) {
  if (!content || typeof content !== 'object') return null;
  const root = (content as { root?: LexNode }).root;
  if (!root) return null;
  return (
    <div
      className={cn(
        'prose prose-slate max-w-none dark:prose-invert',
        className
      )}
    >
      {(root.children ?? []).map((child, i) => renderNode(child, i))}
    </div>
  );
}
