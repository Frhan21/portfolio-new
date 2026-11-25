import { describe, expect, it } from 'vitest';

import { collectPendingIds, replacePendingMedia } from './pending-media';

// Fixture meniru bentuk JSON asli yang tersimpan di kolom projects.content:
// wrapper { root } dengan media draft tersarang di dalam paragraph
// (lihat docs/issue/deferred-media-upload-fix/spec.md — bug A).
const draftImage = (id: string) => ({
  type: 'documentation-image',
  src: `blob:https://app.example.com/${id}`,
  publicId: '',
  alt: 'hero',
  width: 0,
  height: 0,
  version: 1,
  pendingId: id,
  previewUrl: `blob:https://app.example.com/${id}`,
});

const realShape = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: null,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          draftImage('id-a'),
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [draftImage('id-b')],
          },
        ],
      },
    ],
  },
};

describe('collectPendingIds', () => {
  it('menemukan semua pendingId di wrapper {root}, termasuk yang bersarang', () => {
    expect(collectPendingIds(realShape)).toEqual(new Set(['id-a', 'id-b']));
  });

  it('toleran terhadap input tidak valid', () => {
    expect(collectPendingIds(null)).toEqual(new Set());
    expect(collectPendingIds(undefined)).toEqual(new Set());
    expect(collectPendingIds('bukan json')).toEqual(new Set());
    expect(collectPendingIds([1, 2, 3])).toEqual(new Set());
  });
});

describe('replacePendingMedia', () => {
  const uploads = new Map([
    [
      'id-a',
      {
        kind: 'image' as const,
        pendingId: 'id-a',
        src: 'https://res.cloudinary.com/demo/img-a.webp',
        publicId: 'project-content/images/img-a',
        width: 1536,
        height: 695,
      },
    ],
  ]);

  it('menghapus pendingId/previewUrl dan mengisi hasil upload, termasuk node bersarang', () => {
    const content = {
      root: {
        type: 'root',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              draftImage('id-a'),
              {
                type: 'paragraph',
                version: 1,
                children: [draftImage('id-a')],
              },
            ],
          },
        ],
      },
    };

    const result = replacePendingMedia(content, uploads) as {
      root: { children: Array<Record<string, unknown>> };
    };
    const serialized = JSON.stringify(result);

    expect(serialized).not.toContain('pendingId');
    expect(serialized).not.toContain('previewUrl');
    const inner = (
      result.root.children[0].children as Array<Record<string, unknown>>
    )[0];
    expect(inner.src).toBe('https://res.cloudinary.com/demo/img-a.webp');
    expect(inner.publicId).toBe('project-content/images/img-a');
    expect(inner.width).toBe(1536);
    expect(inner.height).toBe(695);
  });

  it('men-drop node draft yang tidak punya hasil upload', () => {
    const result = replacePendingMedia(realShape, uploads) as {
      root: { children: Array<Record<string, unknown>> };
    };
    // id-a ter-finalize, id-b tidak ada upload-nya → node id-b di-drop
    const serialized = JSON.stringify(result);
    expect(serialized).toContain('project-content/images/img-a');
    expect(serialized).not.toContain('id-b');
  });

  it('mengembalikan input apa adanya untuk konten tidak valid', () => {
    expect(replacePendingMedia(null, uploads)).toBeNull();
  });
});
