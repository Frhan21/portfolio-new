'use server';

import { projectSchema } from '@/lib/validation';
import * as ProjectService from '@/server/services/project.server';
import { uploadImage } from '@/server/services/upload.server';
import { CreateProjectInput, Project } from '@/model/project';

// ─── Types ─────────────────────────────────────────────────────────────────

type PaginatedResult = {
  items: Project[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── GET ────────────────────────────────────────────────────────────────────

export async function getProjects(
  limit: number = 10,
  page: number = 1
): Promise<PaginatedResult> {
  const safeLimit = Math.max(1, limit);
  const safePage = Math.max(1, page);
  return ProjectService.getPaginatedProjects(safeLimit, safePage);
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!id) throw new Error('Project ID is required');
  return ProjectService.getProjectById(id);
}

// ─── CREATE ─────────────────────────────────────────────────────────────────

export async function addProject(
  formData: FormData
): Promise<ActionResult<CreateProjectInput>> {
  // 1. Validasi dengan Zod
  const rawData = {
    title: formData.get('title'),
    categoryId: formData.get('categoryId'),
    tags: String(formData.get('tags') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    demo: formData.get('demo') || undefined,
    github: formData.get('github') || undefined,
    image: formData.get('image'),
  };

  const validated = projectSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  // 2. Upload image ke Cloudinary
  const { imageUrl, publicId } = await uploadImage(validated.data.image);

  // 3. Simpan ke DB via service
  const project = await ProjectService.createProject({
    title: validated.data.title,
    image: imageUrl,
    publicId,
    demo: validated.data.demo ?? null,
    github: validated.data.github ?? null,
    tags: validated.data.tags,
    categoryId: validated.data.categoryId,
  });

  return { success: true, data: project };
}

// ─── UPDATE ─────────────────────────────────────────────────────────────────

export async function updateProject(
  id: string,
  formData: FormData
): Promise<ActionResult<Project>> {
  if (!id) return { success: false, error: 'Project ID is required' };

  // 1. Validasi
  const rawData = {
    title: formData.get('title'),
    categoryId: formData.get('categoryId'),
    tags: String(formData.get('tags') ?? '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    demo: formData.get('demo') || undefined,
    github: formData.get('github') || undefined,
    image:
      formData.get('image') instanceof File ? formData.get('image') : undefined,
  };

  // Use partial schema for update — image is optional
  const partialSchema = projectSchema.partial({ image: true });
  const validated = partialSchema.safeParse(rawData);
  if (!validated.success) {
    return { success: false, error: validated.error.errors[0].message };
  }

  // 2. Upload image baru jika ada
  let imageData: { image?: string; publicId?: string } = {};
  if (validated.data.image instanceof File && validated.data.image.size > 0) {
    const { imageUrl, publicId } = await uploadImage(validated.data.image);
    imageData = { image: imageUrl, publicId };
  }

  // 3. Update via service
  const project = await ProjectService.updateProject(id, {
    title: validated.data.title,
    demo: validated.data.demo ?? null,
    github: validated.data.github ?? null,
    tags: validated.data.tags,
    categoryId: validated.data.categoryId,
    ...imageData,
  });

  return { success: true, data: project as Project };
}

// ─── DELETE ─────────────────────────────────────────────────────────────────

export async function deleteProject(
  id: string
): Promise<ActionResult<{ id: string }>> {
  if (!id) return { success: false, error: 'Project ID is required' };

  await ProjectService.deleteProject(id);

  return { success: true, data: { id } };
}
