'use client'

import { 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Card, 
  Avatar, 
  Badge, 
  IconButton,
  Button,
  Grid,
  Flex,
  Separator
} from '@chakra-ui/react'
import { Mail, MoreVertical, UserPlus } from 'lucide-react'

const team = [
  { name: 'Sarah Wilson', role: 'Product Designer', status: 'Active', email: 'sarah@lumina.com' },
  { name: 'James Miller', role: 'Backend Engineer', status: 'Active', email: 'james@lumina.com' },
  { name: 'Elena Rodriguez', role: 'Marketing Lead', status: 'On Leave', email: 'elena@lumina.com' },
  { name: 'David Kim', role: 'Data Scientist', status: 'Active', email: 'david@lumina.com' },
  { name: 'Lisa Thompson', role: 'Frontend Developer', status: 'Active', email: 'lisa@lumina.com' },
  { name: 'Robert Chen', role: 'Security Analyst', status: 'Inactive', email: 'robert@lumina.com' },
]

export default function TeamPage() {
  return (
    <VStack align="stretch" gap={8}>
      <Flex justify="space-between" align="center">
        <VStack align="start" gap={1}>
          <Heading size="xl">Team Members</Heading>
          <Text color="gray.500">Manage your team and their access levels.</Text>
        </VStack>
        <Button colorPalette="blue" gap={2}>
          <UserPlus size={18} /> Invite Member
        </Button>
      </Flex>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
        {team.map((member, i) => (
          <Card.Root key={i} variant="outline" boxShadow="sm">
            <Card.Body p={6}>
              <VStack gap={4}>
                <Flex w="full" justify="space-between" align="start">
                  <Avatar.Root size="xl">
                    <Avatar.Fallback name={member.name} />
                  </Avatar.Root>
                  <IconButton variant="ghost" size="sm" aria-label="More">
                    <MoreVertical size={18} />
                  </IconButton>
                </Flex>
                
                <VStack gap={1} align="center">
                  <Text fontWeight="bold" fontSize="lg">{member.name}</Text>
                  <Text color="gray.500" fontSize="sm">{member.role}</Text>
                </VStack>

                <Badge 
                  colorPalette={member.status === 'Active' ? 'green' : member.status === 'On Leave' ? 'orange' : 'gray'}
                  variant="subtle"
                >
                  {member.status}
                </Badge>

                <Separator />

                <HStack w="full" justify="center" gap={4}>
                  <IconButton variant="outline" size="sm" aria-label="Email" borderRadius="full">
                    <Mail size={16} />
                  </IconButton>
                  <Button variant="ghost" size="sm">View Profile</Button>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </VStack>
  )
}
