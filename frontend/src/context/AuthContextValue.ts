import { createContext } from 'react'
import type { AuthResponse, User } from '../types'

export type AuthContextValue = {
  user: User | null
  token: string | null
  loading: boolean
  signup: (email: string, password: string, fullName: string) => Promise<AuthResponse>
  signin: (email: string, password: string) => Promise<AuthResponse>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)