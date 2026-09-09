import { Certificate } from './types';

export type CreateCertificateInput = Omit<Certificate, 'id' | 'category'>;

export type UpdateCertificateInput = Partial<CreateCertificateInput>;
