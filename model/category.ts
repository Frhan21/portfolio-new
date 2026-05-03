import { TResponseItem, TResponsePaginate } from '@/commons/types/response';

export interface Category {
  id: string;
  title: string;
  timestamp: Date;
}

export type TCreateCategory = Omit<Category, 'id' | 'timestamp'>;

export type UpdateCategoryInput = Partial<TCreateCategory>;

export type TCategoryResponses = TResponsePaginate<Category>;

export type TCategoryResponse = TResponseItem<Category>;
