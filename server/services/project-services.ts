import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';
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

  const [items, total] = await prisma.$transaction([
    prisma.project.findMany({
      take: safeLimit,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    }),
    prisma.project.count(),
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

export const getProject = async (limit?: number) => {
  return await prisma.project.findMany({
    ...(limit !== undefined ? { take: limit } : {}),
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    },
  });
};

export const getPaginatedProjects = async (limit: number, page: number) => {
  return buildProjectPage(limit, page);
};

export const getCachedPaginatedProjects = async (
  limit: number,
  page: number
) => {
  return unstable_cache(
    async () => buildProjectPage(limit, page),
    ['projects', 'page', `${page}`, 'limit', `${limit}`],
    {
      revalidate: 120,
      tags: ['projects'],
    }
  )();
};

export const getCachedLatestProjects = async (limit: number) => {
  return unstable_cache(
    async () =>
      prisma.project.findMany({
        take: Math.max(1, limit),
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          category: true,
        },
      }),
    ['projects', 'latest', `${limit}`],
    {
      revalidate: 120,
      tags: ['projects'],
    }
  )();
};

export const getProjectbyId = async (id: string) => {
  return await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

export const createProject = async (data: CreateProjectInput) => {
  return await prisma.project.create({
    data: {
      title: data.title,
      image: data.image,
      publicId: data.publicId,
      demo: data.demo,
      github: data.github,
      tags: data.tags,
      categoryId: data.categoryId,
    },
  });
};

export const deleteProject = async (id: string) => {
  return await prisma.project.delete({
    where: {
      id,
    },
  });
};

export const updateProject = async (id: string, updatedData: Project) => {
  return await prisma.project.update({
    where: {
      id,
    },
    data: {
      title: updatedData.title,
      image: updatedData.image,
      publicId: updatedData.publicId,
      demo: updatedData.demo,
      github: updatedData.github,
      tags: updatedData.tags,
      categoryId: updatedData.categoryId,
    },
  });
};
