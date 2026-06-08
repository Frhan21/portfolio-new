import { experienceSchema } from '@/lib/validation';
import {
  createExperience,
  getExperiences,
} from '@/server/services/experience.server';
import { NextResponse } from 'next/server';

const parseMonthDate = (value: string) => new Date(`${value}-01T00:00:00.000Z`);

export async function GET() {
  try {
    const experiences = await getExperiences();
    return NextResponse.json({
      message: 'Experiences fetched successfully',
      experiences,
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = experienceSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const experience = await createExperience({
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

    return NextResponse.json({
      message: 'Experience created successfully',
      experience,
    });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
