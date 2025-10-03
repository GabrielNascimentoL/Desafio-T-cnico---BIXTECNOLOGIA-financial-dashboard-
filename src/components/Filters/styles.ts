import styled from 'styled-components'
import { Box, VStack } from '@chakra-ui/react'

export const StyledFilterContainer = styled(Box)`
  background: ${props => props.theme?.colors?.white || '#ffffff'};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`

export const StyledFilterSection = styled(VStack)`
  align-items: flex-start;
  width: 100%;
  gap: 16px;
`