import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const globalPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = new URL(process.env.DATABASE_URL!);
const ca = process.env.DATABASE_CA_CERT?.replace(/\\n/g, '\n');

if (!ca) throw new Error('DATABASE_CA_CERT belum dikonfigurasi');
databaseUrl.searchParams.delete('sslmode');

const adapter = new PrismaPg({
  connectionString: databaseUrl.toString(),
  ssl: {
    rejectUnauthorized: true,
    ca,
  },
});

const prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;

export default prisma;
