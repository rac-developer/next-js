"use client"

import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Project } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface Props {
  project: Project
}

function ProjectCard({ project }: Props) {
  
  const router = useRouter();

  return (
    <Card 
    key={project.id} 
    onClick={() => router.push(`/dashboard/projects/${project.id}`)}
    className='cursor-pointer hover:bg-gray-900 transition-colors duration-200'
    >
      <Flex direction="column" gap="2">
        <Heading size={"3"}>
          {project.title}
        </Heading>
        <Text className='text-slate-500'>
          {project.description}
        </Text>
      </Flex>
    </Card>
  )
}

export default ProjectCard