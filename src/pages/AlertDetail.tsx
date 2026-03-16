import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchAlert, updateAlertStatus, AlertWithEntry } from '../data/api'
import FlagBadge from '../components/FlagBadge'
import Spinner from '../components/Spinner'
import { useHasRole } from '../components/RequireRole'

function formatDateTime(ts: string) {
  return new Date(ts).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  })
}

export default function AlertDetail() {
  const { id } = useParams<{ id: string }>()
  const [alert, setAlert] = useState<AlertWithEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const isClinician = useHasRole('CLINICIAN')

  useEffect(() => {
    if (!id) return
    fetchAlert(id).then(setAlert).finally(() => setLoading(false))
  }, [id])

  if (loading) return <Spinner />
  if (!alert) return <p className="text-warm-500">Alert not found.</p>

  const handleAction = async (status: string) => {
    await updateAlertStatus(alert.id, status)
    setAlert({ ...alert, status: status as AlertWithEntry['status'] })
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to dashboard
      </Link>

      <div className="bg-white border border-warm-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <FlagBadge severity={alert.severity} />
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            alert.status === 'RESOLVED' ? 'bg-emerald-50 text-emerald-700' :
            alert.status === 'ACKNOWLEDGED' ? 'bg-sky-50 text-sky-700' :
            'bg-warm-100 text-warm-600'
          }`}>
            {alert.status}
          </span>
        </div>

        <h2 className="text-lg font-medium text-warm-900">{alert.message}</h2>
        <p className="text-sm text-warm-400">{formatDateTime(alert.created_at)}</p>

        {isClinician && alert.status !== 'RESOLVED' && (
          <div className="flex gap-2 pt-2">
            {alert.status === 'UNREAD' && (
              <button
                onClick={() => handleAction('ACKNOWLEDGED')}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
              >
                Acknowledge
              </button>
            )}
            <button
              onClick={() => handleAction('RESOLVED')}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
            >
              Resolve
            </button>
          </div>
        )}
      </div>

      {alert.log_entry && (
        <div>
          <h3 className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold mb-3">Linked Log Entry</h3>
          <Link to={`/log/${alert.log_entry.id}`} className="block bg-white border border-warm-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-3 mb-1">
              <span className="text-sm font-medium text-warm-900">{alert.log_entry.summary}</span>
              {alert.log_entry.is_flagged && alert.log_entry.flag_severity && (
                <FlagBadge severity={alert.log_entry.flag_severity} />
              )}
            </div>
            <p className="text-xs text-warm-400 mt-1">
              {alert.log_entry.author_name} &middot; {formatDateTime(alert.log_entry.timestamp)}
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}
