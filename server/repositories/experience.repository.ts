import prisma from '@/lib/prisma';
import {
  CreateExperienceInput,
  UpdateExperienceInput,
} from '@/model/experience';

export const findAll = (limit?: number) =>
  prisma.experience.findMany({
    ...(limit !== undefined ? { take: limit } : {}),
    orderBy: [
      { endDate: { sort: 'desc', nulls: 'first' } },
      { startDate: 'desc' },
    ],
  });

export const findById = (id: string) =>
  prisma.experience.findUnique({ where: { id } });

export const findPaginated = (limit: number, skip: number) =>
  prisma.experience.findMany({
    take: limit,
    skip,
    orderBy: [
      { endDate: { sort: 'desc', nulls: 'first' } },
      { startDate: 'desc' },
    ],
  });

export const count = () => prisma.experience.count();

export const create = (data: CreateExperienceInput) =>
  prisma.experience.create({
    data: {
      company: data.company,
      position: data.position,
      startDate: data.startDate,
      endDate: data.endDate ?? null,
      description: data.description,
      badges: data.badges,
    },
  });

export const update = (id: string, data: UpdateExperienceInput) =>
  prisma.experience.update({ where: { id }, data });

export const remove = (id: string) =>
  prisma.experience.delete({ where: { id } });
