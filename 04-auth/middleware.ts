import { withAuth } from 'next-auth/middleware'

export default withAuth({
  // Configuración de callbacks para autorizar el acceso
  callbacks: {
    authorized: ({ token }) => !!token, // Permite el acceso si hay un token (usuario autenticado)
  },
  // Redirige a esta página si el usuario no está autenticado
  pages: {
    signIn: '/auth/login',
  },
})

export const config = { matcher: ["/dashboard"] }
