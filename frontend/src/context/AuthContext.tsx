import { useState, type ReactNode } from 'react'
import { authAPI } from '../services/api'
import type { AuthResponse, User } from '../types'
import { AuthContext } from './AuthContextValue'

type Props = {
  children: ReactNode
}

type ApiError = {
  response?: {
    data?: {
      error?: string
    }
  }
  message?: string
}

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser) as User
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })

  const loading = false

  const signup = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
      const response = await authAPI.signup(email, password, fullName)
      const { token: newToken, user: userData } = response.data
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(newToken)
      setUser(userData)
      return response.data
    } catch (error) {
      const parsedError = error as ApiError
      throw parsedError.response?.data || parsedError.message || 'Signup failed'
    }
  }

  const signin = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await authAPI.signin(email, password)
      const { token: newToken, user: userData } = response.data
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(newToken)
      setUser(userData)
      return response.data
    } catch (error) {
      const parsedError = error as ApiError
      throw parsedError.response?.data || parsedError.message || 'Signin failed'
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, signin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
