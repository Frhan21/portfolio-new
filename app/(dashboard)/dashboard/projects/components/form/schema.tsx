import { z } from 'zod';
import { projectSchema, projectUpdateSchema } from '@/lib/validation';

export { projectSchema };
export { projectUpdateSchema };
export type TProjectSchema = z.infer<typeof projectSchema>;
export type TProjectUpdateSchema = z.infer<typeof projectUpdateSchema>;
