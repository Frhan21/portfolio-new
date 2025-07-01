import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please enter all fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if(existingUser) {
        return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" + error },
      { status: 404 }
    );
  }
}
