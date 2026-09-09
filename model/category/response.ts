import { TResponseItem, TResponsePaginate } from '@/commons/types/response';
import { Category } from './types';

export type TCategoryResponses = TResponsePaginate<Category>;

export type TCategoryResponse = TResponseItem<Category>;

export type CategoryActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
