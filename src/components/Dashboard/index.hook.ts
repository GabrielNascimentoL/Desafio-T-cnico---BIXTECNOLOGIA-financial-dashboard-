import { useState, useEffect } from 'react'

export interface DashboardData {
  totalRevenue: number
  totalExpenses: number
  profit: number
  transactions: number
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    totalExpenses: 0,
    profit: 0,
    transactions: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData: DashboardData = {
        totalRevenue: 125000,
        totalExpenses: 87500,
        profit: 37500,
        transactions: 1247
      }
      
      setData(mockData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  return {
    data,
    isLoading,
    formatCurrency,
    formatNumber
  }
}