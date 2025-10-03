import styled from 'styled-components'
import { Box, StatNumber, StatLabel } from '@chakra-ui/react'

export const StyledCard = styled(Box).withConfig({
  shouldForwardProp: (prop) => prop !== 'color'
})<{ color?: string }>`
  background: ${props => props.theme?.colors?.white || '#ffffff'};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (min-width: 480px) {
    padding: 20px;
  }

  @media (min-width: 768px) {
    padding: 24px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.color || '#3182ce'};
  }
`

export const StyledStatNumber = styled(StatNumber).withConfig({
  shouldForwardProp: (prop) => prop !== 'color'
})<{ color?: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.color || '#2d3748'};

  @media (min-width: 480px) {
    font-size: 1.75rem;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`

export const StyledStatLabel = styled(StatLabel)`
  font-size: 0.875rem;
  font-weight: 600;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`