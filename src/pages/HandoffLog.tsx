import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Thermometer, Pill, FileText, ListChecks } from 'lucide-react'
import { fetchLog, LogEntry } from '../data/api'
import FlagBadge from '../components/FlagBadge'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'

const typeConfig: Record<string, { style: string; label: string; icon: typeof Activity }> = {
  VITALS: { style: 'bg-sky-50 text-sky-700', label: 'Vitals', icon: Activity },
  SYMPTOM: { style: 'bg-orange-50 text-orange-700', label: 'Symptom', icon: Thermometer },
  MEDICATION_GIVEN: { style: 'bg-emerald-50 text-emerald-700', label: 'Medication', icon: Pill },
  CLINICAL_NOTE: { style: 'bg-violet-50 text-violet-700', label: 'Clinical Note', icon: FileText },
  CHECKLIST: { style: 'bg-warm-100 text-warm-600', label: 'Checklist', icon: ListChecks },
}

const roleLabels: Record<string, string> = {
  PRIMARY_CAREGIVER: 'Primary Caregiver',
  PATIENT: 'Patient',
  CLINICIAN: 'Clinician',
  SECONDARY_CAREGIVER: 'Family',
}

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function HandoffLog() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('ALL')
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const isSecondary = user?.role === 'SECONDARY_CAREGIVER'

  useEffect(() => {
    setLoading(true)
    fetchLog(filter).then(setEntries).finally(() => setLoading(false))
  }, [filter])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-brand-800">Handoff Log</h2>
        <p className="text-sm text-warm-500 mt-1">Clinical-grade shift handoff &mdash; today's timeline</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['ALL', 'VITALS', 'SYMPTOM', 'MEDICATION_GIVEN', ...(!isSecondary ? ['CLINICAL_NOTE'] : [])] as string[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-brand-700 text-white shadow-sm'
                : 'bg-white text-warm-500 border border-warm-200 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            {f === 'ALL' ? 'All entries' : typeConfig[f]?.label || f}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        <div className="relative">
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-warm-200" />
          <div className="space-y-4">
            {entries.map((entry) => {
              const tc = typeConfig[entry.entry_type]
              const TypeIcon = tc?.icon
              return (
                <div key={entry.id} className="relative pl-10">
                  <div className="absolute left-2 top-5 w-3 h-3 rounded-full border-2 border-warm-50 bg-brand-500 ring-4 ring-warm-50" />
                  <Link to={`/log/${entry.id}`} className="block bg-white border border-warm-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${tc?.style}`}>
                          {TypeIcon && <TypeIcon className="w-3 h-3" strokeWidth={2.5} />}
                          {tc?.label}
                        </span>
                        {entry.is_flagged && entry.flag_severity && <FlagBadge severity={entry.flag_severity} />}
                      </div>
                      <span className="text-xs text-warm-400 whitespace-nowrap">{formatTime(entry.timestamp)}</span>
                    </div>
                    <h3 className="font-medium text-warm-900 text-sm mt-1">{entry.summary}</h3>

                    {entry.details && (
                      <div className="bg-warm-50 rounded-lg p-3 mt-3 space-y-1.5">
                        {Object.entries(entry.details).map(([key, value]) => (
                          <div key={key} className="flex gap-3 text-sm">
                            <span className="text-warm-400 font-medium min-w-[100px]">{key}</span>
                            <span className="text-warm-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-warm-100">
                      <div className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-[10px] font-bold">
                        {entry.author_avatar}
                      </div>
                      <span className="text-xs text-warm-400">
                        {entry.author_name} &middot; {roleLabels[entry.author_role] || entry.author_role}
                      </span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
