import { NextResponse } from "next/server";
import prisma from '@/src/libs/prisma'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const data = await request.json();
  const session = await getServerSession(authOptions);

  if(!session) return NextResponse.json("Unauthorized", {status: 401});

  const projectCount = await prisma.project.count({
    where: { userId: parseInt(session.user.id) }
  });

  if (projectCount >= 10) {
    return NextResponse.json(
      { message: "Has alcanzado el límite máximo de 10 tareas." },
      { status: 403 }
    );
  }

  const newProject = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      user: {
        connect: {
          id: parseInt(session.user.id)
        }
      }
    }
  });

  return NextResponse.json(newProject, {status:201});
}