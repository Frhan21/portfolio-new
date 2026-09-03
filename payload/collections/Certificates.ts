import type { CollectionConfig } from 'payload';

import { revalidateCollection } from '../revalidate';

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCollection('certificates');
        return doc;
      },
    ],
    afterDelete: [() => revalidateCollection('certificates')],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'issuer', 'issueDate', 'category'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'issuer',
      type: 'text',
      required: true,
    },
    {
      name: 'issueDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
  ],
};
