import prisma from '@/lib/prisma';
import { CreateProjectInput, Project } from '@/model/project';

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
