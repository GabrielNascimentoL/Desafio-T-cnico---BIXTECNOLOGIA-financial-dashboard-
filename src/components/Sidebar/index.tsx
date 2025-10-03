'use client'

import React from 'react'
import {
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Divider
} from '@chakra-ui/react'
import { useSidebar } from './index.hook'
import {
  StyledSidebar,
  StyledNavItem,
  StyledUserSection,
  StyledNavSection,
  StyledFooterSection
} from './styles'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const {
    user,
    bgColor,
    borderColor,
    textColor,
    navItems,
    handleLogout
  } = useSidebar()

  return (
    <StyledSidebar 
      bg={bgColor} 
      borderColor={borderColor}
      isOpen={isOpen}
    >
      <VStack spacing={0} height="100%" align="stretch">

        <StyledUserSection>
          <HStack spacing={3}>
            <Avatar 
              size="md" 
              name={user?.name || 'Usuário'} 
              bg="teal.500"
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold" fontSize="md" color={textColor}>
                {user?.name || 'Usuário'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {user?.email || 'usuario@exemplo.com'}
              </Text>
            </VStack>
          </HStack>
        </StyledUserSection>


        <StyledNavSection>
          <Text fontSize="xs" fontWeight="bold" color="gray.500" mb={4} textTransform="uppercase">
            Navegação
          </Text>
          {navItems.map((item, index) => (
            <StyledNavItem
              key={index}
              variant="ghost"
              leftIcon={<Text fontSize="lg">{item.icon}</Text>}
              className={item.active ? 'active' : ''}
              onClick={item.action}
              color={textColor}
            >
              {item.label}
            </StyledNavItem>
          ))}
        </StyledNavSection>


        <StyledFooterSection>
          <VStack spacing={3}>
            <Divider />
            <Button
              variant="outline"
              colorScheme="red"
              size="sm"
              width="100%"
              onClick={handleLogout}
            >
              🚪 Sair
            </Button>
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Financial Dashboard v1.0
            </Text>
          </VStack>
        </StyledFooterSection>
      </VStack>
    </StyledSidebar>
  )
}