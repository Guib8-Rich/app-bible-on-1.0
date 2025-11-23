"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  trialEndsAt: Date
  isPremium: boolean
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  checkPremiumAccess: () => boolean
  isTrialActive: () => boolean
  daysLeftInTrial: () => number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    // Carregar usuário do localStorage
    const savedUser = localStorage.getItem("bibliaon_user")
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      parsed.trialEndsAt = new Date(parsed.trialEndsAt)
      setUser(parsed)
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulação de login
    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
      isPremium: false
    }
    setUser(mockUser)
    localStorage.setItem("bibliaon_user", JSON.stringify(mockUser))
    setShowAuthModal(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    // Simulação de cadastro com 3 dias grátis
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
      isPremium: false
    }
    setUser(mockUser)
    localStorage.setItem("bibliaon_user", JSON.stringify(mockUser))
    setShowAuthModal(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("bibliaon_user")
  }

  const isTrialActive = () => {
    if (!user) return false
    return new Date() < user.trialEndsAt
  }

  const daysLeftInTrial = () => {
    if (!user) return 0
    const diff = user.trialEndsAt.getTime() - Date.now()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const checkPremiumAccess = () => {
    if (!user) return false
    return user.isPremium || isTrialActive()
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        showAuthModal,
        setShowAuthModal,
        login,
        signup,
        logout,
        checkPremiumAccess,
        isTrialActive,
        daysLeftInTrial
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
