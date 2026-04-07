import {Container, Card, Heading, Flex, Text, Link } from "@radix-ui/themes"
import NavLink from 'next/link'
import SignUpForm from '@/src/components/auth/SignUpForm'
/* The `async` keyword in JavaScript/TypeScript is used to define an asynchronous function. An
asynchronous function is a function that operates asynchronously via the event loop, using
Promises or the `await` keyword to handle asynchronous operations. This allows the function
to pause execution while waiting for asynchronous operations to complete, without blocking
the main thread. */

function RegisterPage() {
  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full p-7">
            <Heading>Sign Up</Heading>
            <SignUpForm></SignUpForm>
            <Flex justify="between" my="4">
              <Text>
                Already have an Accout?
              </Text>
              <Link asChild>
                <NavLink
                href="/auth/login"
                >
                  Sign in
                </NavLink>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Container> 
    </>
  )
}

export default RegisterPage