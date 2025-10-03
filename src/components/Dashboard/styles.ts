import styled from 'styled-components'
import { Box, StatNumber, StatLabel } from '@chakra-ui/react'

export const StyledCard = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`

export const StyledStatNumber = styled(StatNumber)`
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`

export const StyledStatLabel = styled(StatLabel)`
  font-size: 1rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export const GradientBox = styled(Box)`
  background: linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  border-radius: 16px;
  padding: 2px;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`