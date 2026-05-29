import HeaderDashboard from '@/src/components/dashboard/HeaderDashboard'
import { Container, Card, Flex, Heading, Button, Grid, Text } from '@radix-ui/themes'
import prisma from '@/src/libs/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

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
    <Container className='mt-10'>
      <HeaderDashboard /> 
      <Grid columns={"3"} gap="3" className='mt-5'>
        {
          projects.map(project => (
            <Card key={project.id} >
              <Flex direction="column" gap="2">
                <Heading size={"3"}>
                  {project.name}
                </Heading>
                <Text className='text-slate-500'>
                  {project.description}
                </Text>
              </Flex>
            </Card>
          ))
        }
      </Grid>
    </Container>
  )
}

export default DashboardPage
