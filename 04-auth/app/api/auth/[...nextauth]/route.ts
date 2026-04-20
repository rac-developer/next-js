import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/src/libs/prisma';
import bcrypt from 'bcrypt'

const handler = NextAuth({
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
  pages: {
    signIn: '/auth/login'
  }
})

export { handler as GET, handler as POST}