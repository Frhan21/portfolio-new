import prisma from '@/lib/prisma';

export const getCategories = () => {
  return prisma.category.findMany();
};

export const getCategoryById = (id: string) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const createCategory = (title: string) => {
  return prisma.category.create({
    data: {
      title,
    },
  });
};

export const updateCategory = (id: string, title: string) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      title,
    },
  });
};

export const deleteCategory = (id: string) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};
