import { Category } from '../category/types';

export type Project = {
  id: string;
  title: string;
  slug?: string | null;
  summary?: string | null;
  content?: unknown;
  tags: string[];
  image: string;
  publicId: string;
  demo: string | null;
  github: string | null;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  category?: Category;
};
