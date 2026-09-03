import type { CollectionConfig } from 'payload';

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'position',
    defaultColumns: ['position', 'company', 'startDate', 'endDate'],
  },
  fields: [
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'Kosongkan jika masih berlangsung',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'badges',
      type: 'text',
      hasMany: true,
    },
  ],
};
