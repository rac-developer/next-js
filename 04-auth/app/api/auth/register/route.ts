import { NextResponse } from 'next/server';
import prisma from '@/src/libs/prisma';
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const data = await request.json();

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

    // Para que no mande la clave al frontend
    const { password, ...user } = newUser

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("DETALLE DEL ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}