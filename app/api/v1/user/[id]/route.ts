import * as UserRepository from '@/server/repositories/user.repository';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const user = await UserRepository.findById(id);

    if (!user) {
      return NextResponse.json({
        error: 'User not found',
        status: 404,
      });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
