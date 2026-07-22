// import { PrismaClient } from "@prisma/client/extension";
import { categorySchema } from '@/lib/validation';
import {
  createCategory,
  getCategories,
} from '@/server/services/category.server';
import { NextResponse } from 'next/server';
import { isAuthenticatedRequest } from '@/lib/api-auth';

// const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await getCategories();
    if (!categories || categories.length === 0) {
      return NextResponse.json({
        message: 'No categories found',
        categories: [],
      });
    }
    return NextResponse.json({
      message: 'Categories fetched successfully',
      categories: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!(await isAuthenticatedRequest())) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();

    const validation = categorySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newCategory = await createCategory(validation.data.title);

    return NextResponse.json({
      message: 'Category created successfully',
      category: newCategory,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
