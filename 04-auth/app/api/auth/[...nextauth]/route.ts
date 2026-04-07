import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/src/libs/prisma';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name:'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@something.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
        console.log(credentials)

        const userFond = await prisma.user.findUnique({
          where: {
            email: email
          }
        });

        if(!userFond) throw new Error ("Invalid credentials")

        console.log(userFond)

        return null
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  }
})

export { handler as GET, handler as POST}