import { certficateSchema, certificateUpdateSchema } from '@/lib/validation';
import { z } from 'zod';

export type TCertificateSchema = z.infer<typeof certficateSchema>;
export type TCertificateUpdateSchema = z.infer<typeof certificateUpdateSchema>;
