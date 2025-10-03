'use client'

import React, { useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Spinner,
  Center,
  Grid,
  GridItem,
  useColorModeValue,
  useDisclosure,
  IconButton
} from '@chakra-ui/react'
import styled from 'styled-components'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useTransactions } from '@/hooks/useTransactions'
import { Sidebar } from '@/components/Sidebar'
import { Filters } from '@/components/Filters'
import { SummaryCards } from '@/components/SummaryCards'
import { StackedBarChart } from '@/components/Charts/StackedBarChart'
import { CustomLineChart } from '@/components/Charts/LineChart'

const StyledMainContent = styled(Box)`
  margin-left: 280px;
  min-height: 100vh;
  background: #f7fafc;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const StyledDashboardHeader = styled(Box)`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 24px 0;
  margin-bottom: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const StyledContentSection = styled(VStack)`
  gap: 32px;
  align-items: stretch;
`

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const {
    transactions,
    isLoading,
    filters,
    filterOptions,
    summary,
    stackedBarData,
    lineChartData,
    updateFilters,
    clearFilters
  } = useTransactions()

  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    )
  }

  if (isLoading) {
    return (
      <Center h="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="teal.500" />
          <Text>Carregando dados financeiros...</Text>
        </VStack>
      </Center>
    )
  }

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onClose={onClose} />
      
      {/* Conteúdo Principal */}
      <StyledMainContent>
        {/* Header */}
        <StyledDashboardHeader bg={headerBg}>
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            <HStack justify="space-between" align="center" spacing={{ base: 2, md: 4 }}>
              <VStack align="start" spacing={{ base: 0, md: 1 }} flex="1">
                <Text 
                  fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} 
                  fontWeight="bold"
                  noOfLines={1}
                >
                  Dashboard Financeiro
                </Text>
                <Text 
                  color="gray.600" 
                  fontSize={{ base: 'sm', md: 'md' }}
                  display={{ base: 'none', sm: 'block' }}
                >
                  Bem-vindo de volta, {user?.name || 'Usuário'}!
                </Text>
              </VStack>
              
              {/* Botão para mobile */}
              <IconButton
                aria-label="Abrir menu"
                icon={<Text fontSize="lg">☰</Text>}
                variant="ghost"
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                size={{ base: 'sm', sm: 'md' }}
              />
            </HStack>
          </Container>
        </StyledDashboardHeader>

        {/* Conteúdo */}
        <Container 
          maxW="7xl" 
          px={{ base: 4, md: 6 }}
          pb={{ base: 6, md: 8 }}
        >
          <StyledContentSection>
            {/* Cards de Resumo */}
            <SummaryCards summary={summary} />

            {/* Layout Principal */}
            <Grid
              templateColumns={{ 
                base: '1fr', 
                md: '1fr', 
                lg: '300px 1fr',
                xl: '320px 1fr'
              }}
              gap={{ base: 4, md: 6, lg: 8 }}
              alignItems="start"
            >
              {/* Filtros */}
              <GridItem order={{ base: 2, lg: 1 }}>
                <Filters
                  filters={filters}
                  filterOptions={filterOptions}
                  onUpdateFilters={updateFilters}
                  onClearFilters={clearFilters}
                />
              </GridItem>

              {/* Gráficos */}
              <GridItem order={{ base: 1, lg: 2 }}>
                <VStack spacing={{ base: 4, md: 6, lg: 8 }} align="stretch">
                  <StackedBarChart 
                    data={stackedBarData}
                    title="Receitas vs Despesas por Mês"
                  />
                  <CustomLineChart 
                    data={lineChartData}
                    title="Evolução do Saldo Acumulado"
                  />
                </VStack>
              </GridItem>
            </Grid>

            {/* Informações Adicionais */}
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="sm"
              border="1px solid"
              borderColor="gray.200"
            >
              <VStack align="start" spacing={3}>
                <Text fontSize="lg" fontWeight="bold">
                  Resumo dos Filtros Aplicados
                </Text>
                <HStack wrap="wrap" spacing={4}>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Total de transações:</strong> {transactions.length}
                  </Text>
                  {filters.accounts.length > 0 && (
                    <Text fontSize="sm" color="gray.600">
                      <strong>Contas:</strong> {filters.accounts.join(', ')}
                    </Text>
                  )}
                  {filters.industries.length > 0 && (
                    <Text fontSize="sm" color="gray.600">
                      <strong>Indústrias:</strong> {filters.industries.join(', ')}
                    </Text>
                  )}
                  {filters.states.length > 0 && (
                    <Text fontSize="sm" color="gray.600">
                      <strong>Estados:</strong> {filters.states.join(', ')}
                    </Text>
                  )}
                  {filters.transactionTypes.length > 0 && (
                    <Text fontSize="sm" color="gray.600">
                      <strong>Tipos:</strong> {filters.transactionTypes.map(t => 
                        t === 'deposit' ? 'Receita' : 'Despesa'
                      ).join(', ')}
                    </Text>
                  )}
                </HStack>
              </VStack>
            </Box>
          </StyledContentSection>
        </Container>
      </StyledMainContent>
    </Box>
  )
}