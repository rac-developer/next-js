import { NextResponse } from 'next/server';
import prisma from '@/src/libs/prisma';
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const userCount = await prisma.user.count();
    if (userCount >= 5) {
      return NextResponse.json(
        { message: "Se ha alcanzado el límite máximo de 5 usuarios para esta demo." },
        { status: 403 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    const userFound = await prisma.user.findUnique({
      where: {
        email: data.email
      } 
    });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data
    });

    // Prisma ya está configurado para omitir la contraseña globalmente
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("DETALLE DEL ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}