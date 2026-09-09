import { unstable_cache } from 'next/cache';
import * as ProjectRepository from '@/server/repositories/project.repository';
import { CreateProjectInput, Project } from '@/model/project';

type ProjectPageResult = {
  items: Project[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

const buildProjectPage = async (
  limit: number,
  page: number
): Promise<ProjectPageResult> => {
  const currentPage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const skip = (currentPage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    ProjectRepository.findPaginated(safeLimit, skip),
    ProjectRepository.count(),
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

export const getProject = (limit?: number) => ProjectRepository.findAll(limit);

export const getPaginatedProjects = (limit: number, page: number) =>
  buildProjectPage(limit, page);

export const getProjectById = (id: string) => ProjectRepository.findById(id);

export const getProjectBySlug = (slug: string) =>
  ProjectRepository.findBySlug(slug);

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const uniqueSlug = async (base: string) => {
  let candidate = base;
  let counter = 1;
  for (;;) {
    const existing = await ProjectRepository.findBySlug(candidate);
    if (!existing) return candidate;
    counter += 1;
    candidate = `${base}-${counter}`;
  }
};

export const createProject = async (data: CreateProjectInput) => {
  const slug = data.slug || (await uniqueSlug(slugify(data.title)));
  return ProjectRepository.create({ ...data, slug });
};

export const updateProject = (id: string, data: Record<string, unknown>) =>
  ProjectRepository.update(id, data);

export const deleteProject = (id: string) => ProjectRepository.remove(id);
