import { Fragment, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface LexNode {
  type?: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
  children?: LexNode[];
}

const BOLD = 1;
const ITALIC = 2;
const STRIKETHROUGH = 8;
const UNDERLINE = 16;
const CODE = 32;

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
      const Tag = (node.tag ?? 'h2') as 'h2';
      return <Tag key={key}>{children}</Tag>;
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
  const root = content as LexNode;
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
