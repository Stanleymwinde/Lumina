'use client'

import { 
  Box, 
  Flex, 
  Icon, 
  Text, 
  VStack, 
  HStack,
  IconButton,
  Separator,
  Button,
  Avatar
} from '@chakra-ui/react'
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  Users
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SidebarItem = ({ icon, label, path, active, onClick }: any) => (
  <HStack
    as="button"
    onClick={onClick}
    w="full"
    p={3}
    borderRadius="lg"
    bg={active ? 'blue.50' : 'transparent'}
    color={active ? 'blue.600' : 'gray.600'}
    _hover={{ bg: active ? 'blue.50' : 'gray.50', color: active ? 'blue.600' : 'gray.900' }}
    transition="all 0.2s"
    cursor="pointer"
    gap={3}
  >
    <Icon as={icon} boxSize="5" />
    <Text fontWeight={active ? '600' : '500'}>{label}</Text>
  </HStack>
)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Sparkles, label: 'AI Insights', path: '/dashboard/ai' },
    { icon: Users, label: 'Team', path: '/dashboard/team' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ]

  const handleNav = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <Flex minH="100vh" bg="gray.50">
      <Box
        display={{ base: 'none', md: 'block' }}
        w="260px"
        bg="white"
        borderRightWidth="1px"
        p={6}
        position="sticky"
        top={0}
        h="100vh"
      >
        <VStack h="full" align="stretch" gap={8}>
          <HStack gap={3} px={2}>
            <Box p={2} bg="blue.500" borderRadius="lg" color="white">
              <LayoutDashboard size={20} />
            </Box>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">Lumina</Text>
          </HStack>

          <VStack align="stretch" gap={1} flex={1}>
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                {...item}
                active={pathname === item.path}
                onClick={() => handleNav(item.path)}
              />
            ))}
          </VStack>

          <VStack align="stretch" gap={4}>
            <Separator />
            <HStack gap={3} px={2}>
              <Avatar.Root size="sm">
                <Avatar.Fallback name="Admin" />
              </Avatar.Root>
              <VStack align="start" gap={0} flex={1}>
                <Text fontSize="sm" fontWeight="600" color="gray.800">Admin User</Text>
                <Text fontSize="xs" color="gray.500">admin@lumina.com</Text>
              </VStack>
              <IconButton
                aria-label="Logout"
                variant="ghost"
                size="sm"
                onClick={logout}
                color="gray.400"
                _hover={{ color: 'red.500' }}
              >
                <LogOut size={18} />
              </IconButton>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      <Box display={{ base: 'block', md: 'none' }} position="fixed" top={0} left={0} right={0} bg="white" borderBottomWidth="1px" zIndex={100} px={4} py={3}>
        <Flex justify="space-between" align="center">
          <HStack gap={2}>
             <Box p={1.5} bg="blue.500" borderRadius="md" color="white">
              <LayoutDashboard size={16} />
            </Box>
            <Text fontWeight="bold">Lumina</Text>
          </HStack>
          <IconButton
            aria-label="Menu"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Flex>
      </Box>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            style={{
              position: 'fixed',
              top: '57px',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'white',
              zIndex: 99,
              padding: '24px'
            }}
          >
            <VStack align="stretch" gap={2}>
              {navItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  {...item}
                  active={pathname === item.path}
                  onClick={() => handleNav(item.path)}
                />
              ))}
              <Separator my={4} />
              <Button variant="ghost" colorPalette="red" justifyContent="start" onClick={logout} gap={3}>
                <LogOut size={20} />
                Logout
              </Button>
            </VStack>
          </motion.div>
        )}
      </AnimatePresence>

      <Box flex={1} p={{ base: 4, md: 8 }} pt={{ base: '80px', md: 8 }} overflowY="auto">
        <Box maxW="7xl" mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
