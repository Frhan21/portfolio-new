import type { CollectionConfig } from 'payload';

import { revalidateCollection } from '../revalidate';

export const Categories: CollectionConfig = {
  slug: 'categories',
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCollection('categories');
        return doc;
      },
    ],
    afterDelete: [() => revalidateCollection('categories')],
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
};
