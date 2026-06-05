import HeaderDashboard from '@/src/components/dashboard/HeaderDashboard'
import { Container, Grid } from '@radix-ui/themes'
import prisma from '@/src/libs/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ProjectCard from '@/src/components/projects/ProjectCard'
import { redirect } from 'next/dist/server/api-utils'

async function loadProjects(userId:number){    
    return await prisma.project.findMany({
    where: {
      userId
    }
  });
}

async function DashboardPage() {
  
  const session = await getServerSession(authOptions)
  const projects = await loadProjects(parseInt(session?.user?.id! as string))

  return (
    <Container className='mt-10 px-10 md:px-0'>
      <HeaderDashboard /> 
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))
        }
      </div>
    </Container>
  )
}

export default DashboardPage
