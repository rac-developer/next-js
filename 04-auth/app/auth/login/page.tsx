import {Container, Card, Heading, Flex, Text, Link } from "@radix-ui/themes"
import SignInForm from "@/src/components/auth/SignInForm"
import NavLink from 'next/link'

function LoginPage() {
  return (
    <>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full p-7">
            <Heading>Sign in</Heading>
            <SignInForm/>
            <Flex justify="between" my="4">
              <Text>
                Don't have an account?
              </Text>
              <Link asChild>
                <NavLink
                href="/auth/register"
                >
                  Sign up
                </NavLink>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Container> 
    </>
  )
}

export default LoginPage