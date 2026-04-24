import {
  deleteCategory,
  getCategoryById,
  updateCategory,
} from '@/server/services/category-services';
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: RouteContext) {
  const body = await req.json();
  const { id } = await context.params;
  try {
    const updatedCategory = await updateCategory(id, body);

    return NextResponse.json({
      message: 'Category updated successfully',
      category: updatedCategory,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const cat = await getCategoryById(id);

  if (!cat) {
    return NextResponse.json({
      message: 'Category not found',
    });
  }

  try {
    await deleteCategory(id);
    return NextResponse.json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete category',
      error: error,
    });
  }
}
