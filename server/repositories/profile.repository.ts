import prisma from '@/lib/prisma';
import { PortfolioProfileInput } from '@/model/profile';

const profileId = 1;

export const find = () =>
  prisma.portfolioProfile.findUnique({ where: { id: profileId } });

export const upsert = (data: PortfolioProfileInput) =>
  prisma.portfolioProfile.upsert({
    where: { id: profileId },
    create: {
      id: profileId,
      ...data,
      cvUrl: data.cvUrl ?? null,
      githubUrl: data.githubUrl ?? null,
      linkedinUrl: data.linkedinUrl ?? null,
      instagramUrl: data.instagramUrl ?? null,
      twitterUrl: data.twitterUrl ?? null,
    },
    update: {
      ...data,
      cvUrl: data.cvUrl ?? null,
      githubUrl: data.githubUrl ?? null,
      linkedinUrl: data.linkedinUrl ?? null,
      instagramUrl: data.instagramUrl ?? null,
      twitterUrl: data.twitterUrl ?? null,
    },
  });
