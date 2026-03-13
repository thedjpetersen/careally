import { useState } from 'react'
import { Activity, Moon, Zap, Thermometer, Meh, Utensils, Brain, Wind, Send } from 'lucide-react'
import { createLogEntry } from '../data/api'
import { useAuth } from '../context/AuthContext'

const quickSymptoms = [
  { id: 's1', label: 'Nausea', icon: Activity },
  { id: 's2', label: 'Fatigue', icon: Moon },
  { id: 's3', label: 'Pain', icon: Zap },
  { id: 's4', label: 'Fever', icon: Thermometer },
  { id: 's5', label: 'Dizziness', icon: Meh },
  { id: 's6', label: 'Loss of Appetite', icon: Utensils },
  { id: 's7', label: 'Headache', icon: Brain },
  { id: 's8', label: 'Shortness of Breath', icon: Wind },
]

const severityLevels = [
  { value: 1, label: 'Mild', color: 'bg-amber-400', flagSeverity: 'LOW' },
  { value: 2, label: 'Moderate', color: 'bg-orange-400', flagSeverity: 'MEDIUM' },
  { value: 3, label: 'Severe', color: 'bg-red-500', flagSeverity: 'HIGH' },
]

interface LoggedSymptom {
  symptom: string
  severity: number
  time: string
}

export default function Symptoms() {
  const { user } = useAuth()
  const [selected, setSelected] = useState<string | null>(null)
  const [severity, setSeverity] = useState<number | null>(null)
  const [logged, setLogged] = useState<LoggedSymptom[]>([])
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if (!selected || !severity) return
    const symptom = quickSymptoms.find((s) => s.id === selected)
    if (!symptom) return

    setSubmitting(true)
    const sevLevel = severityLevels[severity - 1]
    const details: Record<string, string> = { Severity: sevLevel.label }
    if (notes) details['Notes'] = notes

    await createLogEntry({
      author_id: user!.id,
      entry_type: 'SYMPTOM',
      summary: `Feeling ${symptom.label.toLowerCase()}`,
      details,
      is_flagged: severity >= 2,
      flag_severity: severity >= 2 ? sevLevel.flagSeverity : undefined,
    })

    setLogged((prev) => [
      { symptom: symptom.label, severity, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) },
      ...prev,
    ])
    setSelected(null)
    setSeverity(null)
    setNotes('')
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-brand-800">Log a Symptom</h2>
        <p className="text-sm text-warm-500 mt-1">Quick one-tap entry &mdash; alerts sent automatically</p>
      </div>

      <div>
        <p className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold mb-3">What are you feeling?</p>
        <div className="grid grid-cols-2 gap-2">
          {quickSymptoms.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                selected === s.id
                  ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                  : 'border-warm-200 bg-white hover:border-warm-300 hover:shadow-sm'
              }`}
            >
              <s.icon className={`w-5 h-5 flex-shrink-0 ${selected === s.id ? 'text-brand-600' : 'text-warm-400'}`} strokeWidth={1.75} />
              <span className="text-sm font-medium text-warm-900">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div>
          <p className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold mb-3">How bad is it?</p>
          <div className="flex gap-3">
            {severityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSeverity(level.value)}
                className={`flex-1 py-3 rounded-xl border text-center transition-all ${
                  severity === level.value
                    ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                    : 'border-warm-200 bg-white hover:border-warm-300'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${level.color} mx-auto mb-1.5`} />
                <span className="text-sm font-medium text-warm-900">{level.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && severity && (
        <div>
          <p className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold mb-3">Notes (optional)</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Started after breakfast..."
            className="w-full border border-warm-200 rounded-xl p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
          />
        </div>
      )}

      {selected && severity && (
        <button
          onClick={submit}
          disabled={submitting}
          className="w-full bg-brand-700 text-white py-3 rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Logging...' : 'Log Symptom & Alert Care Team'}
        </button>
      )}

      {logged.length > 0 && (
        <div>
          <h3 className="text-[10px] text-warm-400 uppercase tracking-[0.15em] font-semibold mb-3">Logged Today</h3>
          <div className="space-y-2">
            {logged.map((entry, i) => (
              <div key={i} className="bg-white border border-warm-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warm-900">{entry.symptom}</p>
                  <p className="text-xs text-warm-400">{entry.time}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${severityLevels[entry.severity - 1].color}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
