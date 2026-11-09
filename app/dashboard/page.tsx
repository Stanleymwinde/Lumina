'use client'

import { 
  Box, 
  Grid, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Card, 
  Badge, 
  Icon,
  Avatar,
  Flex
} from '@chakra-ui/react'
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
]

const barData = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 600 },
  { name: 'Thu', sales: 800 },
  { name: 'Fri', sales: 500 },
  { name: 'Sat', sales: 900 },
  { name: 'Sun', sales: 700 },
]

const StatCard = ({ label, value, change, icon, color }: any) => (
  <Card.Root variant="outline" boxShadow="sm">
    <Card.Body p={5}>
      <Flex justify="space-between" align="start">
        <VStack align="start" gap={1}>
          <Text fontSize="sm" color="gray.500" fontWeight="500">{label}</Text>
          <Heading size="lg">{value}</Heading>
          <HStack gap={1}>
            <Text fontSize="xs" color={change > 0 ? 'green.500' : 'red.500'} fontWeight="bold">
              {change > 0 ? '+' : ''}{change}%
            </Text>
            <Text fontSize="xs" color="gray.400">vs last month</Text>
          </HStack>
        </VStack>
        <Box p={3} bg={`${color}.50`} color={`${color}.500`} borderRadius="lg">
          <Icon as={icon} boxSize="5" />
        </Box>
      </Flex>
    </Card.Body>
  </Card.Root>
)

export default function OverviewPage() {
  return (
    <VStack align="stretch" gap={8}>
      <Flex justify="space-between" align="center">
        <VStack align="start" gap={1}>
          <Heading size="xl">Dashboard Overview</Heading>
          <Text color="gray.500">Welcome back, admin. Here&apos;s what&apos;s happening today.</Text>
        </VStack>
        <Badge colorPalette="blue" size="lg" variant="subtle" borderRadius="full" px={3}>
          Live Updates
        </Badge>
      </Flex>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
        <StatCard label="Total Revenue" value="$45,231.89" change={20.1} icon={DollarSign} color="blue" />
        <StatCard label="Subscriptions" value="+2,350" change={180.1} icon={Users} color="purple" />
        <StatCard label="Sales" value="+12,234" change={19} icon={ShoppingBag} color="green" />
        <StatCard label="Active Now" value="+573" change={-12} icon={TrendingUp} color="orange" />
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <Card.Root variant="outline">
          <Card.Header>
            <Heading size="md">Revenue Growth</Heading>
          </Card.Header>
          <Card.Body h="350px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182ce" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3182ce" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3182ce" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card.Root>

        <Card.Root variant="outline">
          <Card.Header>
            <Heading size="md">Weekly Sales</Heading>
          </Card.Header>
          <Card.Body h="350px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="sales" fill="#805ad5" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card.Root>
      </Grid>

      <Card.Root variant="outline">
        <Card.Header>
          <Heading size="md">Recent Transactions</Heading>
        </Card.Header>
        <Card.Body p={0}>
          <Box overflowX="auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Customer</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Status</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Date</th>
                  <th style={{ padding: '16px', color: '#64748b', fontSize: '14px', fontWeight: '500', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Alex Johnson', status: 'Completed', date: '2023-10-24', amount: '$250.00' },
                  { name: 'Sarah Williams', status: 'Pending', date: '2023-10-23', amount: '$120.50' },
                  { name: 'Michael Chen', status: 'Completed', date: '2023-10-22', amount: '$540.00' },
                  { name: 'Emma Davis', status: 'Failed', date: '2023-10-21', amount: '$89.00' },
                ].map((item, i) => (
                  <tr key={i} style={{ borderBottom: i === 3 ? 'none' : '1px solid #f0f0f0' }}>
                    <td style={{ padding: '16px' }}>
                      <HStack gap={3}>
                        <Avatar.Root size="xs">
                          <Avatar.Fallback name={item.name} />
                        </Avatar.Root>
                        <Text fontWeight="500">{item.name}</Text>
                      </HStack>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Badge 
                        colorPalette={item.status === 'Completed' ? 'green' : item.status === 'Pending' ? 'orange' : 'red'}
                        variant="subtle"
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>{item.date}</td>
                    <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600' }}>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}
