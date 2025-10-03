'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextType, AuthState, LoginCredentials, User } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const MOCK_USER: User = {
  id: '1',
  email: 'admin@dashboard.com',
  name: 'Administrador',
  avatar: 'https://via.placeholder.com/40'
}

const MOCK_CREDENTIALS = {
  email: 'admin@dashboard.com',
  password: 'admin123'
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('dashboard_user')
    const savedAuth = localStorage.getItem('dashboard_auth')
    
    if (savedUser && savedAuth === 'true') {
      try {
        const user = JSON.parse(savedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        })
      } catch (error) {
        console.error('Erro ao recuperar sessão:', error)
        localStorage.removeItem('dashboard_user')
        localStorage.removeItem('dashboard_auth')
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (
        credentials.email === MOCK_CREDENTIALS.email &&
        credentials.password === MOCK_CREDENTIALS.password
      ) {
        localStorage.setItem('dashboard_user', JSON.stringify(MOCK_USER))
        localStorage.setItem('dashboard_auth', 'true')
        
        setAuthState({
          user: MOCK_USER,
          isAuthenticated: true,
          isLoading: false
        })
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('dashboard_user')
    localStorage.removeItem('dashboard_auth')
    localStorage.removeItem('dashboard_filters')
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    })
  }

  const value: AuthContextType = {
    ...authState,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}