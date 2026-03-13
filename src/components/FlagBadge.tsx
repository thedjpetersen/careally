import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

interface FlagBadgeProps {
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
}

const config = {
  LOW: { style: 'bg-amber-50 text-amber-700 ring-amber-200', label: 'Monitor', icon: Info },
  MEDIUM: { style: 'bg-orange-50 text-orange-700 ring-orange-200', label: 'Attention', icon: AlertCircle },
  HIGH: { style: 'bg-red-50 text-red-700 ring-red-200', label: 'Urgent', icon: AlertTriangle },
}

export default function FlagBadge({ severity }: FlagBadgeProps) {
  const { style, label, icon: Icon } = config[severity]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${style}`}>
      <Icon className="w-3 h-3" strokeWidth={2.5} />
      {label}
    </span>
  )
}
