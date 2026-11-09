'use client'

import { ChakraProvider as BaseProvider, defaultSystem } from "@chakra-ui/react"

export function Provider(props: { children: React.ReactNode }) {
  return (
    <BaseProvider value={defaultSystem}>
      {props.children}
    </BaseProvider>
  )
}
