'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Box, Text } from '@chakra-ui/react'
import { ChartData } from '@/types/transaction'
import { useStackedBarChart } from './index.hook'
import { StyledChartContainer } from './styles'

interface StackedBarChartProps {
  data: ChartData[]
  title?: string
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    color: string
  }>
  label?: string
}

export function StackedBarChart({ data, title = 'Receitas vs Despesas por Mês' }: StackedBarChartProps) {
  const {
    bgColor,
    borderColor,
    textColor,
    formatCurrency,
    formatMonth,
    formatLegend
  } = useStackedBarChart({ data })

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg={bgColor}
          p={3}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="md"
          boxShadow="lg"
        >
          <Text fontWeight="bold" mb={2}>
            {label ? formatMonth(label) : 'N/A'}
          </Text>
          {payload.map((entry: { value: number; dataKey: string; color: string }, index: number) => (
            <Text key={index} color={entry.color}>
              {entry.dataKey === 'deposits' ? 'Receitas' : 'Despesas'}: {formatCurrency(entry.value)}
            </Text>
          ))}
        </Box>
      )
    }
    return null
  }

  return (
    <StyledChartContainer bg={bgColor} borderColor={borderColor}>
      <Text 
        fontSize={{ base: 'md', md: 'lg' }} 
        fontWeight="bold" 
        mb={{ base: 3, md: 4 }} 
        color={textColor}
      >
        {title}
      </Text>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 15,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            tickFormatter={formatMonth}
            stroke={textColor}
            fontSize={10}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            stroke={textColor}
            fontSize={10}
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            formatter={formatLegend}
          />
          <Bar 
            dataKey="deposits" 
            stackId="a" 
            fill="#38a169" 
            name="deposits"
            radius={[0, 0, 0, 0]}
          />
          <Bar 
            dataKey="withdraws" 
            stackId="a" 
            fill="#e53e3e" 
            name="withdraws"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  )
}