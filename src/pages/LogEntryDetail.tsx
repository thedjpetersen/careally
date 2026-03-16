import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Activity, Thermometer, Pill, FileText, ListChecks } from 'lucide-react'
import { fetchLogEntry, fetchAlerts, LogEntry, Alert, updateAlertStatus } from '../data/api'
import FlagBadge from '../components/FlagBadge'
import Spinner from '../components/Spinner'
import { useHasRole } from '../components/RequireRole'

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

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

export default function LogEntryDetail() {
  const { id } = useParams<{ id: string }>()
  const [entry, setEntry] = useState<LogEntry | null>(null)
  const [linkedAlert, setLinkedAlert] = useState<Alert | null>(null)
  const [loading, setLoading] = useState(true)
  const canSeeAlerts = useHasRole('CLINICIAN', 'PRIMARY_CAREGIVER')
  const isClinician = useHasRole('CLINICIAN')

  useEffect(() => {
    if (!id) return
    const load = async () => {
      const e = await fetchLogEntry(id)
      setEntry(e)
      if (e.is_flagged && canSeeAlerts) {
        const alerts = await fetchAlerts()
        const match = alerts.find((a) => a.log_entry_id === id)
        if (match) setLinkedAlert(match)
      }
      setLoading(false)
    }
    load()
  }, [id, canSeeAlerts])

  if (loading) return <Spinner />
  if (!entry) return <p className="text-warm-500">Entry not found.</p>

  const tc = typeConfig[entry.entry_type]
  const TypeIcon = tc?.icon

  const handleAlertAction = async (status: string) => {
    if (!linkedAlert) return
    await updateAlertStatus(linkedAlert.id, status)
    setLinkedAlert({ ...linkedAlert, status: status as Alert['status'] })
  }

  return (
    <div className="space-y-6">
      <Link to="/log" className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to log
      </Link>

      <div className="bg-white border border-warm-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${tc?.style}`}>
            {TypeIcon && <TypeIcon className="w-3 h-3" strokeWidth={2.5} />}
            {tc?.label}
          </span>
          {entry.is_flagged && entry.flag_severity && <FlagBadge severity={entry.flag_severity} />}
        </div>

        <h2 className="text-lg font-medium text-warm-900">{entry.summary}</h2>
        <p className="text-sm text-warm-400">{formatDateTime(entry.timestamp)}</p>

        {entry.details && (
          <div className="bg-warm-50 rounded-lg p-4 space-y-2">
            {Object.entries(entry.details).map(([key, value]) => (
              <div key={key} className="flex gap-3 text-sm">
                <span className="text-warm-400 font-medium min-w-[120px]">{key}</span>
                <span className="text-warm-700">{value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 border-t border-warm-100">
          <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold">
            {entry.author_avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-warm-900">{entry.author_name}</p>
            <p className="text-xs text-warm-400">{roleLabels[entry.author_role] || entry.author_role}</p>
          </div>
        </div>
      </div>

      {linkedAlert && (
        <div className="bg-white border border-warm-200 rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-warm-900">Linked Alert</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <FlagBadge severity={linkedAlert.severity} />
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              linkedAlert.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700' :
              linkedAlert.status === 'ACKNOWLEDGED' ? 'bg-sky-50 text-sky-700' :
              'bg-warm-100 text-warm-600'
            }`}>
              {linkedAlert.status}
            </span>
          </div>
          <p className="text-sm text-warm-700">{linkedAlert.message}</p>

          {isClinician && linkedAlert.status !== 'RESOLVED' && (
            <div className="flex gap-2 pt-2">
              {linkedAlert.status === 'UNREAD' && (
                <button
                  onClick={() => handleAlertAction('ACKNOWLEDGED')}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                >
                  Acknowledge
                </button>
              )}
              <button
                onClick={() => handleAlertAction('RESOLVED')}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                Resolve
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
