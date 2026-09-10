'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $applyNodeReplacement,
  $getNodeByKey,
  DecoratorNode,
  type LexicalNode,
  type NodeKey,
  type SerializedLexicalNode,
  type Spread,
} from 'lexical';
import { FileText, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

export type DocumentationImagePayload = {
  src: string;
  publicId: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  pendingId?: string;
  previewUrl?: string;
};

export type PdfAttachmentPayload = {
  url: string;
  publicId: string;
  fileName: string;
  size: number;
  pendingId?: string;
};

type SerializedDocumentationImageNode = Spread<
  DocumentationImagePayload & { type: 'documentation-image'; version: 1 },
  SerializedLexicalNode
>;

type SerializedPdfAttachmentNode = Spread<
  PdfAttachmentPayload & { type: 'pdf-attachment'; version: 1 },
  SerializedLexicalNode
>;

const formatBytes = (size: number) =>
  size < 1024 * 1024
    ? `${Math.ceil(size / 1024)} KB`
    : `${(size / 1024 / 1024).toFixed(1)} MB`;

function RemoveNodeButton({ nodeKey }: { nodeKey: NodeKey }) {
  const [editor] = useLexicalComposerContext();

  return (
    <button
      type="button"
      title="Hapus dari konten"
      onClick={() => {
        editor.update(() => $getNodeByKey(nodeKey)?.remove());
      }}
      className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-full bg-slate-950/75 text-white transition-colors hover:bg-red-600"
    >
      <Trash2 className="size-4" />
      <span className="sr-only">Hapus dari konten</span>
    </button>
  );
}

function DocumentationImage({
  nodeKey,
  src,
  alt,
  caption,
  width,
  height,
  pendingId,
  previewUrl,
}: DocumentationImagePayload & { nodeKey: NodeKey }) {
  return (
    <figure className="relative my-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt={alt}
          className="h-auto max-h-[420px] w-full rounded-lg object-contain"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full rounded-lg object-cover"
        />
      )}
      {pendingId && (
        <span className="absolute top-3 left-3 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
          Draft — diunggah saat disimpan
        </span>
      )}
      {caption && (
        <figcaption className="px-2 pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
      <RemoveNodeButton nodeKey={nodeKey} />
    </figure>
  );
}

function PdfAttachment({
  nodeKey,
  fileName,
  size,
  pendingId,
}: PdfAttachmentPayload & { nodeKey: NodeKey }) {
  return (
    <div className="relative my-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 pr-14 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
        <FileText className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
          {fileName}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {pendingId
            ? 'PDF · Belum diunggah — tersimpan saat project disimpan'
            : `PDF · ${formatBytes(size)}`}
        </p>
      </div>
      <RemoveNodeButton nodeKey={nodeKey} />
    </div>
  );
}

export class DocumentationImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __publicId: string;
  __alt: string;
  __caption?: string;
  __width: number;
  __height: number;
  __pendingId?: string;
  __previewUrl?: string;

  static getType() {
    return 'documentation-image';
  }

  static clone(node: DocumentationImageNode) {
    return new DocumentationImageNode(
      {
        src: node.__src,
        publicId: node.__publicId,
        alt: node.__alt,
        caption: node.__caption,
        width: node.__width,
        height: node.__height,
        pendingId: node.__pendingId,
        previewUrl: node.__previewUrl,
      },
      node.__key
    );
  }

  static importJSON(node: SerializedDocumentationImageNode) {
    return $createDocumentationImageNode(node);
  }

  constructor(payload: DocumentationImagePayload, key?: NodeKey) {
    super(key);
    this.__src = payload.src;
    this.__publicId = payload.publicId;
    this.__alt = payload.alt;
    this.__caption = payload.caption;
    this.__width = payload.width;
    this.__height = payload.height;
    this.__pendingId = payload.pendingId;
    this.__previewUrl = payload.previewUrl;
  }

  exportJSON(): SerializedDocumentationImageNode {
    return {
      ...super.exportJSON(),
      type: 'documentation-image',
      version: 1,
      src: this.__src,
      publicId: this.__publicId,
      alt: this.__alt,
      caption: this.__caption,
      width: this.__width,
      height: this.__height,
      pendingId: this.__pendingId,
      previewUrl: this.__previewUrl,
    };
  }

  createDOM() {
    return document.createElement('div');
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <DocumentationImage
        nodeKey={this.__key}
        src={this.__src}
        alt={this.__alt}
        caption={this.__caption}
        width={this.__width}
        height={this.__height}
        pendingId={this.__pendingId}
        previewUrl={this.__previewUrl}
        publicId={this.__publicId}
      />
    );
  }
}

export class PdfAttachmentNode extends DecoratorNode<ReactNode> {
  __url: string;
  __publicId: string;
  __fileName: string;
  __size: number;
  __pendingId?: string;

  static getType() {
    return 'pdf-attachment';
  }

  static clone(node: PdfAttachmentNode) {
    return new PdfAttachmentNode(
      {
        url: node.__url,
        publicId: node.__publicId,
        fileName: node.__fileName,
        size: node.__size,
        pendingId: node.__pendingId,
      },
      node.__key
    );
  }

  static importJSON(node: SerializedPdfAttachmentNode) {
    return $createPdfAttachmentNode(node);
  }

  constructor(payload: PdfAttachmentPayload, key?: NodeKey) {
    super(key);
    this.__url = payload.url;
    this.__publicId = payload.publicId;
    this.__fileName = payload.fileName;
    this.__size = payload.size;
    this.__pendingId = payload.pendingId;
  }

  exportJSON(): SerializedPdfAttachmentNode {
    return {
      ...super.exportJSON(),
      type: 'pdf-attachment',
      version: 1,
      url: this.__url,
      publicId: this.__publicId,
      fileName: this.__fileName,
      size: this.__size,
      pendingId: this.__pendingId,
    };
  }

  createDOM() {
    return document.createElement('div');
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <PdfAttachment
        nodeKey={this.__key}
        url={this.__url}
        publicId={this.__publicId}
        fileName={this.__fileName}
        size={this.__size}
        pendingId={this.__pendingId}
      />
    );
  }
}

export const $createDocumentationImageNode = (
  payload: DocumentationImagePayload
) => $applyNodeReplacement(new DocumentationImageNode(payload));

export const $createPdfAttachmentNode = (payload: PdfAttachmentPayload) =>
  $applyNodeReplacement(new PdfAttachmentNode(payload));

export const $isDocumentationImageNode = (
  node: LexicalNode | null | undefined
): node is DocumentationImageNode => node instanceof DocumentationImageNode;

export const $isPdfAttachmentNode = (
  node: LexicalNode | null | undefined
): node is PdfAttachmentNode => node instanceof PdfAttachmentNode;
