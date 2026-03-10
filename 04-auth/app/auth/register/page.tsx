import {Container, Card, Heading, Flex, Text, Link } from "@radix-ui/themes"
import NavLink from 'next/link'
import SignUpForm from '@/src/components/auth/SignUpForm'

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