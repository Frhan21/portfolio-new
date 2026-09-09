import { Category } from './types';

export type TCreateCategory = Omit<Category, 'id' | 'timestamp'>;

export type UpdateCategoryInput = Partial<TCreateCategory>;
