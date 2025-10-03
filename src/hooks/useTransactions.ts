import { useState, useEffect, useMemo } from 'react'
import { 
  Transaction, 
  ProcessedTransaction, 
  TransactionFilters, 
  DashboardSummary, 
  FilterOptions,
  ChartData 
} from '@/types/transaction'

const STORAGE_KEY = 'dashboard_filters'

export function useTransactions() {
  const [rawTransactions, setRawTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const [filters, setFilters] = useState<TransactionFilters>({
    dateRange: { start: null, end: null },
    accounts: [],
    industries: [],
    states: [],
    transactionTypes: []
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const loadSavedFilters = () => {
      try {
        const savedFilters = localStorage.getItem(STORAGE_KEY)
        if (savedFilters) {
          const parsed = JSON.parse(savedFilters)
          setFilters({
            ...parsed,
            dateRange: {
              start: parsed.dateRange?.start ? new Date(parsed.dateRange.start) : null,
              end: parsed.dateRange?.end ? new Date(parsed.dateRange.end) : null
            }
          })
        }
      } catch (error) {
        console.error('Erro ao carregar filtros salvos:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    loadSavedFilters()
  }, [isClient])
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetch('/transactions.json')
        const data: Transaction[] = await response.json()
        setRawTransactions(data)
      } catch (error) {
        console.error('Erro ao carregar transações:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [])

  useEffect(() => {
    if (!isClient) return

    try {
      const filtersToSave = {
        ...filters,
        dateRange: {
          start: filters.dateRange.start?.toISOString() || null,
          end: filters.dateRange.end?.toISOString() || null
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtersToSave))
    } catch (error) {
      console.error('Erro ao salvar filtros:', error)
    }
  }, [filters, isClient])

  const processedTransactions = useMemo((): ProcessedTransaction[] => {
    return rawTransactions.map((transaction, index) => {
      const amount = parseFloat(transaction.amount) / 100
      const date = new Date(transaction.date)
      
      return {
        ...transaction,
        id: `${transaction.date}-${index}`,
        amount,
        formattedAmount: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(amount),
        formattedDate: date.toLocaleDateString('pt-BR')
      }
    })
  }, [rawTransactions])

  const filteredTransactions = useMemo(() => {
    return processedTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      
      if (filters.dateRange.start && transactionDate < filters.dateRange.start) {
        return false
      }
      if (filters.dateRange.end && transactionDate > filters.dateRange.end) {
        return false
      }
      
      if (filters.accounts.length > 0 && !filters.accounts.includes(transaction.account)) {
        return false
      }
      
      if (filters.industries.length > 0 && !filters.industries.includes(transaction.industry)) {
        return false
      }
      
      if (filters.states.length > 0 && !filters.states.includes(transaction.state)) {
        return false
      }
      
      if (filters.transactionTypes.length > 0 && !filters.transactionTypes.includes(transaction.transaction_type)) {
        return false
      }
      
      return true
    })
  }, [processedTransactions, filters])

  const filterOptions = useMemo((): FilterOptions => {
    const accounts = [...new Set(processedTransactions.map(t => t.account))].sort()
    const industries = [...new Set(processedTransactions.map(t => t.industry))].sort()
    const states = [...new Set(processedTransactions.map(t => t.state))].sort()
    
    return { accounts, industries, states }
  }, [processedTransactions])

  const summary = useMemo((): DashboardSummary => {
    const deposits = filteredTransactions.filter(t => t.transaction_type === 'deposit')
    const withdraws = filteredTransactions.filter(t => t.transaction_type === 'withdraw')
    
    const totalRevenue = deposits.reduce((sum, t) => sum + t.amount, 0)
    const totalExpenses = withdraws.reduce((sum, t) => sum + t.amount, 0)
    const balance = totalRevenue - totalExpenses
    
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const pendingTransactions = filteredTransactions.filter(
      t => new Date(t.date) >= sevenDaysAgo
    ).length
    
    return {
      totalRevenue,
      totalExpenses,
      balance,
      pendingTransactions,
      transactionCount: filteredTransactions.length
    }
  }, [filteredTransactions])

  const stackedBarData = useMemo((): ChartData[] => {
    const monthlyData = new Map<string, { deposits: number; withdraws: number }>()
    
    filteredTransactions.forEach(transaction => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!monthlyData.has(monthKey)) {
        monthlyData.set(monthKey, { deposits: 0, withdraws: 0 })
      }
      
      const data = monthlyData.get(monthKey)!
      if (transaction.transaction_type === 'deposit') {
        data.deposits += transaction.amount
      } else {
        data.withdraws += transaction.amount
      }
    })
    
    return Array.from(monthlyData.entries())
      .map(([month, data]) => ({
        name: month,
        value: data.deposits + data.withdraws,
        deposits: data.deposits,
        withdraws: data.withdraws
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredTransactions])

  const lineChartData = useMemo((): ChartData[] => {
    const sortedTransactions = [...filteredTransactions].sort((a, b) => a.date - b.date)
    let cumulativeBalance = 0
    
    return sortedTransactions.map(transaction => {
      if (transaction.transaction_type === 'deposit') {
        cumulativeBalance += transaction.amount
      } else {
        cumulativeBalance -= transaction.amount
      }
      
      return {
        name: transaction.formattedDate,
        value: cumulativeBalance,
        date: transaction.formattedDate
      }
    })
  }, [filteredTransactions])

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      dateRange: { start: null, end: null },
      accounts: [],
      industries: [],
      states: [],
      transactionTypes: []
    })
  }

  return {
    transactions: filteredTransactions,
    isLoading,
    filters,
    filterOptions,
    summary,
    stackedBarData,
    lineChartData,
    updateFilters,
    clearFilters
  }
}