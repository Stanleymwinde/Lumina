'use client'

import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Card, 
  Grid, 
  Badge, 
  Button,
  Flex
} from '@chakra-ui/react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Download, Filter, Calendar } from 'lucide-react'

const lineData = [
  { name: 'Mon', organic: 4000, paid: 2400 },
  { name: 'Tue', organic: 3000, paid: 1398 },
  { name: 'Wed', organic: 2000, paid: 9800 },
  { name: 'Thu', organic: 2780, paid: 3908 },
  { name: 'Fri', organic: 1890, paid: 4800 },
  { name: 'Sat', organic: 2390, paid: 3800 },
  { name: 'Sun', organic: 3490, paid: 4300 },
]

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Social', value: 300 },
  { name: 'Referral', value: 300 },
  { name: 'Search', value: 200 },
]

const COLORS = ['#3182ce', '#805ad5', '#38a169', '#e53e3e']

export default function AnalyticsPage() {
  return (
    <VStack align="stretch" gap={8}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <VStack align="start" gap={1}>
          <Heading size="xl">Advanced Analytics</Heading>
          <Text color="gray.500">Deep dive into your traffic and conversion metrics.</Text>
        </VStack>
        <HStack gap={3}>
          <Button variant="outline" size="sm" gap={2}>
            <Calendar size={14} /> Last 30 Days
          </Button>
          <Button variant="outline" size="sm" gap={2}>
            <Filter size={14} /> Filter
          </Button>
          <Button colorPalette="blue" size="sm" gap={2}>
            <Download size={14} /> Export
          </Button>
        </HStack>
      </Flex>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <Card.Root variant="outline">
          <Card.Header>
            <HStack justify="space-between">
              <Heading size="md">Traffic Sources</Heading>
              <HStack gap={4}>
                <HStack gap={1}><Box w={3} h={3} borderRadius="full" bg="blue.500" /><Text fontSize="xs">Organic</Text></HStack>
                <HStack gap={1}><Box w={3} h={3} borderRadius="full" bg="purple.500" /><Text fontSize="xs">Paid</Text></HStack>
              </HStack>
            </HStack>
          </Card.Header>
          <Card.Body h="400px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="organic" stroke="#3182ce" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="paid" stroke="#805ad5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Heading size="md">Channel Distribution</Heading>
          </Card.Header>
          <Card.Body h="400px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <VStack align="stretch" w="full" gap={2} mt={4}>
              {pieData.map((item, i) => (
                <HStack key={i} justify="space-between">
                  <HStack gap={2}>
                    <Box w={3} h={3} borderRadius="full" bg={COLORS[i]} />
                    <Text fontSize="sm">{item.name}</Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="bold">{item.value}</Text>
                </HStack>
              ))}
            </VStack>
          </Card.Body>
        </Card.Root>
      </Grid>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
        {[
          { label: 'Bounce Rate', value: '42.3%', change: -2.1, status: 'good' },
          { label: 'Avg. Session', value: '4m 32s', change: 12.5, status: 'good' },
          { label: 'Conversion', value: '3.2%', change: -0.5, status: 'neutral' },
        ].map((stat, i) => (
          <Card.Root key={i} variant="outline">
            <Card.Body p={5}>
              <VStack align="start" gap={1}>
                <Text fontSize="sm" color="gray.500">{stat.label}</Text>
                <Heading size="lg">{stat.value}</Heading>
                <Badge colorPalette={stat.change > 0 ? 'green' : 'orange'} variant="subtle">
                  {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
                </Badge>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </Grid>
    </VStack>
  )
}
