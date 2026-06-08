import { Project } from './types';

export type CreateProjectInput = Omit<
  Project,
  'id' | 'category' | 'createdAt' | 'updatedAt'
>;

export type UpdateProjectInput = Partial<CreateProjectInput>;
