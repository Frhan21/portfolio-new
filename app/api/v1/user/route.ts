import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
    if (!users || users.length === 0) {
      return NextResponse.json({
        message: "No users found",
        users: [],
      });
    }
    return NextResponse.json({
      message: "success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      message: "error",
      error: "Failed to fetch users",
    });
  }
}
