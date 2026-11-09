'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  user: { username: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean;
    user: { username: string } | null;
    isLoading: boolean;
  }>(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const storedAuth = localStorage.getItem('lumina_auth')
      if (storedAuth === 'true') {
        return {
          isAuthenticated: true,
          user: { username: 'admin' },
          isLoading: false,
        }
      }
    }
    return {
      isAuthenticated: false,
      user: null,
      isLoading: true,
    }
  })
  const router = useRouter()

  useEffect(() => {
    if (authState.isLoading) {
      Promise.resolve().then(() => {
        setAuthState(prev => ({ ...prev, isLoading: false }))
      })
    }
  }, [authState.isLoading])

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'password123') {
      setAuthState({
        isAuthenticated: true,
        user: { username },
        isLoading: false,
      })
      localStorage.setItem('lumina_auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    })
    localStorage.removeItem('lumina_auth')
    router.push('/login')
  }

  if (authState.isLoading) return null

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: authState.isAuthenticated, 
      login, 
      logout, 
      user: authState.user 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
