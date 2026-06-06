import * as CategoryRepository from '@/server/repositories/category.repository';

export const getCategories = () => CategoryRepository.findAll();

export const getCategoryById = (id: string) => CategoryRepository.findById(id);

export const createCategory = (title: string) =>
  CategoryRepository.create(title);

export const updateCategory = (id: string, title: string) =>
  CategoryRepository.update(id, title);

export const deleteCategory = (id: string) => CategoryRepository.remove(id);
