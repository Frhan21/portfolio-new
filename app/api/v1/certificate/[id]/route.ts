import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    if (!id) {
      return NextResponse.json({
        message: "Certificate with ID is not found",
        status: 404,
      });
    }
    const res = await prisma.certificate.findUnique({
      where: {
        id,
      },
    });

    if (!res) {
      return NextResponse.json({
        message: "Error fetching data",
        status: 404,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching data : " + error,
      status: 404,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    let imagePath;

    if (formData.get("image") as File) {
      const image = formData.get("image") as File;
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      console.log("Got Buffer");

      const base64 = buffer.toString("base64");
      const dataUrl = `data:${image.type};base64,${base64}`;

      const response = await cloudinary.uploader.upload(dataUrl, {
        folder: "nextjs-upload",
      });

      imagePath = response.secure_url;
    }

    const { title, categoryId, issuer, issuer_date } = data;

    const res = await prisma.certificate.update({
      where: { id },
      data: {
        title: title as string,
        categoryId: typeof categoryId === "string" ? categoryId : "",
        issuer: issuer as string,
        issuer_date: issuer_date as string,
        image: imagePath,
      },
    });

    return NextResponse.json({
      message: "Certificate updated successfully",
      status: 200,
      data: res,
    });
  } catch (error) {
    console.error("Error Updating certificate" + error);
    return NextResponse.json({
      message: "Error Updating certificate",
      status: 500,
    });
  }
}
