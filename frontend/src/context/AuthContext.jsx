import React, { useState } from 'react'
import { authAPI } from '../services/api'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) return null
    try {
      return JSON.parse(storedUser)
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })
  const loading = false

  const signup = async (email, password, fullName) => {
    try {
      const response = await authAPI.signup(email, password, fullName)
      const { token: newToken, user: userData } = response.data
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(newToken)
      setUser(userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }

  const signin = async (email, password) => {
    try {
      const response = await authAPI.signin(email, password)
      const { token: newToken, user: userData } = response.data
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(userData))
      setToken(newToken)
      setUser(userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
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
