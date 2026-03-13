import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth, AuthUser } from '../context/AuthContext'
import { HeartHandshake, Check, Shield, ArrowLeft, Lock } from 'lucide-react'

const LOGIN_IMG = '/images/caregiver-walking.jpg'

const roleBadges: Record<string, { label: string; style: string }> = {
  PATIENT: { label: 'Patient', style: 'bg-sky-50 text-sky-700' },
  PRIMARY_CAREGIVER: { label: 'Primary Caregiver', style: 'bg-brand-50 text-brand-700' },
  SECONDARY_CAREGIVER: { label: 'Family', style: 'bg-warm-100 text-warm-600' },
  CLINICIAN: { label: 'Clinician', style: 'bg-violet-50 text-violet-700' },
}

export default function Login() {
  const { login } = useAuth()
  const [users, setUsers] = useState<AuthUser[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/auth/users')
      .then((r) => r.json())
      .then(setUsers)
  }, [])

  const handleLogin = async () => {
    if (!selected || !pin) return
    setError('')
    setSubmitting(true)
    const result = await login(selected, pin)
    if (result.error) {
      setError(result.error)
      setSubmitting(false)
    }
  }

  const selectedUser = users.find((u) => u.id === selected)

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col md:flex-row">
      {/* Left side — image panel (desktop only) */}
      <div className="hidden md:block md:w-1/2 lg:w-[55%] relative">
        <img
          src={LOGIN_IMG}
          alt="Caregiver and patient sharing a warm moment"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/60 to-brand-800/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-xl text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
          </div>
          <h2 className="text-3xl text-white leading-snug max-w-md" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Coordinating care, together.
          </h2>
          <p className="text-white/70 mt-3 max-w-sm text-sm leading-relaxed">
            Keep your entire care team on the same page with shared logs, checklists, and real-time alerts.
          </p>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex flex-col min-h-screen md:min-h-0">
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-warm-500 hover:text-brand-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          {/* Mobile logo */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center text-white">
              <HeartHandshake className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium text-brand-800" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl text-brand-800">
                {!selected ? 'Sign in' : 'Enter your PIN'}
              </h1>
              <p className="text-sm text-warm-500 mt-1.5">
                {!selected ? 'Choose your profile to continue' : `Signing in as ${selectedUser?.name}`}
              </p>
            </div>

            {/* User selection */}
            {!selected && (
              <div className="space-y-2">
                {users.map((u) => {
                  const badge = roleBadges[u.role]
                  return (
                    <button
                      key={u.id}
                      onClick={() => { setSelected(u.id); setError('') }}
                      className="w-full text-left bg-white border border-warm-200 rounded-xl p-3.5 flex items-center gap-3 transition-all hover:border-brand-300 hover:shadow-sm group"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:bg-brand-100 transition-colors">
                        {u.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm text-warm-900 block">{u.name}</span>
                        {badge && (
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mt-0.5 ${badge.style}`}>
                            {badge.label}
                          </span>
                        )}
                      </div>
                      <ArrowLeft className="w-4 h-4 text-warm-300 rotate-180 group-hover:text-brand-400 transition-colors flex-shrink-0" />
                    </button>
                  )
                })}
              </div>
            )}

            {/* PIN entry */}
            {selected && selectedUser && (
              <div className="space-y-5">
                {/* Selected user */}
                <div className="bg-white border border-brand-200 rounded-xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {selectedUser.avatar}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm text-warm-900 block">{selectedUser.name}</span>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium mt-0.5 ${roleBadges[selectedUser.role]?.style}`}>
                      {roleBadges[selectedUser.role]?.label}
                    </span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                </div>

                {/* PIN input */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-3.5 h-3.5 text-warm-400" />
                    <label className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold">PIN Code</label>
                  </div>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="****"
                    maxLength={4}
                    autoFocus
                    className="w-full border border-warm-200 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-center tracking-[0.75em] font-mono bg-white"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 text-center bg-red-50 rounded-lg py-2">{error}</p>
                )}

                <button
                  onClick={handleLogin}
                  disabled={submitting || !pin}
                  className="w-full bg-brand-700 text-white py-3.5 rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  {submitting ? 'Signing in...' : 'Sign In'}
                </button>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => { setSelected(null); setPin(''); setError('') }}
                    className="text-sm text-warm-400 hover:text-brand-600 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Different profile
                  </button>
                  <span className="text-xs text-warm-400">
                    PIN: <span className="font-mono font-semibold text-warm-500">1234</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
