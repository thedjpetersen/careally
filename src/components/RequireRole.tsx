import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

type Role = 'PATIENT' | 'PRIMARY_CAREGIVER' | 'SECONDARY_CAREGIVER' | 'CLINICIAN'

export function useHasRole(...roles: Role[]): boolean {
  const { user } = useAuth()
  if (!user) return false
  return roles.includes(user.role)
}

export default function RequireRole({ roles, children, fallback = null }: {
  roles: Role[]
  children: ReactNode
  fallback?: ReactNode
}) {
  const hasRole = useHasRole(...roles)
  return hasRole ? <>{children}</> : <>{fallback}</>
}
