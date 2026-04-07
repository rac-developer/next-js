'use client';

import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'

function SignInForm() {

  // En el caso que el componente sea creado por nosotros y no exportado por una libreria
  // const {register, handleSubmit} = useForm()

  // En el caso que el componente viene de una libreria
  const {control, handleSubmit, formState: {errors} } = useForm({
    values: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2">
        <label htmlFor="email">Email</label>
        {/* Usamos el componente Controller, porque viene de una libreria ui */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              message: "Email is required",
              value: true
            }
          }}
          render={({ field }) => (
            <TextField.Root 
              type="email" 
              placeholder="email@domain.com"
              {...field} 
            >
              <TextField.Slot>
                <EnvelopeClosedIcon height="16" width="16" />
              </TextField.Slot> 
            </TextField.Root>
          )}
        />
        
        {errors.email && <Text color='ruby' className='text-xs'>{errors.email.message}</Text>}

        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: {
              message: "Password is required",
              value: true
            },
            minLength: {
              message: "Password must be at least 6 characters",
              value: 6
            }
          }}
          render={({ field }) => (
            <TextField.Root
              type="password" 
              placeholder="*********"
              {...field} 
            >
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot> 
            </TextField.Root>
          )}
        />

        {errors.password && <Text color='ruby' className='text-xs'>{errors.password.message}</Text>}

        <Button type='submit' mt="4">
          Sign in
        </Button>
      </Flex>
    </form>
    
  )
}

export default SignInForm