export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
  badges: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExperienceInput {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date | null;
  description: string;
  badges: string[];
}

export type UpdateExperienceInput = Partial<CreateExperienceInput>;

export type ExperienceActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
