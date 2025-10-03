import styled from 'styled-components'
import { Box, Button, VStack } from '@chakra-ui/react'

export const StyledSidebar = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen?: boolean }>`
  background: ${props => props.theme?.colors?.white || '#ffffff'};
  border-right: 1px solid #e2e8f0;
  height: 100vh;
  width: 280px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 100vw;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }

  @media (min-width: 481px) and (max-width: 768px) {
    width: 280px;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }

  @media (min-width: 769px) {
    transform: translateX(0);
  }
`

export const StyledNavItem = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    transform: translateX(4px);
  }

  &.active {
    background: #e6fffa;
    color: #319795;
    border-left: 4px solid #319795;
  }
`

export const StyledUserSection = styled(Box)`
  padding: 24px 20px;
  border-bottom: 1px solid #e2e8f0;
`

export const StyledNavSection = styled(VStack)`
  padding: 24px 20px;
  flex: 1;
  align-items: stretch;
`

export const StyledFooterSection = styled(Box)`
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  margin-top: auto;
`