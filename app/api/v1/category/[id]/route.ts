import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: NextRequest, context: RouteContext) {
  const body = await req.json();
  const { id } = await context.params;
  try {
    const updatedCategory = await prisma.category.update({
      where: { id: id },
      data: body,
    });

    return NextResponse.json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Erorr deleting category: ", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
