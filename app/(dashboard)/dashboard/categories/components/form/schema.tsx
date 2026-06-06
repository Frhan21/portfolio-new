import { categorySchema } from '@/lib/validation';
import z from 'zod';

export type TCategorySchema = z.infer<typeof categorySchema>;
