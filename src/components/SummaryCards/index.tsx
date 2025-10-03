'use client'

import React from 'react'
import {
  SimpleGrid,
  Stat,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react'
import { DashboardSummary } from '@/types/transaction'
import { useSummaryCards } from './index.hook'
import { StyledCard, StyledStatNumber, StyledStatLabel } from './styles'

interface SummaryCardsProps {
  summary: DashboardSummary
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const { cardBg, borderColor, cards } = useSummaryCards({ summary })

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
      {cards.map((card, index) => (
        <StyledCard
          key={index}
          bg={cardBg}
          borderColor={borderColor}
          color={card.color}
        >
          <Stat>
            <StyledStatLabel>{card.label}</StyledStatLabel>
            <StyledStatNumber color={card.color}>
              {card.value}
            </StyledStatNumber>
            <StatHelpText>
              {(card.trend === 'increase' || card.trend === 'decrease') && (
                <StatArrow type={card.trend as 'increase' | 'decrease'} />
              )}
              {card.helpText}
            </StatHelpText>
          </Stat>
        </StyledCard>
      ))}
    </SimpleGrid>
  )
}