'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  username: string
  email: string
  wallet_balance: number
  dosha: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  login: (emailOrUsername: string, password: string) => Promise<boolean>
  signup: (username: string, email: string, password: string, dosha: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      // Set loading to false immediately and fetch user data in background
      setLoading(false)
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const token = Cookies.get('token')
      if (!token) {
        return
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user:', error)
      Cookies.remove('token')
      setUser(null)
    }
  }

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: emailOrUsername, // Backend expects 'username' field but accepts email or username
        password
      })
      
      const { access_token } = response.data
      Cookies.set('token', access_token, { expires: 1 })
      
      await fetchUser()
      return true
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Invalid email or password')
    }
  }

  const signup = async (username: string, email: string, password: string, dosha: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
        dosha
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Signup successful:', response.data)
      
      // Auto-login after signup
      return await login(username, password)
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message)
      return false
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    // Force immediate redirect to landing page
    router.push('/')
    router.refresh()
  }

  const refreshUser = async () => {
    await fetchUser()
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
