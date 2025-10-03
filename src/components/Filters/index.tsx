'use client'

import React from 'react'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  Text,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react'
import { TransactionFilters, FilterOptions } from '@/types/transaction'
import { useFilters } from './index.hook'
import { StyledFilterContainer, StyledFilterSection } from './styles'

interface FiltersProps {
  filters: TransactionFilters
  filterOptions: FilterOptions
  onUpdateFilters: (filters: Partial<TransactionFilters>) => void
  onClearFilters: () => void
}

export function Filters({ filters, filterOptions, onUpdateFilters, onClearFilters }: FiltersProps) {
  const {
    bgColor,
    borderColor,
    handleDateChange,
    handleMultiSelectChange,
    removeFilter,
    formatDateForInput,
    getTransactionTypeLabel
  } = useFilters({ filters, onUpdateFilters })

  return (
    <StyledFilterContainer bg={bgColor} borderColor={borderColor}>
      <StyledFilterSection>
        <HStack 
          justify="space-between" 
          w="100%" 
          spacing={{ base: 2, md: 4 }}
          direction={{ base: 'column', sm: 'row' }}
          align={{ base: 'stretch', sm: 'center' }}
        >
          <Text 
            fontSize={{ base: 'md', md: 'lg' }} 
            fontWeight="bold"
            textAlign={{ base: 'center', sm: 'left' }}
          >
            Filtros
          </Text>
          <Button 
            size={{ base: 'sm', md: 'sm' }} 
            variant="outline" 
            onClick={onClearFilters}
            w={{ base: 'full', sm: 'auto' }}
          >
            Limpar Filtros
          </Button>
        </HStack>

        <FormControl>
          <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Período</FormLabel>
          <HStack 
            spacing={{ base: 2, md: 4 }}
            direction={{ base: 'column', sm: 'row' }}
            align={{ base: 'stretch', sm: 'center' }}
          >
            <Input
              type="date"
              value={formatDateForInput(filters.dateRange.start)}
              onChange={(e) => handleDateChange('start', e.target.value)}
              placeholder="Data inicial"
              size={{ base: 'sm', md: 'md' }}
            />
            <Text 
              fontSize={{ base: 'sm', md: 'md' }}
              display={{ base: 'none', sm: 'block' }}
              minW="auto"
            >
              até
            </Text>
            <Input
              type="date"
              value={formatDateForInput(filters.dateRange.end)}
              onChange={(e) => handleDateChange('end', e.target.value)}
              placeholder="Data final"
              size={{ base: 'sm', md: 'md' }}
            />
          </HStack>
        </FormControl>

        <FormControl>
          <FormLabel>Contas</FormLabel>
          <Select
            placeholder="Selecione uma conta"
            onChange={(e) => e.target.value && handleMultiSelectChange('accounts', e.target.value)}
            value=""
          >
            {filterOptions.accounts.map(account => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </Select>
          {filters.accounts.length > 0 && (
            <Wrap mt={2}>
              {filters.accounts.map(account => (
                <WrapItem key={account}>
                  <Tag size="md" colorScheme="blue" variant="solid">
                    <TagLabel>{account}</TagLabel>
                    <TagCloseButton onClick={() => removeFilter('accounts', account)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Indústrias</FormLabel>
          <Select
            placeholder="Selecione uma indústria"
            onChange={(e) => e.target.value && handleMultiSelectChange('industries', e.target.value)}
            value=""
          >
            {filterOptions.industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </Select>
          {filters.industries.length > 0 && (
            <Wrap mt={2}>
              {filters.industries.map(industry => (
                <WrapItem key={industry}>
                  <Tag size="md" colorScheme="green" variant="solid">
                    <TagLabel>{industry}</TagLabel>
                    <TagCloseButton onClick={() => removeFilter('industries', industry)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Estados</FormLabel>
          <Select
            placeholder="Selecione um estado"
            onChange={(e) => e.target.value && handleMultiSelectChange('states', e.target.value)}
            value=""
          >
            {filterOptions.states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
          {filters.states.length > 0 && (
            <Wrap mt={2}>
              {filters.states.map(state => (
                <WrapItem key={state}>
                  <Tag size="md" colorScheme="purple" variant="solid">
                    <TagLabel>{state}</TagLabel>
                    <TagCloseButton onClick={() => removeFilter('states', state)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Tipos de Transação</FormLabel>
          <Select
            placeholder="Selecione um tipo"
            onChange={(e) => e.target.value && handleMultiSelectChange('transactionTypes', e.target.value)}
            value=""
          >
            <option value="deposit">Receita (Deposit)</option>
            <option value="withdraw">Despesa (Withdraw)</option>
          </Select>
          {filters.transactionTypes.length > 0 && (
            <Wrap mt={2}>
              {filters.transactionTypes.map(type => (
                <WrapItem key={type}>
                  <Tag size="md" colorScheme="orange" variant="solid">
                    <TagLabel>{getTransactionTypeLabel(type)}</TagLabel>
                    <TagCloseButton onClick={() => removeFilter('transactionTypes', type)} />
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          )}
        </FormControl>
      </StyledFilterSection>
    </StyledFilterContainer>
  )
}