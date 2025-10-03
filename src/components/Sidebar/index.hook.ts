import { useColorModeValue } from '@chakra-ui/react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export interface NavItem {
  label: string
  icon: string
  action: () => void
  active: boolean
}

export function useSidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.800', 'white')

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleHome = () => {
    router.push('/dashboard')
  }

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      action: handleHome,
      active: true
    }
  ]

  return {
    user,
    bgColor,
    borderColor,
    textColor,
    navItems,
    handleLogout,
    handleHome
  }
}