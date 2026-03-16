import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, ClipboardList, ArrowRight, Bell, Clock } from 'lucide-react'
import { fetchLog, fetchChecklist, fetchAlerts, LogEntry, ChecklistItem, Alert } from '../data/api'
import FlagBadge from '../components/FlagBadge'
import Spinner from '../components/Spinner'
import { useHasRole } from '../components/RequireRole'

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function Dashboard() {
  const [log, setLog] = useState<LogEntry[]>([])
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const canSeeAlerts = useHasRole('CLINICIAN', 'PRIMARY_CAREGIVER')

  useEffect(() => {
    const promises: Promise<any>[] = [fetchLog(), fetchChecklist('2026-03-11')]
    if (canSeeAlerts) promises.push(fetchAlerts())
    Promise.all(promises)
      .then(([l, c, a]) => { setLog(l); setChecklist(c); if (a) setAlerts(a) })
      .finally(() => setLoading(false))
  }, [canSeeAlerts])

  if (loading) return <Spinner />

  const completedCount = checklist.filter((c) => c.completed).length
  const progress = checklist.length ? Math.round((completedCount / checklist.length) * 100) : 0
  const recentLogs = log.slice(-3).reverse()
  const activeAlerts = alerts.filter((a) => a.status !== 'RESOLVED')

  return (
    <div className="space-y-8">
      {/* Patient Banner */}
      <div className="bg-brand-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-6" />
        <div className="relative">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-lg font-bold">MC</div>
            <div>
              <h2 className="text-xl text-white">Margaret Chin</h2>
              <p className="text-brand-200 text-sm mt-0.5">Post-chemotherapy recovery &mdash; Day 5</p>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-brand-200">Today's progress</span>
              <span className="font-semibold">{completedCount}/{checklist.length} tasks</span>
            </div>
            <div className="w-full bg-white/15 rounded-full h-2">
              <div className="bg-emerald-300 rounded-full h-2 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/symptoms" className="bg-white border border-warm-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all group">
          <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mb-3 group-hover:bg-brand-100 transition-colors">
            <HeartPulse className="w-5 h-5" />
          </div>
          <p className="font-medium text-sm text-warm-900 group-hover:text-brand-700">Log Symptom</p>
          <p className="text-xs text-warm-400 mt-0.5">Quick one-tap entry</p>
        </Link>
        <Link to="/log" className="bg-white border border-warm-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all group">
          <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 mb-3 group-hover:bg-brand-100 transition-colors">
            <ClipboardList className="w-5 h-5" />
          </div>
          <p className="font-medium text-sm text-warm-900 group-hover:text-brand-700">Handoff Log</p>
          <p className="text-xs text-warm-400 mt-0.5">View full timeline</p>
        </Link>
      </div>

      {/* Active Alerts */}
      {canSeeAlerts && activeAlerts.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-3.5 h-3.5 text-warm-400" />
            <h3 className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold">Active Alerts</h3>
          </div>
          <div className="space-y-2.5">
            {activeAlerts.map((alert) => (
              <Link key={alert.id} to={`/alerts/${alert.id}`} className="block bg-white border border-warm-200 rounded-xl p-4 flex items-start gap-3 hover:border-brand-300 hover:shadow-sm transition-all">
                <FlagBadge severity={alert.severity} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-warm-900">{alert.message}</p>
                  <p className="text-xs text-warm-400 mt-1">{formatTime(alert.created_at)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-warm-400" />
            <h3 className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold">Recent Activity</h3>
          </div>
          <Link to="/log" className="text-sm text-brand-600 font-medium hover:text-brand-700 flex items-center gap-1 transition-colors">
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {recentLogs.map((entry) => (
            <Link key={entry.id} to={`/log/${entry.id}`} className="block bg-white border border-warm-200 rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-warm-900">{entry.summary}</span>
                    {entry.is_flagged && entry.flag_severity && <FlagBadge severity={entry.flag_severity} />}
                  </div>
                  <p className="text-xs text-warm-400 mt-1">{entry.author_name} &middot; {formatTime(entry.timestamp)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
