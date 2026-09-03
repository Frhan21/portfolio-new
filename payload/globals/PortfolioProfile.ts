import type { GlobalConfig } from 'payload';

export const PortfolioProfile: GlobalConfig = {
  slug: 'portfolio-profile',
  label: 'Portfolio Profile',
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'cvUrl',
      type: 'text',
      validate: (value: string | null | undefined) =>
        !value || /^https?:\/\//.test(value)
          ? true
          : 'URL harus dimulai dengan http(s)://',
    },
    {
      name: 'githubUrl',
      type: 'text',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
    },
    {
      name: 'instagramUrl',
      type: 'text',
    },
    {
      name: 'twitterUrl',
      type: 'text',
    },
  ],
};
