import {
  errorResponse,
  successResponse,
  validationErrorResponse,
} from '@/lib/api-response';
import { projectSchema } from '@/lib/validation';
import { createProject, getProject } from '@/server/services/project-services';
import { uploadCoverImage } from '@/server/services/upload-image';
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

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
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    console.log('Received data:', data);

    const tags = typeof data.tags === 'string' ? data.tags.split(',') : [];
    const validate = projectSchema.safeParse({
      ...data,
      tags: tags,
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

    const { imageUrl, publicId } = await uploadCoverImage(image);

    const project = await createProject({
      title: title,
      image: imageUrl,
      publicId,
      demo: demo ?? null,
      github: github ?? null,
      tags: validatedTags,
      categoryId,
    });

    revalidateTag('projects', 'max');

    return successResponse(project, 'Project created successfully', 201);
  } catch (error) {
    console.error('Error creating project:', error);
    return errorResponse('Failed to create project', error, 500);
  }
}
