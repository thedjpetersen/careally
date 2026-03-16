import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, Heart, Users as UsersIcon, Stethoscope } from 'lucide-react'
import { fetchUser, UserWithEntries } from '../data/api'
import FlagBadge from '../components/FlagBadge'
import Spinner from '../components/Spinner'

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

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

export default function TeamMemberDetail() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<UserWithEntries | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetchUser(id).then(setMember).finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner />
  if (!member) return <p className="text-warm-500">Member not found.</p>

  const badge = roleBadges[member.role]
  const RoleIcon = badge?.icon

  return (
    <div className="space-y-6">
      <Link to="/team" className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to team
      </Link>

      <div className="bg-white border border-warm-200 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-lg font-bold">
            {member.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-medium text-warm-900">{member.name}</h2>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${badge?.style}`}>
                {RoleIcon && <RoleIcon className="w-3 h-3" />}
                {badge?.label}
              </span>
            </div>
            <p className="text-sm text-warm-400 mt-1">{roleDescriptions[member.role]}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold mb-3">Recent Activity</h3>
        {member.recent_entries.length === 0 ? (
          <p className="text-sm text-warm-400">No recent activity.</p>
        ) : (
          <div className="space-y-2.5">
            {member.recent_entries.map((entry) => (
              <Link
                key={entry.id}
                to={`/log/${entry.id}`}
                className="block bg-white border border-warm-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-warm-900">{entry.summary}</span>
                      {entry.is_flagged && entry.flag_severity && <FlagBadge severity={entry.flag_severity} />}
                    </div>
                    <p className="text-xs text-warm-400 mt-1">{formatDateTime(entry.timestamp)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
