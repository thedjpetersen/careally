import { useAuth } from '../context/AuthContext'
import { HeartHandshake, LogOut, ChevronDown } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-warm-200 px-5 py-3.5 md:px-8 flex items-center justify-between">
      {/* Mobile logo */}
      <div className="flex items-center gap-2.5 md:hidden">
        <div className="w-8 h-8 rounded-lg bg-brand-700 flex items-center justify-center text-white">
          <HeartHandshake className="w-4 h-4" />
        </div>
        <span className="text-lg text-brand-800" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
      </div>

      {/* Desktop patient context */}
      <div className="hidden md:flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 text-sm font-bold">
          MC
        </div>
        <div>
          <p className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold">Caring for</p>
          <p className="text-sm text-warm-900 font-medium mt-0.5">Margaret Chin</p>
        </div>
      </div>

      {/* User section */}
      <div className="flex items-center gap-2">
        {user && (
          <>
            <div className="flex items-center gap-2 bg-warm-50 rounded-full pl-1 pr-3 py-1">
              <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                {user.avatar}
              </div>
              <span className="text-sm text-warm-700 font-medium hidden sm:block">{user.name.split(' ')[0]}</span>
              <ChevronDown className="w-3.5 h-3.5 text-warm-400 hidden sm:block" />
            </div>
            <button
              onClick={logout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-warm-400 hover:text-warm-600 hover:bg-warm-100 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </header>
  )
}
