export interface Transaction {
  date: number
  amount: string
  transaction_type: 'deposit' | 'withdraw'
  currency: string
  account: string
  industry: string
  state: string
}

export interface ProcessedTransaction extends Omit<Transaction, 'amount'> {
  amount: number
  formattedAmount: string
  formattedDate: string
  id: string
}

export interface TransactionFilters {
  dateRange: {
    start: Date | null
    end: Date | null
  }
  accounts: string[]
  industries: string[]
  states: string[]
  transactionTypes: ('deposit' | 'withdraw')[]
}

export interface DashboardSummary {
  totalRevenue: number
  totalExpenses: number
  balance: number
  pendingTransactions: number
  transactionCount: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
  deposits?: number
  withdraws?: number
}

export interface FilterOptions {
  accounts: string[]
  industries: string[]
  states: string[]
}