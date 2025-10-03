import { useColorModeValue } from '@chakra-ui/react'
import { TransactionFilters } from '@/types/transaction'

interface UseFiltersProps {
  filters: TransactionFilters
  onUpdateFilters: (filters: Partial<TransactionFilters>) => void
}

export function useFilters({ filters, onUpdateFilters }: UseFiltersProps) {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : null
    onUpdateFilters({
      dateRange: {
        ...filters.dateRange,
        [field]: date
      }
    })
  }

  const handleMultiSelectChange = (field: keyof TransactionFilters, value: string) => {
    if (field === 'dateRange') return
    
    const currentValues = filters[field] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    onUpdateFilters({ [field]: newValues })
  }

  const removeFilter = (field: keyof TransactionFilters, value: string) => {
    if (field === 'dateRange') return
    
    const currentValues = filters[field] as string[]
    const newValues = currentValues.filter(v => v !== value)
    onUpdateFilters({ [field]: newValues })
  }

  const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    return date.toISOString().split('T')[0]
  }

  const getTransactionTypeLabel = (type: string) => {
    return type === 'deposit' ? 'Receita' : 'Despesa'
  }

  return {
    bgColor,
    borderColor,
    handleDateChange,
    handleMultiSelectChange,
    removeFilter,
    formatDateForInput,
    getTransactionTypeLabel
  }
}