import { useColorModeValue } from '@chakra-ui/react'
import { ChartData } from '@/types/transaction'

interface UseStackedBarChartProps {
  data: ChartData[]
}

export function useStackedBarChart({ data: _data }: UseStackedBarChartProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const textColor = useColorModeValue('gray.800', 'white')

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatMonth = (monthString: string) => {
    const [year, month] = monthString.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('pt-BR', { 
      month: 'short', 
      year: '2-digit' 
    })
  }

  const formatLegend = (value: string) => {
    return value === 'deposits' ? 'Receitas' : 'Despesas'
  }

  return {
    bgColor,
    borderColor,
    textColor,
    formatCurrency,
    formatMonth,
    formatLegend
  }
}