import { unstable_cache } from 'next/cache';
import { PortfolioProfile, PortfolioProfileInput } from '@/model/profile';
import * as ProfileRepository from '@/server/repositories/profile.repository';

export const defaultPortfolioProfile: PortfolioProfile = {
  id: 1,
  displayName: 'M. Farhan Ramadhan',
  headline: 'Full-stack engineer building reliable web products.',
  bio: 'Full-stack developer with hands-on experience building dashboard systems and web applications using Next.js, React, Go, Laravel, and Express.',
  email: 'hello@example.com',
  cvUrl: null,
  githubUrl: null,
  linkedinUrl: null,
  instagramUrl: null,
  twitterUrl: null,
  updatedAt: new Date(0),
};

const getCachedProfile = unstable_cache(
  async () => (await ProfileRepository.find()) ?? defaultPortfolioProfile,
  ['portfolio-profile'],
  { tags: ['portfolio-profile'], revalidate: 300 }
);

export const getPublicPortfolioProfile = () => getCachedProfile();

export const updatePortfolioProfile = (data: PortfolioProfileInput) =>
  ProfileRepository.upsert(data);
