import { useEffect, useState } from 'react'
import { Check, Clock, CircleCheck } from 'lucide-react'
import { fetchChecklist, toggleChecklistItem, ChecklistItem } from '../data/api'
import Spinner from '../components/Spinner'
import { useHasRole } from '../components/RequireRole'

export default function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)
  const canEdit = useHasRole('PRIMARY_CAREGIVER', 'PATIENT')

  useEffect(() => {
    fetchChecklist('2026-03-11').then(setItems).finally(() => setLoading(false))
  }, [])

  const toggle = async (item: ChecklistItem) => {
    if (!canEdit) return
    const newVal = !item.completed
    setItems((prev) => prev.map((i) => i.id === item.id ? { ...i, completed: newVal } : i))
    await toggleChecklistItem(item.id, newVal)
  }

  if (loading) return <Spinner />

  const completedCount = items.filter((c) => c.completed).length
  const progress = items.length ? Math.round((completedCount / items.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-brand-800">Daily Checklist</h2>
        <p className="text-sm text-warm-500 mt-1">Margaret's care tasks for today</p>
        {!canEdit && <p className="text-xs text-amber-600 mt-1">View only &mdash; your role cannot modify the checklist</p>}
      </div>

      <div className="bg-white border border-warm-200 rounded-xl p-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-warm-500">Progress</span>
          <span className="font-semibold text-brand-600">{completedCount}/{items.length} complete</span>
        </div>
        <div className="w-full bg-warm-100 rounded-full h-2">
          <div className="bg-brand-600 rounded-full h-2 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const Tag = canEdit ? 'button' : 'div'
          return (
            <Tag
              key={item.id}
              onClick={canEdit ? () => toggle(item) : undefined}
              className={`w-full text-left bg-white border rounded-xl p-4 flex items-center gap-3 transition-all ${
                item.completed ? 'border-emerald-200 bg-emerald-50/40' : 'border-warm-200'
              } ${canEdit && !item.completed ? 'hover:border-brand-200 hover:shadow-sm' : ''} ${!canEdit ? 'cursor-default' : ''}`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                item.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-warm-300'
              }`}>
                {item.completed && <Check className="w-3.5 h-3.5" strokeWidth={4} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${item.completed ? 'text-warm-400 line-through' : 'text-warm-900'}`}>
                  {item.label}
                </p>
                {item.time_slot && (
                  <div className={`flex items-center gap-1 mt-0.5 ${item.completed ? 'text-warm-300' : 'text-warm-400'}`}>
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{item.time_slot}</span>
                  </div>
                )}
              </div>
              {item.completed && <CircleCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            </Tag>
          )
        })}
      </div>
    </div>
  )
}
