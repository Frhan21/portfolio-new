import { PGVectorStore } from '@langchain/pgvector';
import embeddings from './embeddings';

let storePromise: ReturnType<typeof PGVectorStore.initialize> | undefined;

export const vectorStore = async () => {
  if (storePromise) return storePromise;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL belum dikonfigurasi');
  }
  const url = new URL(connectionString);
  url.searchParams.delete('sslmode');

  const ca = process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n');
  if (!ca) {
    throw new Error('DATABASE_CA_CERT belum dikonfigurasi');
  }
  const config = {
    tableName: 'portfolio_vector',
    columns: {
      idColumnName: 'id',
      contentColumnName: 'content',
      vectorColumnName: 'embedding',
      metadataColumnName: 'metadata',
    },
    postgresConnectionOptions: {
      connectionString: url.toString(),
      ssl: {
        rejectUnauthorized: true,
        ca,
      },
    },
  };

  storePromise = PGVectorStore.initialize(embeddings, config);
  try {
    return await storePromise;
  } catch (error) {
    storePromise = undefined;
    throw error;
  }
};
