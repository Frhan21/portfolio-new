import { unstable_cache } from 'next/cache';
import config from '@payload-config';
import { getPayload } from 'payload';

import type {
  Category,
  Certificate,
  Experience,
  PortfolioProfile,
  Project,
} from '@/payload-types';

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export const getCachedProfile = unstable_cache(
  async (): Promise<PortfolioProfile> => {
    const payload = await getPayload({ config });
    const profile = await payload.findGlobal({ slug: 'portfolio-profile' });
    return (
      profile ?? {
        id: 0,
        displayName: 'M Farhan Ramadhan',
        headline: '',
        bio: '',
        email: '',
        updatedAt: '',
      }
    );
  },
  ['portfolio-profile'],
  { revalidate: 120, tags: ['profile'] }
);

export const getCachedProjects = unstable_cache(
  async (limit: number, page: number): Promise<PaginatedResult<Project>> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      page,
      sort: '-createdAt',
    });
    return {
      items: res.docs,
      meta: {
        total: res.totalDocs,
        page: res.page ?? page,
        totalPages: res.totalPages ?? 1,
      },
    };
  },
  ['projects', 'paginated'],
  { revalidate: 120, tags: ['projects'] }
);

export const getCachedAllProjects = unstable_cache(
  async (limit = 50): Promise<Project[]> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      page: 1,
      sort: '-createdAt',
    });
    return res.docs;
  },
  ['projects', 'all'],
  { revalidate: 120, tags: ['projects'] }
);

export const getCachedProjectBySlug = unstable_cache(
  async (slug: string): Promise<Project | null> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: 1,
      where: { slug: { equals: slug } },
    });
    return res.docs[0] ?? null;
  },
  ['projects', 'by-slug'],
  { revalidate: 120, tags: ['projects'] }
);

export const getCachedCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'categories',
      depth: 0,
      limit: 100,
      sort: 'title',
    });
    return res.docs;
  },
  ['categories'],
  { revalidate: 120, tags: ['categories'] }
);

export const getCachedCertificates = unstable_cache(
  async (
    limit: number,
    page: number
  ): Promise<PaginatedResult<Certificate>> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'certificates',
      depth: 1,
      limit,
      page,
      sort: '-issueDate',
    });
    return {
      items: res.docs,
      meta: {
        total: res.totalDocs,
        page: res.page ?? page,
        totalPages: res.totalPages ?? 1,
      },
    };
  },
  ['certificates', 'paginated'],
  { revalidate: 120, tags: ['certificates'] }
);

export const getCachedAllCertificates = unstable_cache(
  async (limit = 20): Promise<Certificate[]> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'certificates',
      depth: 1,
      limit,
      page: 1,
      sort: '-issueDate',
    });
    return res.docs;
  },
  ['certificates', 'all'],
  { revalidate: 120, tags: ['certificates'] }
);

export const getCachedExperiences = unstable_cache(
  async (limit: number, page: number): Promise<PaginatedResult<Experience>> => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'experiences',
      depth: 0,
      limit,
      page,
      sort: '-startDate',
    });
    return {
      items: res.docs,
      meta: {
        total: res.totalDocs,
        page: res.page ?? page,
        totalPages: res.totalPages ?? 1,
      },
    };
  },
  ['experiences', 'paginated'],
  { revalidate: 120, tags: ['experiences'] }
);
