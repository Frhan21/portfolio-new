import 'dotenv/config';
import { getPayload } from 'payload';

import payloadConfig from '../payload.config';

const main = async () => {
  const payload = await getPayload({ config: payloadConfig });
  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 3,
    sort: '-createdAt',
  });
  for (const d of docs) console.log(`${d.id}: ${d.url}`);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
