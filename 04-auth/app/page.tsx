import { Container } from '@radix-ui/themes'
import { Metadata } from 'next'
import Link from 'next/link'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page Description'
}

export default async function page() {

  const session = await getServerSession(authOptions)
  
  if(session) {
    return redirect('/dashboard')
  }

  return (
    <Container className='px-6 md:px-0'>
      <header className='my-4 bg-slate-900 p-10 rounded-md'>
        <h1 className='text-7xl my-10'>
          Next Auth Radix
        </h1>
        <p className='mb-6'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, praesentium minus assumenda iusto animi libero molestias similique repudiandae aspernatur, officiis exercitationem saepe delectus earum blanditiis corporis ea reiciendis sapiente facilis!
        </p>
        <Link 
        href='/auth/login' 
        className='bg-blue-500 px-4 py-3 rounded-md text-lg hover:bg-blue-400 transition-colors duration-200 cursor-pointer'>
          Ingresar
        </Link>
      </header>
    </Container>
  )
}

