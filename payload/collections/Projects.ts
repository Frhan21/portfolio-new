import type { CollectionConfig, PayloadRequest } from 'payload';

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const uniqueSlug = async (
  req: PayloadRequest,
  base: string,
  excludeId?: string
) => {
  let candidate = base;
  let counter = 1;
  for (;;) {
    const { docs } = await req.payload.find({
      collection: 'projects',
      depth: 0,
      limit: 1,
      where: { slug: { equals: candidate } },
    });
    const hit = docs[0];
    if (!hit || String(hit.id) === String(excludeId)) return candidate;
    counter += 1;
    candidate = `${base}-${counter}`;
  }
};

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'tags', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Dibiarkan kosong agar dibuat otomatis dari judul',
      },
      hooks: {
        beforeValidate: [
          async ({ data, operation, originalDoc, req, value }) => {
            if (value) return value;
            const title = data?.title ?? originalDoc?.title ?? 'project';
            return uniqueSlug(req, slugify(String(title)), originalDoc?.id);
          },
        ],
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Ringkasan singkat untuk kartu projek & meta description',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'demo',
      type: 'text',
      validate: (value: string | null | undefined) =>
        !value || /^https?:\/\//.test(value)
          ? true
          : 'URL harus dimulai dengan http(s)://',
    },
    {
      name: 'github',
      type: 'text',
      validate: (value: string | null | undefined) =>
        !value || /^https?:\/\//.test(value)
          ? true
          : 'URL harus dimulai dengan http(s)://',
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
};
