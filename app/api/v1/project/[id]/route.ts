import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prisma";
import { projectUpdateSchema } from "@/libs/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }
    const res = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!res) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Project fetched successfully",
      data: res,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({
      message: "Failed to fetch project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function PUT(
  req: NextRequest,
  {params} : {params: Promise<{id: string}>}
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const data = {
      title: formData.get("title") as string,
      image: formData.get("image") || undefined,
      demo: formData.get("demo") as string,
      github: formData.get("github") as string,
      tags:
        typeof formData.get("tags") === "string"
          ? (formData.get("tags") as string).split(",")
          : [],
      categoryId: formData.get("categoryId") as string,
    };

    const validate = projectUpdateSchema.safeParse(data);
    if (!validate.success) {
      return NextResponse.json({
        message: "Validation failed",
        errors: validate.error.flatten().fieldErrors,
      });
    }

    const { title, demo, github, tags, categoryId } = validate.data;
    const imageFile = formData.get("image") as File;

    let imagePath;

    if (formData.get("image") as File) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log("Got Buffer");

      const base64 = buffer.toString("base64");
      const dataUrl = `data:${imageFile.type};base64,${base64}`;

      const response = await cloudinary.uploader.upload(dataUrl, {
        folder: "nextjs-upload",
      });

      imagePath = response.secure_url;
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        demo,
        github,
        categoryId,
        tags,
        image: imagePath, // Assuming you handle the file upload separately
      },
    });

    return NextResponse.json({
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({
      message: "Failed to update project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.delete({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    if (project.publicId) {
      try {
        await cloudinary.uploader.destroy(project.publicId);
      } catch (cldError) {
        console.error("Error deleting image from Cloudinary:", cldError);
      }
    }

    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({
      message: "Failed to delete project",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
