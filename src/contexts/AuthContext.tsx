"use client"

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

  // Helper para ler cookie no client
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return undefined
    const value = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
    return value?.split('=')[1]
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('dashboard_user')
    const savedAuthLocal = localStorage.getItem('dashboard_auth')
    const savedAuthCookie = getCookie('dashboard_auth')
    const isAuth = savedAuthLocal === 'true' || savedAuthCookie === 'true'
    
    if (savedUser && isAuth) {
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
        // Sinaliza para o middleware via cookie
        if (typeof document !== 'undefined') {
          const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
          document.cookie = `dashboard_auth=true; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${secureFlag}`
        }
        
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
    // Remove cookie para o middleware
    if (typeof document !== 'undefined') {
      const secureFlag = window.location.protocol === 'https:' ? '; Secure' : ''
      document.cookie = `dashboard_auth=; Path=/; Max-Age=0; SameSite=Lax${secureFlag}`
    }
    
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