'use client'
import { TextField, TextArea, Container, Button, Flex, Card, Heading } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import { TrashIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

function TaskNewPage() {

  const {control, handleSubmit} = useForm({
    values: {
      title:'',
      description:''
    }
  })

  const router = useRouter();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {

    if (!params.projectId) {
      const res = await axios.post('/api/projects', data)
      if(res.status === 201) {
        router.push('/dashboard')
        router.refresh()
      }  
    } else {
      const res = await axios.put(`/api/projects/${params.projectId}`, data)
      if(res.status === 200) {
        router.push('/dashboard')
        router.refresh()
      }
    }

  })

  const handleDelete = async (projectId:string) => {
    console.log(projectId);
    const res = await axios.delete(`/api/projects/${projectId}`)
    if(res.status === 200) {
      toast.success('Project Deleted', {duration:1000})
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full p-7">
            <Heading>
              {params.projectId ? 'Edit Project' : 'New Project'}
            </Heading>
            <form className='flex flex-col gap-y-2' onSubmit={onSubmit}>
              <label>
                Project Title
              </label>
              <Controller
              name='title'
              control={control}
                render={({field}) => {
                  return(
                    <TextField.Root placeholder="Search the docs…" size="3" {...field}>
                      <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                      </TextField.Slot>
                    </TextField.Root>              
                  );
              }}
              />
              <label>
                Project Description
              </label>
              <Controller
              name='description'
              control={control}
              render={({field}) => {
                return(
                  <TextArea size="3" placeholder="Reply to comment…" {...field}/>
                );
              }}
              />
              <Button>
                {params.projectId ? 'Update Project' : 'Create Project'}
              </Button>
            </form>

            <div className="flex justify-end mt-4">
              {params.projectId && 
                <Button color='red' onClick={() => handleDelete(params.projectId as string)}>
                  <TrashIcon/> 
                  Delete Project
                </Button>
              }
            </div>
          </Card>
        </Flex>
      </Container>
    </>
  )
}

export default TaskNewPage
