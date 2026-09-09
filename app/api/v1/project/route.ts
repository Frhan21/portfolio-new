import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from '@/lib/api-response';
import { projectSchema } from '@/lib/validation';
import { createProject, getProject } from '@/server/services/project.server';
import { uploadImage } from '@/server/services/upload.server';
import { NextRequest } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/api-auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limitQuery = searchParams.get('limit');
    const limit: number | undefined = limitQuery
      ? parseInt(limitQuery, 10)
      : undefined;

    if (limitQuery && isNaN(Number(limitQuery))) {
      return errorResponse('Invalid limit paramter', undefined, 400);
    }

    const projects = await getProject(limit);
    if (!projects || projects.length === 0) {
      return successResponse([], 'No projects found');
    }
    return successResponse(projects, 'Projects fetched successfully');
  } catch (error) {
    console.error('Error fetching projects:', error);
    return errorResponse('Failed to fetch projects', error);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticatedRequest())) {
    return errorResponse('Unauthorized', undefined, 401);
  }
  // NOTE: The primary create path for the dashboard uses the Server Action
  // (server/actions/project.actions.ts → addProject). This route remains
  // for external/public API consumers that call POST /api/v1/project directly.
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const tags =
      typeof data.tags === 'string'
        ? data.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
    const validate = projectSchema.safeParse({
      ...data,
      tags,
      image: formData.get('image') as File,
    });

    if (!validate.success) {
      return validationErrorResponse(validate.error.errors);
    }

    const image = formData.get('image') as File;
    if (!image) {
      return errorResponse('Image file is required', undefined, 400);
    }

    const {
      title,
      tags: validatedTags,
      demo,
      github,
      categoryId,
    } = validate.data;
    const { imageUrl, publicId } = await uploadImage(image);

    const project = await createProject({
      title,
      image: imageUrl,
      publicId,
      demo: demo ?? null,
      github: github ?? null,
      tags: validatedTags,
      categoryId,
    });

    return successResponse(project, 'Project created successfully', 201);
  } catch (error) {
    console.error('Error creating project:', error);
    return errorResponse('Failed to create project', error, 500);
  }
}
