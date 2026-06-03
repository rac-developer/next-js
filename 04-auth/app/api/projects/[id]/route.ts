import { NextResponse } from "next/server"
import prisma from "@/src/libs/prisma"
import { Prisma } from "@/app/generated/prisma/client"

export async function DELETE (
  request: Request, 
  {
    params,
  }: {
    params: Promise<{id: string}>;
  }
  ) {

    try {
        const { id } = await params;

      const projectDeleted = await prisma.project.delete({  
        where: {
          id: parseInt(id),   
        },
      });
      return NextResponse.json(projectDeleted)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return NextResponse.json(
            {error: "error: Project not found"}, 
            { status: 404 }
          )
        }
      }
      return NextResponse.json(
        {error: "Internal Server Error"}, 
        { status: 500 }
      )
    }
}