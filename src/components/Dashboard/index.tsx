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
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import { useDashboard } from './index.hook'
import { StyledCard, StyledStatNumber, StyledStatLabel, GradientBox } from './styles'

export function Dashboard() {
  const { data, isLoading, formatCurrency, formatNumber } = useDashboard()
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  if (isLoading) {
    return (
      <Center h="100vh" bg={bgColor}>
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Box color="gray.600" fontSize="lg">
            Carregando dashboard...
          </Box>
        </VStack>
      </Center>
    )
  }

  return (
    <Box bg={bgColor} minH="100vh" py={{ base: 6, md: 8 }} px={{ base: 4, md: 0 }}>
      <Container maxW="7xl">
        <VStack spacing={{ base: 6, md: 8 }} align="stretch">
          <GradientBox>
            <Box bg={bgColor} borderRadius="16px" p={{ base: 6, md: 8 }}>
              <Heading
                as="h1"
                size={{ base: 'xl', md: '2xl' }}
                textAlign="center"
                bgGradient="linear(to-r, blue.400, purple.500, pink.500)"
                bgClip="text"
                fontWeight="extrabold"
                mb={2}
              >
                Dashboard Financeiro
              </Heading>
              <Box
                textAlign="center"
                color="gray.600"
                fontSize={{ base: 'md', md: 'lg' }}
              >
                Visão geral das suas finanças
              </Box>
            </Box>
          </GradientBox>

          <SimpleGrid 
            columns={{ base: 1, sm: 2, lg: 4 }} 
            spacing={{ base: 4, md: 6 }}
            w="full"
          >
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
        </VStack>
      </Container>
    </Box>
  )
}