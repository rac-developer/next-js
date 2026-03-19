"use client"

import { Flex, TextField, Button, Text } from '@radix-ui/themes'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'

function SignUpForm() {

  const {control, handleSubmit, formState: {errors} } = useForm({
    values: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Flex direction="column" gap="2">

      <label htmlFor="name">Name:</label>
      <Controller
        name="name"
        control={control}
        rules={{
          required: {
            message: "Name is required",
            value: true
          }
        }}
        render= {({ field }) => (
          <TextField.Root 
            type="text" 
            placeholder="Write your name"
            {...field}
          >
            <TextField.Slot>  
              <PersonIcon height="16" width="16" />
            </TextField.Slot> 
          </TextField.Root>
        )}
      />

      {errors.name && <Text color='ruby' className='text-xs'>{errors.name.message}</Text>}

      <label htmlFor="email">Email</label>
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
export default SignUpForm