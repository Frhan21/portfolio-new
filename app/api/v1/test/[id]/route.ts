import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching data : " + error,
      status: 404,
    });
  }
}
