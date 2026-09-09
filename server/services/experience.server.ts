import { unstable_cache } from 'next/cache';
import * as ExperienceRepository from '@/server/repositories/experience.repository';
import {
  CreateExperienceInput,
  Experience,
  UpdateExperienceInput,
} from '@/model/experience';

interface ExperiencePageResult {
  items: Experience[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

const buildExperiencePage = async (
  limit: number,
  page: number
): Promise<ExperiencePageResult> => {
  const currentPage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (currentPage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    ExperienceRepository.findPaginated(safeLimit, skip),
    ExperienceRepository.count(),
  ]);

  return {
    items,
    meta: {
      total,
      page: currentPage,
      totalPages: Math.max(1, Math.ceil(total / safeLimit)),
    },
  };
};

export const getExperiences = (limit?: number) =>
  ExperienceRepository.findAll(limit);

export const getPaginatedExperiences = (limit: number, page: number) =>
  buildExperiencePage(limit, page);

export const getCachedPaginatedExperiences = async (
  limit: number,
  page: number
) =>
  unstable_cache(
    async () => buildExperiencePage(limit, page),
    ['experiences', 'page', `${page}`, 'limit', `${limit}`],
    { revalidate: 120, tags: ['experiences'] }
  )();

export const getExperienceById = (id: string) =>
  ExperienceRepository.findById(id);

export const createExperience = (data: CreateExperienceInput) =>
  ExperienceRepository.create(data);

export const updateExperience = (id: string, data: UpdateExperienceInput) =>
  ExperienceRepository.update(id, data);

export const deleteExperience = (id: string) => ExperienceRepository.remove(id);
