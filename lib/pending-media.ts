export type PendingMediaKind = 'image' | 'pdf';

export type PendingMediaItem = {
  file: File;
  kind: PendingMediaKind;
};

export type UploadedMedia = {
  kind: PendingMediaKind;
  pendingId: string;
  src?: string;
  url?: string;
  publicId: string;
  width?: number;
  height?: number;
};

export type UploadedMediaRef = {
  publicId: string;
  resourceType: 'image' | 'raw';
};

type LexicalNodeRecord = Record<string, unknown>;

// editorState.toJSON() membungkus node di { root: {...} }; traversal harus mulai dari root-nya.
const lexicalRoot = (content: unknown): LexicalNodeRecord | null => {
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return null;
  }
  const value = content as LexicalNodeRecord;
  const root = value.root;
  return root && typeof root === 'object' && !Array.isArray(root)
    ? (root as LexicalNodeRecord)
    : value;
};

const walkLexicalTree = (
  node: unknown,
  visit: (value: LexicalNodeRecord) => void
) => {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    node.forEach((child) => walkLexicalTree(child, visit));
    return;
  }
  const value = node as LexicalNodeRecord;
  visit(value);
  if (Array.isArray(value.children)) {
    value.children.forEach((child) => walkLexicalTree(child, visit));
  }
};

export const collectPendingIds = (content: unknown): Set<string> => {
  const ids = new Set<string>();
  const root = lexicalRoot(content);
  if (!root) return ids;

  walkLexicalTree(root, (value) => {
    if (typeof value.pendingId === 'string' && value.pendingId) {
      ids.add(value.pendingId);
    }
  });
  return ids;
};

export const uploadPendingMedia = async (
  items: Map<string, PendingMediaItem>
): Promise<{
  uploads: Map<string, UploadedMedia>;
  refs: UploadedMediaRef[];
}> => {
  const uploads = new Map<string, UploadedMedia>();
  const refs: UploadedMediaRef[] = [];

  for (const [pendingId, item] of items) {
    const formData = new FormData();
    formData.append('kind', item.kind);
    formData.append('file', item.file);
    const response = await fetch('/api/v1/project-media', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      throw new Error(
        result?.error || result?.message || 'Gagal mengunggah media'
      );
    }
    uploads.set(pendingId, { kind: item.kind, pendingId, ...result.data });
    refs.push({
      publicId: result.data.publicId,
      resourceType: item.kind === 'image' ? 'image' : 'raw',
    });
  }

  return { uploads, refs };
};

export const rollbackUploadedMedia = async (refs: UploadedMediaRef[]) => {
  await Promise.allSettled(
    refs.map((ref) =>
      fetch(
        `/api/v1/project-media?publicId=${encodeURIComponent(ref.publicId)}&resourceType=${ref.resourceType}`,
        { method: 'DELETE' }
      )
    )
  );
};

export const replacePendingMedia = (
  content: unknown,
  uploads: Map<string, UploadedMedia>
): unknown => {
  const finalize = (node: unknown): unknown => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return node;
    const value = { ...(node as Record<string, unknown>) };

    if (Array.isArray(value.children)) {
      value.children = value.children
        .map(finalize)
        .filter((child) => child !== null);
    }

    if (
      (value.type === 'documentation-image' ||
        value.type === 'pdf-attachment') &&
      typeof value.pendingId === 'string'
    ) {
      const upload = uploads.get(value.pendingId);
      if (!upload) return null;
      delete value.pendingId;
      delete value.previewUrl;
      if (upload.kind === 'image') {
        value.src = upload.src;
        value.publicId = upload.publicId;
        value.width = upload.width;
        value.height = upload.height;
      } else {
        value.url = upload.url;
        value.publicId = upload.publicId;
      }
    }

    return value;
  };

  const root = lexicalRoot(content);
  if (!root || root === content) return content;
  const rootValue = { ...root };
  if (Array.isArray(rootValue.children)) {
    rootValue.children = rootValue.children
      .map(finalize)
      .filter((child) => child !== null);
  }
  return { ...(content as Record<string, unknown>), root: rootValue };
};
