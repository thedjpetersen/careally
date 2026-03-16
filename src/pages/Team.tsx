import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, User, Heart, Users as UsersIcon, Stethoscope } from 'lucide-react'
import { fetchUsers, User as UserType } from '../data/api'
import Spinner from '../components/Spinner'
import { useHasRole } from '../components/RequireRole'

const roleBadges: Record<string, { label: string; style: string; icon: typeof User }> = {
  PATIENT: { label: 'Patient', style: 'bg-sky-50 text-sky-700', icon: Heart },
  PRIMARY_CAREGIVER: { label: 'Primary Caregiver', style: 'bg-brand-50 text-brand-700', icon: User },
  SECONDARY_CAREGIVER: { label: 'Family', style: 'bg-warm-100 text-warm-600', icon: UsersIcon },
  CLINICIAN: { label: 'Clinician', style: 'bg-violet-50 text-violet-700', icon: Stethoscope },
}

const roleDescriptions: Record<string, string> = {
  PATIENT: 'Can view and complete checklists, log symptoms, and see their own care timeline.',
  PRIMARY_CAREGIVER: 'Full access to all logs, schedules, and team management. Main coordinator.',
  SECONDARY_CAREGIVER: 'Can view schedules and basic status updates. Medical notes are restricted.',
  CLINICIAN: 'Full clinical access including notes, vitals trends, and alert management.',
}

export default function Team() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const canInvite = useHasRole('PRIMARY_CAREGIVER')

  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-brand-800">Care Team</h2>
        <p className="text-sm text-warm-500 mt-1">Everyone involved in Margaret's care</p>
      </div>

      <div className="space-y-2.5">
        {users.map((member) => {
          const badge = roleBadges[member.role]
          const RoleIcon = badge?.icon
          return (
            <Link key={member.id} to={`/team/${member.id}`} className="block bg-white border border-warm-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm text-warm-900">{member.name}</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${badge.style}`}>
                      {RoleIcon && <RoleIcon className="w-3 h-3" />}
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-warm-400 mt-1.5 leading-relaxed">{roleDescriptions[member.role]}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {canInvite && (
        <button className="w-full border-2 border-dashed border-warm-300 rounded-xl p-4 text-sm text-warm-400 font-medium hover:border-brand-300 hover:text-brand-600 transition-colors flex items-center justify-center gap-2">
          <UserPlus className="w-4 h-4" />
          <span>Invite a team member</span>
        </button>
      )}
    </div>
  )
}
