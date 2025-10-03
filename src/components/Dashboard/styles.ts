import styled from 'styled-components'
import { Box, StatNumber, StatLabel } from '@chakra-ui/react'

export const StyledCard = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 140px;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    min-height: 120px;
    
    &:hover {
      transform: translateY(-4px) scale(1.01);
    }
  }
`

export const StyledStatNumber = styled(StatNumber)`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  margin: 8px 0;
`

export const StyledStatLabel = styled(StatLabel)`
  font-size: clamp(0.85rem, 2vw, 1rem);
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  font-weight: 600;
  margin-bottom: 4px;
`

export const GradientBox = styled(Box)`
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  animation: gradientShift 12s ease infinite;
  border-radius: 20px;
  padding: 3px;
  position: relative;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    25% { background-position: 100% 50%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
    100% { background-position: 0% 50%; }
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    padding: 2px;
  }
`