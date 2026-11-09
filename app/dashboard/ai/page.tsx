'use client'

import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Card, 
  Button, 
  Input, 
  Separator,
  Spinner,
  Badge,
  IconButton
} from '@chakra-ui/react'
import { Sparkles, Send, Bot, User, RefreshCcw } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { GoogleGenAI } from '@google/genai'
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'motion/react'

export default function AIInsightsPage() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: 'Hello! I am your Lumina AI assistant. I can help you analyze your dashboard data, predict trends, or answer any business questions you have. How can I assist you today?' }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return

    const userMsg = prompt
    setPrompt('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsLoading(true)

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string })
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `Context: You are an AI assistant for a business dashboard called Lumina. The user is asking about their business data. If they ask for specific numbers not provided, make reasonable professional estimates based on the "Overview" data: Total Revenue $45k, 2.3k subs, 12k sales. User Question: ${userMsg}` }] }
        ]
      })

      const aiResponse = response.text || 'I am sorry, I could not generate a response at this time.'
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, { role: 'ai', content: 'Error connecting to AI service. Please check your API key.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack align="stretch" gap={6} h="calc(100vh - 160px)">
      <HStack justify="space-between">
        <VStack align="start" gap={1}>
          <HStack gap={2}>
            <Heading size="xl">AI Insights</Heading>
            <Badge colorPalette="purple" variant="solid">Beta</Badge>
          </HStack>
          <Text color="gray.500">Powered by Gemini AI for deep business analysis.</Text>
        </VStack>
        <Button variant="outline" size="sm" onClick={() => setMessages([messages[0]])} gap={2}>
          <RefreshCcw size={14} /> Clear Chat
        </Button>
      </HStack>

      <Card.Root variant="outline" flex={1} overflow="hidden" boxShadow="sm">
        <Card.Body p={0} display="flex" flexDirection="column" h="full">
          <Box 
            ref={scrollRef}
            flex={1} 
            overflowY="auto" 
            p={6} 
            bg="gray.50/50"
            display="flex"
            flexDirection="column"
            gap={4}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <HStack 
                    align="start" 
                    gap={3} 
                    justify={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    {msg.role === 'ai' && (
                      <Box p={2} bg="purple.500" color="white" borderRadius="lg">
                        <Bot size={18} />
                      </Box>
                    )}
                    <Box 
                      maxW="80%" 
                      p={4} 
                      borderRadius="2xl" 
                      bg={msg.role === 'user' ? 'blue.500' : 'white'}
                      color={msg.role === 'user' ? 'white' : 'gray.800'}
                      boxShadow="sm"
                      borderWidth={msg.role === 'ai' ? '1px' : '0'}
                    >
                      <div className="markdown-body">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </Box>
                    {msg.role === 'user' && (
                      <Box p={2} bg="gray.200" color="gray.600" borderRadius="lg">
                        <User size={18} />
                      </Box>
                    )}
                  </HStack>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <HStack gap={3}>
                <Box p={2} bg="purple.500" color="white" borderRadius="lg">
                  <Bot size={18} />
                </Box>
                <Box p={4} bg="white" borderRadius="2xl" boxShadow="sm" borderWidth="1px">
                  <Spinner size="sm" color="purple.500" />
                </Box>
              </HStack>
            )}
          </Box>

          <Separator />

          <Box p={4} bg="white">
            <HStack gap={3}>
              <Input 
                placeholder="Ask about your business trends..." 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                size="lg"
                borderRadius="full"
                bg="gray.50"
                _focus={{ bg: 'white', borderColor: 'blue.500' }}
              />
              <IconButton
                aria-label="Send"
                colorPalette="blue"
                borderRadius="full"
                size="lg"
                onClick={handleSend}
                disabled={isLoading || !prompt.trim()}
              >
                <Send size={20} />
              </IconButton>
            </HStack>
          </Box>
        </Card.Body>
      </Card.Root>
    </VStack>
  )
}
