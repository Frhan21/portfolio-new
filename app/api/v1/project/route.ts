import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prisma";
import { projectSchema } from "@/libs/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    if (!projects || projects.length === 0) {
      return NextResponse.json({
        message: "No projects found",
        projects: [],
      });
    }
    return NextResponse.json({
      message: "Projects fetched successfully",
      projects: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({
      message: "Failed to fetch projects",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    console.log("Received data:", data);

    const tags = typeof data.tags === "string" ? data.tags.split(",") : [];
    const validate = projectSchema.safeParse({
      ...data,
      tags: tags,
      image: formData.get("image") as File,
    });

    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validate.error.errors,
        },
        { status: 400 }
      );
    }

    const image = formData.get("image") as File;
    if (!image) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }
    const {
      title,
      tags: validatedTags,
      demo,
      github,
      categoryId,
    } = validate.data;

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Got Buffer");

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${image.type};base64,${base64}`;

    const response = await cloudinary.uploader.upload(dataUrl, {
        folder: "nextjs-upload", 
    })

    const imageUrl = response.secure_url; 

    console.log("Got Data URL");

    const project = await prisma.project.create({
      data: {
        title,
        image: imageUrl,
        demo: demo || null,
        github: github || null,
        tags: validatedTags,
        categoryId: categoryId,
      },
    });

    return NextResponse.json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        message: "Failed to create project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
