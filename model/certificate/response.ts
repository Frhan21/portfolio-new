import { TResponseItem, TResponsePaginate } from '@/commons/types/response';
import { Certificate } from './types';

export type TCertificateResponses = TResponsePaginate<Certificate>;

export type TCertificateResponse = TResponseItem<Certificate>;

export type CertificatePaginatedResult = {
  items: Certificate[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

export type CertificateActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
