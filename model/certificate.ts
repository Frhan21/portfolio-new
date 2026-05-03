import { TResponseItem, TResponsePaginate } from '@/commons/types/response';
import { Category } from './category';

export interface Certificate {
  id: string;
  title: string;
  image: string;
  publicId: string;
  categoryId: string;
  issuer: string;
  issuer_date: Date;
  category: Category;
}

export type CreateCertificateInput = Omit<Certificate, 'id' | 'category'>;

export type UpdateCertificateInput = Partial<CreateCertificateInput>;

export type TCertificateResponses = TResponsePaginate<Certificate>;

export type TCertificateResponse = TResponseItem<Certificate>;
