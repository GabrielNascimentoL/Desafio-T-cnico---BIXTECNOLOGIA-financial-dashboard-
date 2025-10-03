import { useColorModeValue } from '@chakra-ui/react'
import { ChartData } from '@/types/transaction'

interface UseLineChartProps {
  data: ChartData[]
}

export function useLineChart({ data }: UseLineChartProps) {
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

  const sampledData = data.filter((_, index) => index % Math.ceil(data.length / 20) === 0)

  const getLineColor = () => {
    if (sampledData.length === 0) return '#3182ce'
    const finalValue = sampledData[sampledData.length - 1]?.value || 0
    return finalValue >= 0 ? '#38a169' : '#e53e3e'
  }

  return {
    bgColor,
    borderColor,
    textColor,
    formatCurrency,
    sampledData,
    getLineColor
  }
}