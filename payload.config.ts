import { postgresAdapter } from '@payloadcms/db-postgres';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

import { cloudinaryAdapter } from './payload/adapters/cloudinary';
import { Categories } from './payload/collections/Categories';
import { Certificates } from './payload/collections/Certificates';
import { Experiences } from './payload/collections/Experiences';
import { Media } from './payload/collections/Media';
import { Projects } from './payload/collections/Projects';
import { Users } from './payload/collections/Users';
import { PortfolioProfile } from './payload/globals/PortfolioProfile';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Media, Projects, Certificates, Experiences, Users],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL?.includes('uselibpqcompat')
        ? process.env.DATABASE_URL
        : `${process.env.DATABASE_URL}${process.env.DATABASE_URL?.includes('?') ? '&' : '?'}uselibpqcompat=true`,
    },
    push: process.env.NODE_ENV !== 'production',
    schemaName: 'payload',
  }),
  editor: lexicalEditor(),
  globals: [PortfolioProfile],
  graphQL: { disable: true },
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: { adapter: cloudinaryAdapter(), disableLocalStorage: true },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'dev-payload-secret',
  telemetry: false,
  typescript: { outputFile: 'payload-types.ts' },
});
