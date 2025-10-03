import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should initialize with no authenticated user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.isLoading).toBe(false)
  })

  it('should login with correct credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      const success = await result.current.login({
        email: 'admin@dashboard.com',
        password: 'admin123'
      })
      expect(success).toBe(true)
    })

    expect(result.current.user).toEqual({
      id: '1',
      name: 'Administrador',
      email: 'admin@dashboard.com',
      avatar: 'https://via.placeholder.com/40'
    })
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('should fail login with incorrect credentials', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      const success = await result.current.login({
        email: 'wrong@email.com',
        password: 'wrongpassword'
      })
      expect(success).toBe(false)
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should logout correctly', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({
        email: 'admin@dashboard.com',
        password: 'admin123'
      })
    })

    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('should persist user session in localStorage', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(async () => {
      await result.current.login({
        email: 'admin@dashboard.com',
        password: 'admin123'
      })
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'dashboard_user',
      expect.stringContaining('"id":"1"')
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'dashboard_user',
      expect.stringContaining('"email":"admin@dashboard.com"')
    )
    expect(localStorage.setItem).toHaveBeenCalledWith('dashboard_auth', 'true')
  })

  it('should clear localStorage on logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper })

    await act(async () => {
      await result.current.login({
        email: 'admin@dashboard.com',
        password: 'admin123'
      })
    })

    act(() => {
      result.current.logout()
    })

    expect(localStorage.removeItem).toHaveBeenCalledWith('dashboard_user')
    expect(localStorage.removeItem).toHaveBeenCalledWith('dashboard_auth')
    expect(localStorage.removeItem).toHaveBeenCalledWith('dashboard_filters')
  })
})