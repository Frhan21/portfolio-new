import { TResponseItem, TResponsePaginate } from '@/commons/types/response';
import { Project } from './types';

export type TProjectResponses = TResponsePaginate<Project>;

export type TProjectResponse = TResponseItem<Project>;

export type ProjectPaginatedResult = {
  items: Project[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

export type ProjectActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
