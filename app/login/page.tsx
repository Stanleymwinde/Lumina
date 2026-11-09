'use client'

import { useState } from 'react'
import { 
  Box, 
  Button, 
  Container, 
  Field, 
  Heading, 
  Input, 
  Stack, 
  Text, 
  VStack
} from '@chakra-ui/react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import { motion } from 'motion/react'

const MotionBox = motion(Box)

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    const success = login(username, password)
    if (success) {
      router.push('/dashboard')
    } else {
      alert('Invalid credentials. Try admin / password123')
    }
    setIsLoading(false)
  }

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Container maxW="md">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
          borderWidth="1px"
        >
          <VStack gap={6} align="stretch">
            <VStack gap={2} align="center">
              <Box p={3} bg="blue.500" borderRadius="lg" color="white">
                <Lock size={24} />
              </Box>
              <Heading size="xl" color="gray.800">Lumina</Heading>
              <Text color="gray.500">Sign in to your dashboard</Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input 
                    placeholder="admin" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Field.Root>

                <Button 
                  type="submit" 
                  colorPalette="blue" 
                  size="lg" 
                  width="full"
                  loading={isLoading}
                >
                  Sign In
                </Button>
              </Stack>
            </form>

            <Text fontSize="xs" color="gray.400" textAlign="center">
              Demo Credentials: admin / password123
            </Text>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}
