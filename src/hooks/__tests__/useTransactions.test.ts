import { renderHook, act, waitFor } from '@testing-library/react'
import { useTransactions } from '../useTransactions'

const mockTransactions = [
  {
    id: '1',
    date: '2024-01-15',
    amount: '10000',
    account: 'Conta Corrente',
    industry: 'Tecnologia',
    state: 'SP',
    transaction_type: 'deposit'
  },
  {
    id: '2',
    date: '2024-01-20',
    amount: '5000',
    account: 'Conta Poupança',
    industry: 'Saúde',
    state: 'RJ',
    transaction_type: 'withdraw'
  }
]

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockTransactions),
  })
) as jest.Mock

describe('useTransactions', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should initialize with default filters', () => {
    const { result } = renderHook(() => useTransactions())

    expect(result.current.filters).toEqual({
      dateRange: { start: null, end: null },
      accounts: [],
      industries: [],
      states: [],
      transactionTypes: []
    })
  })

  it('should process transactions correctly', async () => {
    const { result } = renderHook(() => useTransactions())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.transactions).toHaveLength(2)
    expect(result.current.transactions[0].amount).toBe(100)
    expect(result.current.transactions[1].amount).toBe(50)
  })

  it('should calculate summary correctly', async () => {
    const { result } = renderHook(() => useTransactions())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.summary.totalRevenue).toBe(100)
    expect(result.current.summary.totalExpenses).toBe(50)
    expect(result.current.summary.balance).toBe(50)
  })

  it('should update filters correctly', async () => {
    const { result } = renderHook(() => useTransactions())

    await act(async () => {
      result.current.updateFilters({
        accounts: ['Conta Corrente']
      })
    })

    expect(result.current.filters.accounts).toEqual(['Conta Corrente'])
  })

  it('should filter transactions by account', async () => {
    const { result } = renderHook(() => useTransactions())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      result.current.updateFilters({
        accounts: ['Conta Corrente']
      })
    })

    expect(result.current.transactions).toHaveLength(1)
    expect(result.current.transactions[0].account).toBe('Conta Corrente')
  })

  it('should clear filters correctly', async () => {
    const { result } = renderHook(() => useTransactions())

    await act(async () => {
      result.current.updateFilters({
        accounts: ['Conta Corrente']
      })
    })

    await act(async () => {
      result.current.clearFilters()
    })

    expect(result.current.filters).toEqual({
      dateRange: { start: null, end: null },
      accounts: [],
      industries: [],
      states: [],
      transactionTypes: []
    })
  })
})