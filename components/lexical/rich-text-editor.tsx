'use client';

import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingNode,
  QuoteNode,
} from '@lexical/rich-text';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from '@lexical/list';
import { LinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $setBlocksType } from '@lexical/selection';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  type ElementNode,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { cn } from '@/lib/utils';
import {
  $createDocumentationImageNode,
  $createPdfAttachmentNode,
  DocumentationImageNode,
  PdfAttachmentNode,
} from './media-nodes';
import { FileUp, ImagePlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { PendingMediaKind } from '@/lib/pending-media';

type EditorValue = unknown;

interface RichTextEditorProps {
  value?: EditorValue;
  onChange?: (value: EditorValue) => void;
  onAddPendingFile?: (
    pendingId: string,
    file: File,
    kind: PendingMediaKind
  ) => void;
}

type ActiveState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  code: boolean;
  h1: boolean;
  h2: boolean;
  h3: boolean;
  quote: boolean;
  ul: boolean;
  ol: boolean;
};

const INACTIVE: ActiveState = {
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  code: false,
  h1: false,
  h2: false,
  h3: false,
  quote: false,
  ul: false,
  ol: false,
};

const toolbarBtn =
  'h-8 min-w-8 px-2 text-xs font-semibold gap-0 rounded-lg border-none bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800';
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function Toolbar({
  onAddPendingFile,
}: {
  onAddPendingFile?: (
    pendingId: string,
    file: File,
    kind: PendingMediaKind
  ) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const [active, setActive] = useState<ActiveState>(INACTIVE);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        const state = { ...INACTIVE };
        if ($isRangeSelection(selection)) {
          state.bold = selection.hasFormat('bold');
          state.italic = selection.hasFormat('italic');
          state.underline = selection.hasFormat('underline');
          state.strike = selection.hasFormat('strikethrough');
          state.code = selection.hasFormat('code');

          let node: import('lexical').LexicalNode | null =
            selection.anchor.getNode();
          while (node) {
            if ($isHeadingNode(node)) {
              const tag = node.getTag();
              if (tag === 'h1') state.h1 = true;
              if (tag === 'h2') state.h2 = true;
              if (tag === 'h3') state.h3 = true;
            }
            if ($isQuoteNode(node)) state.quote = true;
            if ($isListNode(node)) {
              state.ul = state.ul || node.getListType() === 'bullet';
              state.ol = state.ol || node.getListType() === 'number';
            }
            node = node.getParent();
          }
        }
        setActive(state);
      });
    });
  }, [editor]);

  const setBlock = (factory: () => ElementNode) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, factory);
      }
    });
  };

  const insertMedia = (
    create: () => DocumentationImageNode | PdfAttachmentNode
  ) => {
    editor.update(() => {
      const node = create();
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $insertNodes([node]);
      } else {
        $getRoot().append(node);
      }
      const paragraph = $createParagraphNode();
      node.insertAfter(paragraph);
      paragraph.select();
    });
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type) || file.size > 5 * 1024 * 1024) {
      toast.error('Gunakan gambar JPEG, PNG, atau WebP maksimal 5MB');
      return;
    }
    const alt = window.prompt('Teks alternatif gambar (wajib):')?.trim();
    if (!alt) {
      toast.error('Teks alternatif gambar wajib diisi');
      return;
    }
    const caption = window.prompt('Caption gambar (opsional):')?.trim();
    const pendingId = crypto.randomUUID();
    const previewUrl = URL.createObjectURL(file);
    try {
      insertMedia(() =>
        $createDocumentationImageNode({
          src: previewUrl,
          publicId: '',
          alt,
          caption: caption || undefined,
          width: 0,
          height: 0,
          pendingId,
          previewUrl,
        })
      );
      onAddPendingFile?.(pendingId, file, 'image');
      toast.success('Gambar ditambahkan — diunggah saat project disimpan');
    } catch {
      URL.revokeObjectURL(previewUrl);
      toast.error('Gagal menambahkan gambar');
    }
  };

  const handlePdf = (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf' || file.size > 10 * 1024 * 1024) {
      toast.error('Gunakan dokumen PDF maksimal 10MB');
      return;
    }
    const pendingId = crypto.randomUUID();
    try {
      insertMedia(() =>
        $createPdfAttachmentNode({
          url: '',
          publicId: '',
          fileName: file.name,
          size: file.size,
          pendingId,
        })
      );
      onAddPendingFile?.(pendingId, file, 'pdf');
      toast.success('PDF ditambahkan — diunggah saat project disimpan');
    } catch {
      toast.error('Gagal menambahkan PDF');
    }
  };

  const btn = (
    label: React.ReactNode,
    isActive: boolean,
    onClick: () => void,
    title: string
  ) => (
    <button
      key={title}
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        toolbarBtn,
        'inline-flex items-center justify-center',
        isActive &&
          'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/60">
      {btn(
        '↺',
        false,
        () => editor.dispatchCommand(UNDO_COMMAND, undefined),
        'Undo'
      )}
      {btn(
        '↻',
        false,
        () => editor.dispatchCommand(REDO_COMMAND, undefined),
        'Redo'
      )}
      <span className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600" />
      {btn(
        'B',
        active.bold,
        () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'),
        'Bold'
      )}
      {btn(
        'I',
        active.italic,
        () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'),
        'Italic'
      )}
      {btn(
        'U',
        active.underline,
        () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'),
        'Underline'
      )}
      {btn(
        'S',
        active.strike,
        () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough'),
        'Strikethrough'
      )}
      {btn(
        '</>',
        active.code,
        () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code'),
        'Code'
      )}
      <span className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600" />
      {btn(
        'H1',
        active.h1,
        () => setBlock(() => $createHeadingNode('h1')),
        'Heading 1'
      )}
      {btn(
        'H2',
        active.h2,
        () => setBlock(() => $createHeadingNode('h2')),
        'Heading 2'
      )}
      {btn(
        'H3',
        active.h3,
        () => setBlock(() => $createHeadingNode('h3')),
        'Heading 3'
      )}
      {btn('❝', active.quote, () => setBlock($createQuoteNode), 'Quote')}
      {btn(
        '•',
        active.ul,
        () => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
        'Bullet list'
      )}
      {btn(
        '1.',
        active.ol,
        () => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
        'Numbered list'
      )}
      <span className="mx-1 h-5 w-px bg-slate-300 dark:bg-slate-600" />
      {btn(
        '⇤',
        false,
        () => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined),
        'Outdent'
      )}
      {btn(
        '⇥',
        false,
        () => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined),
        'Indent'
      )}
      {btn(
        '🔗',
        false,
        () => {
          const url = window.prompt('Masukkan URL:');
          if (url === null) return;
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, url || null);
        },
        'Link'
      )}
      {btn('¶', false, () => setBlock($createParagraphNode), 'Paragraph')}
      <button
        type="button"
        title="Tambah gambar"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => imageInputRef.current?.click()}
        className={cn(
          toolbarBtn,
          'inline-flex size-8 items-center justify-center'
        )}
      >
        <ImagePlus className="size-4" />
        <span className="sr-only">Tambah gambar</span>
      </button>
      <button
        type="button"
        title="Tambah PDF"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => pdfInputRef.current?.click()}
        className={cn(
          toolbarBtn,
          'inline-flex size-8 items-center justify-center'
        )}
      >
        <FileUp className="size-4" />
        <span className="sr-only">Tambah PDF</span>
      </button>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          handleImage(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      <input
        ref={pdfInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(event) => {
          handlePdf(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </div>
  );
}

const theme = {
  heading: {
    h1: 'text-3xl font-bold my-4',
    h2: 'text-2xl font-bold my-3',
    h3: 'text-xl font-semibold my-2',
  },
  quote: 'border-l-4 border-slate-300 pl-4 italic my-3 dark:border-slate-600',
  list: {
    ul: 'list-disc pl-6 my-2',
    ol: 'list-decimal pl-6 my-2',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    strikethrough: 'line-through',
    underline: 'underline',
    code: 'font-mono text-sm bg-slate-100 px-1 rounded dark:bg-slate-800',
  },
  link: 'text-orange-500 underline',
  paragraph: 'my-2',
};

export function RichTextEditor({
  value,
  onChange,
  onAddPendingFile,
}: RichTextEditorProps) {
  const initialConfig = {
    namespace: 'ProjectContent',
    theme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      DocumentationImageNode,
      PdfAttachmentNode,
    ],
    onError: (error: Error) => {
      console.error(error);
    },
    editorState: value ? JSON.stringify(value) : null,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="rounded-xl border border-slate-200 dark:border-slate-700">
        <Toolbar onAddPendingFile={onAddPendingFile} />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[220px] rounded-b-xl bg-white px-4 py-3 text-sm outline-none dark:bg-slate-900" />
          }
          placeholder={
            <div className="pointer-events-none absolute top-3 left-4 text-sm text-slate-400">
              Tulis cerita projeknya di sini...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin
          onChange={(editorState) => onChange?.(editorState.toJSON())}
        />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
      </div>
    </LexicalComposer>
  );
}
