'use server';

import { categorySchema } from '@/lib/validation';
import * as CategoryService from '@/server/services/category.server';
import {
  Category,
  TCreateCategory,
  CategoryActionResult,
} from '@/model/category';
import { auth } from '@/lib/auth';

async function isAuthorized() {
  return Boolean((await auth())?.user?.id);
}

export async function getCategories() {
  const categories = await CategoryService.getCategories();
  return {
    items: categories || [],
    meta: {
      total: categories?.length || 0,
      page: 1,
      totalPages: 1,
    },
  };
}

export async function getCategoryById(id: string): Promise<Category | null> {
  if (!id) throw new Error('Category ID is required');
  return CategoryService.getCategoryById(id);
}

export async function addCategory(
  data: TCreateCategory
): Promise<CategoryActionResult<Category>> {
  if (!(await isAuthorized())) return { success: false, error: 'Unauthorized' };
  const validated = categorySchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const category = await CategoryService.createCategory(validated.data.title);
  return { success: true, data: category };
}

export async function updateCategory(
  id: string,
  data: TCreateCategory
): Promise<CategoryActionResult<Category>> {
  if (!(await isAuthorized())) return { success: false, error: 'Unauthorized' };
  if (!id) return { success: false, error: 'Category ID is required' };

  const validated = categorySchema.safeParse(data);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const category = await CategoryService.updateCategory(
    id,
    validated.data.title
  );
  return { success: true, data: category };
}

export async function deleteCategory(
  id: string
): Promise<CategoryActionResult<{ id: string }>> {
  if (!(await isAuthorized())) return { success: false, error: 'Unauthorized' };
  if (!id) return { success: false, error: 'Category ID is required' };
  await CategoryService.deleteCategory(id);
  return { success: true, data: { id } };
}
