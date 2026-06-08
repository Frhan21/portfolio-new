'use server';

import { experienceSchema } from '@/lib/validation';
import * as ExperienceService from '@/server/services/experience.server';
import {
  CreateExperienceInput,
  Experience,
  ExperienceActionResult,
} from '@/model/experience';

interface PaginatedResult {
  items: Experience[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

const parseMonthDate = (value: string) => new Date(`${value}-01T00:00:00.000Z`);

const parseExperienceFormData = (formData: FormData) => {
  const isCurrent = formData.get('isCurrent') === 'true';

  return {
    company: formData.get('company'),
    position: formData.get('position'),
    startDate: formData.get('startDate'),
    endDate: isCurrent ? undefined : String(formData.get('endDate') ?? ''),
    isCurrent,
    description: formData.get('description'),
    badges: String(formData.get('badges') ?? '')
      .split(',')
      .map((badge) => badge.trim())
      .filter(Boolean),
  };
};

const buildExperienceInput = (
  data: ReturnType<typeof experienceSchema.parse>
): CreateExperienceInput => ({
  company: data.company,
  position: data.position,
  startDate: parseMonthDate(data.startDate),
  endDate:
    data.isCurrent || !data.endDate ? null : parseMonthDate(data.endDate),
  description: data.description,
  badges: data.badges,
});

export async function getExperiences(
  limit: number = 10,
  page: number = 1
): Promise<PaginatedResult> {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  return ExperienceService.getPaginatedExperiences(safeLimit, safePage);
}

export async function getExperienceById(
  id: string
): Promise<Experience | null> {
  if (!id) throw new Error('Experience ID is required');
  return ExperienceService.getExperienceById(id);
}

export async function addExperience(
  formData: FormData
): Promise<ExperienceActionResult<Experience>> {
  const validated = experienceSchema.safeParse(
    parseExperienceFormData(formData)
  );
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const experience = await ExperienceService.createExperience(
    buildExperienceInput(validated.data)
  );

  return { success: true, data: experience };
}

export async function updateExperience(
  id: string,
  formData: FormData
): Promise<ExperienceActionResult<Experience>> {
  if (!id) return { success: false, error: 'Experience ID is required' };

  const validated = experienceSchema.safeParse(
    parseExperienceFormData(formData)
  );
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  const experience = await ExperienceService.updateExperience(
    id,
    buildExperienceInput(validated.data)
  );

  return { success: true, data: experience };
}

export async function deleteExperience(
  id: string
): Promise<ExperienceActionResult<{ id: string }>> {
  if (!id) return { success: false, error: 'Experience ID is required' };

  await ExperienceService.deleteExperience(id);

  return { success: true, data: { id } };
}
