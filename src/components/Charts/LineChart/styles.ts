import styled from 'styled-components'
import { Box } from '@chakra-ui/react'

export const StyledChartContainer = styled(Box)`
  background: ${props => props.theme?.colors?.white || '#ffffff'};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  height: 350px;

  @media (min-width: 480px) {
    padding: 20px;
    height: 380px;
  }

  @media (min-width: 768px) {
    padding: 24px;
    height: 400px;
  }

  @media (min-width: 1024px) {
    height: 450px;
  }
`