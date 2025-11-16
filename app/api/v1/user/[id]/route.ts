import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      error: "Something went wrong" + error.message,
      status: 500,
    });
  }
}
