'use client'

import { 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Card, 
  Field, 
  Input, 
  Button, 
  Separator,
  Checkbox,
  Stack,
  Avatar,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { Save, User, Bell, Shield, Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <VStack align="stretch" gap={8}>
      <VStack align="start" gap={1}>
        <Heading size="xl">Settings</Heading>
        <Text color="gray.500">Manage your account and application preferences.</Text>
      </VStack>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
        <GridItem>
          <VStack align="stretch" gap={4}>
            <Card.Root variant="outline">
              <Card.Body p={4}>
                <VStack gap={4}>
                  <Avatar.Root size="2xl">
                    <Avatar.Fallback name="Admin" />
                  </Avatar.Root>
                  <VStack gap={0}>
                    <Text fontWeight="bold" fontSize="lg">Admin User</Text>
                    <Text color="gray.500" fontSize="sm">admin@lumina.com</Text>
                  </VStack>
                  <Button variant="outline" size="sm" w="full">Change Avatar</Button>
                </VStack>
              </Card.Body>
            </Card.Root>
            
            <VStack align="stretch" gap={2}>
              <Button variant="ghost" justifyContent="start" gap={3} bg="gray.100">
                <User size={18} /> Profile
              </Button>
              <Button variant="ghost" justifyContent="start" gap={3}>
                <Bell size={18} /> Notifications
              </Button>
              <Button variant="ghost" justifyContent="start" gap={3}>
                <Shield size={18} /> Security
              </Button>
              <Button variant="ghost" justifyContent="start" gap={3}>
                <Globe size={18} /> Language
              </Button>
            </VStack>
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align="stretch" gap={6}>
            <Card.Root variant="outline">
              <Card.Header>
                <Heading size="md">Profile Information</Heading>
              </Card.Header>
              <Card.Body>
                <Stack gap={4}>
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
                    <Field.Root>
                      <Field.Label>First Name</Field.Label>
                      <Input defaultValue="Admin" />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>Last Name</Field.Label>
                      <Input defaultValue="User" />
                    </Field.Root>
                  </Grid>
                  <Field.Root>
                    <Field.Label>Email Address</Field.Label>
                    <Input defaultValue="admin@lumina.com" />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Bio</Field.Label>
                    <Input defaultValue="Lead administrator at Lumina Dashboard." />
                  </Field.Root>
                  <Button colorPalette="blue" alignSelf="flex-end" gap={2}>
                    <Save size={18} /> Save Changes
                  </Button>
                </Stack>
              </Card.Body>
            </Card.Root>

            <Card.Root variant="outline">
              <Card.Header>
                <Heading size="md">Preferences</Heading>
              </Card.Header>
              <Card.Body>
                <VStack align="stretch" gap={4}>
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontWeight="600">Email Notifications</Text>
                      <Text fontSize="sm" color="gray.500">Receive weekly reports via email.</Text>
                    </VStack>
                    <Checkbox.Root defaultChecked>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </HStack>
                  <Separator />
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontWeight="600">Dark Mode</Text>
                      <Text fontSize="sm" color="gray.500">Enable dark theme for the dashboard.</Text>
                    </VStack>
                    <Checkbox.Root>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </HStack>
                  <Separator />
                  <HStack justify="space-between">
                    <VStack align="start" gap={0}>
                      <Text fontWeight="600">Public Profile</Text>
                      <Text fontSize="sm" color="gray.500">Allow others to see your profile.</Text>
                    </VStack>
                    <Checkbox.Root defaultChecked>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </HStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </VStack>
        </GridItem>
      </Grid>
    </VStack>
  )
}
