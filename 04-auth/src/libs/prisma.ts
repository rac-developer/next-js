import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const prismaClientSingleton = () => {
  // 🔍 Validación de depuración: Si esto falla, el problema es el archivo .env
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("❌ DATABASE_URL no está definida. Revisa tu archivo .env");
  }

  const adapter = new PrismaLibSql({
    url: url, // Asegúrate de que en el .env sea "file:./dev.db"
  });

  return new PrismaClient({
    adapter,
    omit: {
      user: { password: true }
    }
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = global as unknown as { prisma: PrismaClientSingleton | undefined };

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;