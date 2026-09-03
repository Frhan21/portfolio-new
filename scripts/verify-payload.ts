import 'dotenv/config';
import { getPayload } from 'payload';

import payloadConfig from '../payload.config';

const main = async () => {
  const payload = await getPayload({ config: payloadConfig });
  for (const slug of [
    'categories',
    'projects',
    'certificates',
    'experiences',
    'users',
    'media',
  ]) {
    const { totalDocs } = await payload.count({ collection: slug });
    console.log(`${slug}: ${totalDocs}`);
  }
  const profile = await payload.findGlobal({ slug: 'portfolio-profile' });
  console.log('portfolio-profile:', profile.id ?? 'empty');
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
