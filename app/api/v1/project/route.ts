import { prisma } from "@/libs/prisma";
import { formSchema } from "@/libs/validation";
import { NextResponse } from "next/server";

export async function GET() {
    const project = await prisma.projects.findMany(); 
    return NextResponse.json(project); 
}

export async function POST(req: Request) {
    const body = await req.json(); 

    const parsed  = formSchema.safeParse(body); 
    if (!parsed.success) {
        return new Response(JSON.stringify({error: parsed.error.errors}), {status: 404}); 
    }

    const project = await prisma.projects.create({
        data: parsed.data, 
    })

    return new Response(JSON.stringify(project), {status: 201});
}
