'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatArrow,
  Spinner,
  Center,
  useColorModeValue
} from '@chakra-ui/react'
import { useDashboard } from './index.hook'
import { StyledCard, StyledStatNumber, StyledStatLabel, GradientBox } from './styles'

export function Dashboard() {
  const { data, isLoading, formatCurrency, formatNumber } = useDashboard()
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  if (isLoading) {
    return (
      <Center h="100vh" bg={bgColor}>
        <Spinner size="xl" color="blue.500" thickness="4px" />
      </Center>
    )
  }

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 4, md: 8 }}>
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        <GradientBox mb={{ base: 6, md: 8 }}>
          <Box bg={bgColor} borderRadius="14px" p={{ base: 4, md: 6 }}>
            <Heading
              as="h1"
              size={{ base: 'xl', md: '2xl' }}
              textAlign="center"
              bgGradient="linear(to-r, blue.400, purple.500, pink.500)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Dashboard Financeiro
            </Heading>
          </Box>
        </GradientBox>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
          <StyledCard>
            <Stat>
              <StyledStatLabel>Receita Total</StyledStatLabel>
              <StyledStatNumber>{formatCurrency(data.totalRevenue)}</StyledStatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </StyledCard>

          <StyledCard style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Stat>
              <StyledStatLabel>Despesas Totais</StyledStatLabel>
              <StyledStatNumber>{formatCurrency(data.totalExpenses)}</StyledStatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
          </StyledCard>

          <StyledCard style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Stat>
              <StyledStatLabel>Lucro</StyledStatLabel>
              <StyledStatNumber>{formatCurrency(data.profit)}</StyledStatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12.05%
              </StatHelpText>
            </Stat>
          </StyledCard>

          <StyledCard style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <Stat>
              <StyledStatLabel>Transações</StyledStatLabel>
              <StyledStatNumber>{formatNumber(data.transactions)}</StyledStatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                5.67%
              </StatHelpText>
            </Stat>
          </StyledCard>
        </SimpleGrid>
      </Container>
    </Box>
  )
}