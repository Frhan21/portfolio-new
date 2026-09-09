import { revalidateTag } from 'next/cache';
import {
  deleteExperience,
  getExperienceById,
  updateExperience,
} from '@/server/services/experience.server';
import { experienceSchema } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/api-auth';

type RouteContext = {
  params: Promise<{ id: string }>;
};

const parseMonthDate = (value: string) => new Date(`${value}-01T00:00:00.000Z`);

export async function PUT(req: NextRequest, context: RouteContext) {
  if (!(await isAuthenticatedRequest())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { id } = await context.params;

  try {
    const validation = experienceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const experience = await updateExperience(id, {
      company: validation.data.company,
      position: validation.data.position,
      startDate: parseMonthDate(validation.data.startDate),
      endDate:
        validation.data.isCurrent || !validation.data.endDate
          ? null
          : parseMonthDate(validation.data.endDate),
      description: validation.data.description,
      badges: validation.data.badges,
    });

    revalidateTag('experiences', 'max');

    return NextResponse.json({
      message: 'Experience updated successfully',
      experience,
    });
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!(await isAuthenticatedRequest())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await context.params;
  const experience = await getExperienceById(id);

  if (!experience) {
    return NextResponse.json({
      message: 'Experience not found',
    });
  }

  try {
    await deleteExperience(id);
    revalidateTag('experiences', 'max');
    return NextResponse.json({
      message: 'Experience deleted successfully',
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete experience',
      error,
    });
  }
}
