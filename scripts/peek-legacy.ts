import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const p = new PrismaClient();
const proj = await p.project.findMany({ take: 2 });
const certs = await p.certificate.findMany({ take: 1 });
const cats = await p.category.findMany();
const profile = await p.portfolioProfile.findFirst();
console.log(
  JSON.stringify({ proj, certs, cats, profile }, null, 1).slice(0, 1500)
);
await p.$disconnect();
