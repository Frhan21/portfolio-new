import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prisma";
import { certficateSchema } from "@/libs/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const certificate = await prisma.certificate.findMany();
    if (!certificate || certificate.length === 0) {
      return NextResponse.json({
        message: "No certificate found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Success",
      data: certificate,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = {
      title: formData.get("title") as string,
      image: formData.get("image") as File,
      categoryId: formData.get("categoryId") as string,
      issuer: formData.get("issuer") as string,
      issuer_date: formData.get("issuer_date"),
    };

    const validate = certficateSchema.safeParse(data);
    if (!validate.success) {
      return NextResponse.json({
        message: validate.error.issues,
        status: 400,
      });
    }
    const { title, categoryId, issuer, issuer_date } = validate.data;

    const image = formData.get("image") as File;
    if (!image) {
      return NextResponse.json({
        message: "Image is required",
        status: 400,
      });
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${image.type};base64,${base64}`;

    const response = await cloudinary.uploader.upload(dataUrl, {
      folder: "nextjs-upload",
    });

    const imageUrl = response.secure_url;
    if (!imageUrl) {
      return NextResponse.json({
        message: "Upload image failed",
        status: 404,
      });
    }

    const publicId = response.public_id;

    const res = await prisma.certificate.create({
      data: {
        title,
        image: imageUrl,
        publicId,
        categoryId,
        issuer,
        issuer_date,
      },
    });

    return NextResponse.json({
      message: "Success",
      status: 200,
      data: res,
    });
  } catch (error) {
    console.error("Error creating data", error);
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
