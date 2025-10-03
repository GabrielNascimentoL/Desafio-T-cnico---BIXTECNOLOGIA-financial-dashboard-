'use client'

import {
  Container,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Box,
  Spinner
} from '@chakra-ui/react'
import { useLogin } from './index.hook'
import { LoginContainer, LoginCard, StyledInput, GradientButton } from './styles'

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const {
    email,
    password,
    error,
    isLoading,
    isAuthenticated,
    handleSubmit,
    handleEmailChange,
    handlePasswordChange
  } = useLogin()

  if (isAuthenticated) {
    return (
      <LoginContainer>
        <Spinner size="xl" color="white" />
      </LoginContainer>
    )
  }

  return (
    <LoginContainer>
      <Container maxW="md">
        <LoginCard>
          <VStack spacing={6}>
            <Box textAlign="center">
              <Heading
                as="h1"
                size="xl"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Financial Dashboard
              </Heading>
              <Text color="gray.600" mt={2}>
                Faça login para acessar o dashboard
              </Text>
            </Box>

            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Box
              as="form"
              onSubmit={handleSubmit}
              width="100%"
            >
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <StyledInput
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="admin@dashboard.com"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Senha</FormLabel>
                  <StyledInput
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="admin123"
                    size="lg"
                  />
                </FormControl>

                <GradientButton
                  type="submit"
                  size="lg"
                  width="100%"
                  isLoading={isLoading}
                  loadingText="Entrando..."
                >
                  Entrar
                </GradientButton>
              </VStack>
            </Box>

            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">
                Credenciais de demonstração:
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Email:</strong> admin@dashboard.com
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Senha:</strong> admin123
              </Text>
            </Box>
          </VStack>
        </LoginCard>
      </Container>
    </LoginContainer>
  )
}