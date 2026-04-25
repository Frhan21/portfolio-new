import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { projectUpdateSchema } from '@/lib/validation';
import { Project } from '@/model/project';
import { revalidateTag } from 'next/cache';
import {
  deleteProject,
  getProjectbyId,
  updateProject,
} from '@/server/services/project-services';
import { uploadCoverImage } from '@/server/services/upload-image';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { message: 'Project ID is required' },
        { status: 400 }
      );
    }
    const res = await getProjectbyId(id);

    if (!res) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Project fetched successfully',
      data: res,
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({
      message: 'Failed to fetch project',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json(
        { message: 'Project ID is required' },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const updates: Record<string, unknown> = {};

    const rawTitle = formData.get('title');
    if (typeof rawTitle === 'string') {
      updates.title = rawTitle;
    }

    const rawDemo = formData.get('demo');
    if (typeof rawDemo === 'string') {
      updates.demo = rawDemo;
    }

    const rawGithub = formData.get('github');
    if (typeof rawGithub === 'string') {
      updates.github = rawGithub;
    }

    const rawTags = formData.get('tags');
    if (typeof rawTags === 'string') {
      const parsedTags = rawTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
      updates.tags = parsedTags;
    }

    const rawCategoryId = formData.get('categoryId');
    if (typeof rawCategoryId === 'string') {
      updates.categoryId = rawCategoryId;
    }

    const rawImage = formData.get('image');
    if (rawImage instanceof File && rawImage.size > 0) {
      updates.image = rawImage as File;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: 'No data provided to update' },
        { status: 400 }
      );
    }

    const partialSchema = projectUpdateSchema.partial();
    const validate = partialSchema.safeParse(updates);
    if (!validate.success) {
      return NextResponse.json({
        message: 'Validation failed',
        errors: validate.error.flatten().fieldErrors,
      });
    }

    const { image, ...rest } = validate.data;
    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }

    if (image) {
      if (existingProject.publicId) {
        try {
          await cloudinary.uploader.destroy(existingProject.publicId);
        } catch (cldError) {
          console.error('Error removing existing image:', cldError);
        }
      }

      const res = await uploadCoverImage(image);

      updateData.image = res.imageUrl;
      updateData.publicId = res.publicId;
    }

    const updatedProject = await updateProject(
      id,
      updateData as unknown as Project
    );

    revalidateTag('projects');

    return NextResponse.json({
      message: 'Project updated successfully',
      data: updatedProject,
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({
      message: 'Failed to update project',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const project = await getProjectbyId(id);

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      );
    }

    if (project.publicId) {
      try {
        await cloudinary.uploader.destroy(project.publicId);
      } catch (cldError) {
        console.error('Error deleting image from Cloudinary:', cldError);
      }
    }

    await deleteProject(id);
    revalidateTag('projects');

    return NextResponse.json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({
      message: 'Failed to delete project',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
