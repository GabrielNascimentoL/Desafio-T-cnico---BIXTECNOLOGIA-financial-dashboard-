import { useColorModeValue } from '@chakra-ui/react'
import { DashboardSummary } from '@/types/transaction'

interface UseSummaryCardsProps {
  summary: DashboardSummary
}

export function useSummaryCards({ summary }: UseSummaryCardsProps) {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const cards = [
    {
      label: 'Receitas Totais',
      value: formatCurrency(summary.totalRevenue),
      color: '#38a169',
      helpText: 'Total de entradas',
      trend: summary.totalRevenue > 0 ? 'increase' : 'neutral',
      bgGradient: 'linear(to-r, green.400, green.600)'
    },
    {
      label: 'Despesas Totais',
      value: formatCurrency(summary.totalExpenses),
      color: '#e53e3e',
      helpText: 'Total de saídas',
      trend: summary.totalExpenses > 0 ? 'decrease' : 'neutral',
      bgGradient: 'linear(to-r, red.400, red.600)'
    },
    {
      label: 'Saldo Total',
      value: formatCurrency(summary.balance),
      color: summary.balance >= 0 ? '#38a169' : '#e53e3e',
      helpText: summary.balance >= 0 ? 'Saldo positivo' : 'Saldo negativo',
      trend: summary.balance >= 0 ? 'increase' : 'decrease',
      bgGradient: summary.balance >= 0 
        ? 'linear(to-r, green.400, green.600)' 
        : 'linear(to-r, red.400, red.600)'
    },
    {
      label: 'Transações Pendentes',
      value: summary.pendingTransactions.toString(),
      color: '#3182ce',
      helpText: 'Últimos 7 dias',
      trend: 'neutral',
      bgGradient: 'linear(to-r, blue.400, blue.600)'
    }
  ]

  return {
    cardBg,
    borderColor,
    cards
  }
}