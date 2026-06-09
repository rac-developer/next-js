import { NextResponse } from 'next/server';
import prisma from '@/src/libs/prisma';
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Limpiar toda la base de datos
    await prisma.project.deleteMany({});
    await prisma.user.deleteMany({});

    // Crear el usuario de prueba
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await prisma.user.create({
      data: {
        name: "Usuario de Prueba",
        email: "test@demo.com",
        password: hashedPassword,
        projects: {
          create: [
            {
              title: "Explorar la Aplicación",
              description: "Bienvenido al portafolio. Esta es una tarea de ejemplo."
            },
            {
              title: "Crear una nueva tarea",
              description: "Prueba el botón de crear tarea para ver cómo funciona."
            }
          ]
        }
      }
    });

    return NextResponse.json({ message: "Base de datos reseteada con éxito" }, { status: 200 });
  } catch (error: any) {
    console.error("Error reseteando DB:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
