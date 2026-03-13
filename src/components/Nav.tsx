import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  ListChecks,
  HeartPulse,
  Users,
  HeartHandshake,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/log', label: 'Handoff Log', icon: ClipboardList },
  { to: '/checklist', label: 'Checklist', icon: ListChecks },
  { to: '/symptoms', label: 'Symptoms', icon: HeartPulse },
  { to: '/team', label: 'Care Team', icon: Users },
]

export default function Nav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-warm-200 z-50 md:relative md:border-t-0 md:border-r md:border-warm-200 md:w-60 md:min-h-screen md:flex md:flex-col md:bg-white">
      {/* Desktop logo */}
      <div className="hidden md:flex items-center gap-3 px-6 py-6">
        <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div>
          <span className="text-lg text-brand-800" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
        </div>
      </div>

      {/* Desktop nav section label */}
      <div className="hidden md:block px-6 pt-2 pb-3">
        <p className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold">Navigation</p>
      </div>

      {/* Links */}
      <ul className="flex justify-around md:flex-col md:justify-start md:gap-0.5 md:px-3 md:pb-4">
        {links.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `flex flex-col md:flex-row items-center md:gap-3 px-2 py-2 md:px-3 md:py-2.5 rounded-lg text-xs md:text-[13px] transition-all duration-150 ${
                  isActive
                    ? 'text-brand-700 bg-brand-50 font-semibold md:border-l-[3px] md:border-brand-600 md:pl-2.5'
                    : 'text-warm-500 hover:text-brand-600 hover:bg-warm-50 font-medium'
                }`
              }
            >
              <l.icon className="w-5 h-5 md:w-[18px] md:h-[18px] mb-0.5 md:mb-0" strokeWidth={1.75} />
              <span>{l.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop bottom section */}
      <div className="hidden md:flex md:flex-col md:mt-auto md:border-t md:border-warm-100 md:px-6 md:py-5">
        <div className="flex items-center gap-2 text-warm-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium">All systems normal</span>
        </div>
      </div>
    </nav>
  )
}
