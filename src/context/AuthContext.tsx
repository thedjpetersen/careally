import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface AuthUser {
  id: string
  role: 'PATIENT' | 'PRIMARY_CAREGIVER' | 'SECONDARY_CAREGIVER' | 'CLINICIAN'
  name: string
  avatar: string
  care_team_id: string
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  login: (userId: string, pin: string) => Promise<{ error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>(null!)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (userId: string, pin: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, pin }),
    })
    if (!res.ok) {
      const data = await res.json()
      return { error: data.error || 'Login failed' }
    }
    const userData = await res.json()
    setUser(userData)
    return {}
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
