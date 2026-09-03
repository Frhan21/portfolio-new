import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { getPayload } from 'payload';

import payloadConfig from '../payload.config';

const prisma = new PrismaClient();

const cleanTags = (raw: string[]): string[] => {
  const joined = raw.join(',');
  let items: string[] = [];
  try {
    const parsed = JSON.parse(joined) as unknown;
    items = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
  } catch {
    items = joined.split(',');
  }
  const cleaned = items
    .map((t) => t.replace(/[\[\]"]/g, '').trim())
    .filter(Boolean);
  return [...new Set(cleaned)];
};

const migrateImage = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  url: string,
  alt: string
): Promise<number> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch image gagal ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') ?? 'image/png';
  const ext = contentType.split('/')[1]?.split(';')[0] ?? 'png';
  const lastSegment = new URL(url).pathname.split('/').pop() ?? 'image';
  const filename = lastSegment.includes('.')
    ? lastSegment
    : `${lastSegment}.${ext}`;
  const tmp = path.join(os.tmpdir(), filename);
  await fs.writeFile(tmp, buf);
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    filePath: tmp,
  });
  await fs.unlink(tmp).catch(() => {});
  return media.id as number;
};

const clearCollection = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: Parameters<typeof payload.delete>[0]['collection']
) => {
  const existing = await payload.find({
    collection: slug,
    depth: 0,
    limit: 1000,
  });
  for (const doc of existing.docs) {
    await payload.delete({ collection: slug, id: doc.id as number });
  }
};

const main = async () => {
  const payload = await getPayload({ config: payloadConfig });

  const existing = await payload.count({ collection: 'projects' });
  if (existing.totalDocs > 0) {
    throw new Error(
      `Koleksi projects sudah berisi ${existing.totalDocs} dokumen. Migrasi dibatalkan.`
    );
  }

  // bersihkan sisa migrasi gagal sebelumnya
  await clearCollection(payload, 'categories');
  await clearCollection(payload, 'media');
  await clearCollection(payload, 'certificates');
  await clearCollection(payload, 'experiences');

  const drop = process.argv.includes('--drop');

  // 1. Categories
  const categories = await prisma.category.findMany();
  const categoryMap = new Map<string, number>();
  for (const c of categories) {
    const created = await payload.create({
      collection: 'categories',
      data: { title: c.title },
    });
    categoryMap.set(c.id, created.id as number);
  }
  console.log(`categories: ${categoryMap.size}`);

  // 2. Projects
  const projects = await prisma.project.findMany();
  for (const p of projects) {
    const mediaId = await migrateImage(payload, p.image, p.title);
    await payload.create({
      collection: 'projects',
      data: {
        title: p.title,
        summary: null,
        image: mediaId,
        tags: cleanTags(p.tags),
        category: categoryMap.get(p.categoryId),
        demo: p.demo,
        github: p.github,
      },
    });
  }
  console.log(`projects: ${projects.length}`);

  // 3. Certificates
  const certificates = await prisma.certificate.findMany();
  for (const c of certificates) {
    const mediaId = await migrateImage(payload, c.image, c.title);
    await payload.create({
      collection: 'certificates',
      data: {
        title: c.title,
        image: mediaId,
        issuer: c.issuer,
        issueDate: c.issuer_date.toISOString(),
        category: categoryMap.get(c.categoryId),
      },
    });
  }
  console.log(`certificates: ${certificates.length}`);

  // 4. Experiences
  const experiences = await prisma.experience.findMany();
  for (const e of experiences) {
    await payload.create({
      collection: 'experiences',
      data: {
        company: e.company,
        position: e.position,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate?.toISOString(),
        description: e.description,
        badges: cleanTags(e.badges),
      },
    });
  }
  console.log(`experiences: ${experiences.length}`);

  // 5. Portfolio profile (global)
  const profile = await prisma.portfolioProfile.findFirst();
  if (profile) {
    await payload.updateGlobal({
      slug: 'portfolio-profile',
      data: {
        displayName: profile.displayName,
        headline: profile.headline,
        bio: profile.bio,
        email: profile.email,
        cvUrl: profile.cvUrl,
        githubUrl: profile.githubUrl,
        linkedinUrl: profile.linkedinUrl,
        instagramUrl: profile.instagramUrl,
        twitterUrl: profile.twitterUrl,
      },
    });
    console.log('portfolio-profile: ok');
  }

  // 6. Opsional: drop tabel lama
  if (drop) {
    await prisma.$executeRawUnsafe(
      `DROP TABLE IF EXISTS public.refresh_tokens, public.certificates, public.projects,
       public.experiences, public.categories, public.portfolio_profile, public.users CASCADE`
    );
    console.log('tabel legacy di-drop');
  }

  console.log('Migrasi selesai. Admin baru dibuat via /admin (first-run).');
};

main()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
