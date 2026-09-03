import { z } from 'zod';
import { experienceSchema } from '@/lib/validation';

export { experienceSchema };
export type TExperienceSchema = z.infer<typeof experienceSchema>;
