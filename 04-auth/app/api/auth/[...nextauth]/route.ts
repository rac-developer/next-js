import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/src/libs/prisma';
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name:'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@something.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials) throw new Error("No credentials provided");
        // console.log(credentials)

        const { email, password } = credentials;

        const userFound = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true
          }
        });

        if (!userFound) throw new Error("Invalid credentials")

        const validPassword = await bcrypt.compare(
          password, 
          userFound.password
        )
        
        if(!validPassword) throw new Error("Invalid Credentials")

        return {
          id: userFound.id + '',
          name: userFound.name,
          email: userFound.email
        };
      }
    })
  ],
  callbacks : {
    // Esto lo guarda en el token
    async jwt({ token, user }) {
      if(user) {
        token.id = user.id;
      }

      const userId = token.id || token.sub;
      if (userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: parseInt(userId as string) }
        });
        
        // Si el usuario ya no existe en la base de datos (ej. borrado por el cron job), invalidamos el token
        if (!dbUser) {
          token.error = "UserDeleted";
        }
      }

      return token;
    },
    // Esto se ejecuta cuando se crea la sesion
    async session({ session, token }) {
      if (token.error === "UserDeleted") {
        throw new Error("UserDeleted"); // Esto forzará a NextAuth a destruir la sesión
      }

      if(token.id) {
        session.user.id = token.sub as string;
      }

      return session;
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}