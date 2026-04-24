import { TResponseItem, TResponsePaginate } from '@/commons/types/response';
import { Category } from './category';

export type Project = {
  id: string;
  title: string;
  tags: string[];
  image: string;
  publicId: string;
  demo?: string;
  github?: string;
  categoryId: string;
  category: Category;
};

export type CreateProjectInput = Omit<Project, 'id' | 'category'>;

export type UpdateProjectInput = Partial<CreateProjectInput>;

export type TProjectResponses = TResponsePaginate<Project>;

export type TProjectResponse = TResponseItem<Project>;
