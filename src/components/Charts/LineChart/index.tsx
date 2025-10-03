'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Box, Text } from '@chakra-ui/react'
import { ChartData } from '@/types/transaction'
import { useLineChart } from './index.hook'
import { StyledChartContainer } from './styles'

interface LineChartProps {
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

export function CustomLineChart({ data, title = 'Evolução do Saldo Acumulado' }: LineChartProps) {
  const {
    bgColor,
    borderColor,
    textColor,
    formatCurrency,
    sampledData,
    getLineColor
  } = useLineChart({ data })

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
            {label}
          </Text>
          <Text color={payload[0].color}>
            Saldo: {formatCurrency(payload[0].value)}
          </Text>
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
        <LineChart
          data={sampledData}
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
            stroke={textColor}
            fontSize={10}
            tick={{ fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickFormatter={formatCurrency}
            stroke={textColor}
            fontSize={10}
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={getLineColor()}
            strokeWidth={3}
            dot={{ fill: getLineColor(), strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: getLineColor(), strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledChartContainer>
  )
}