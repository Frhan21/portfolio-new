import { Category } from '../category/types';

export interface Certificate {
  id: string;
  title: string;
  image: string;
  publicId: string;
  categoryId: string;
  issuer: string;
  issuer_date: string;
  category?: Category;
}
