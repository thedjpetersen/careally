export interface User {
  id: string
  name: string
  role: 'PATIENT' | 'PRIMARY_CAREGIVER' | 'SECONDARY_CAREGIVER' | 'CLINICIAN'
  avatar: string
}

export interface LogEntry {
  id: string
  authorId: string
  authorName: string
  authorRole: User['role']
  entryType: 'VITALS' | 'SYMPTOM' | 'MEDICATION_GIVEN' | 'CLINICAL_NOTE' | 'CHECKLIST'
  summary: string
  details?: Record<string, string>
  timestamp: string
  isFlagged: boolean
  flagSeverity?: 'LOW' | 'MEDIUM' | 'HIGH'
}

export interface ChecklistItem {
  id: string
  label: string
  completed: boolean
  time?: string
}

export interface Alert {
  id: string
  logEntryId: string
  message: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'UNREAD' | 'ACKNOWLEDGED' | 'RESOLVED'
  timestamp: string
}

export const currentUser: User = {
  id: 'u2',
  name: 'Helen Chin',
  role: 'PRIMARY_CAREGIVER',
  avatar: 'HC',
}

export const patient: User = {
  id: 'u1',
  name: 'Margaret Chin',
  role: 'PATIENT',
  avatar: 'MC',
}

export const careTeam: User[] = [
  patient,
  currentUser,
  { id: 'u3', name: 'David Chin', role: 'SECONDARY_CAREGIVER', avatar: 'DC' },
  { id: 'u4', name: 'Sarah Nguyen, RN', role: 'CLINICIAN', avatar: 'SN' },
]

export const handoffLog: LogEntry[] = [
  {
    id: 'l1',
    authorId: 'u2',
    authorName: 'Helen Chin',
    authorRole: 'PRIMARY_CAREGIVER',
    entryType: 'VITALS',
    summary: 'Morning vitals recorded',
    details: { 'Blood Pressure': '128/82', 'Temperature': '98.4°F', 'Heart Rate': '72 bpm' },
    timestamp: '2026-03-11T08:15:00',
    isFlagged: false,
  },
  {
    id: 'l2',
    authorId: 'u2',
    authorName: 'Helen Chin',
    authorRole: 'PRIMARY_CAREGIVER',
    entryType: 'MEDICATION_GIVEN',
    summary: 'Morning medications administered',
    details: { 'Ondansetron': '8mg oral', 'Dexamethasone': '4mg oral' },
    timestamp: '2026-03-11T08:30:00',
    isFlagged: false,
  },
  {
    id: 'l3',
    authorId: 'u1',
    authorName: 'Margaret Chin',
    authorRole: 'PATIENT',
    entryType: 'SYMPTOM',
    summary: 'Feeling nauseous',
    details: { 'Severity': 'Moderate', 'Notes': 'Started after breakfast' },
    timestamp: '2026-03-11T10:45:00',
    isFlagged: true,
    flagSeverity: 'MEDIUM',
  },
  {
    id: 'l4',
    authorId: 'u2',
    authorName: 'Helen Chin',
    authorRole: 'PRIMARY_CAREGIVER',
    entryType: 'VITALS',
    summary: 'Midday vitals check',
    details: { 'Blood Pressure': '132/85', 'Temperature': '99.1°F', 'Heart Rate': '78 bpm' },
    timestamp: '2026-03-11T12:00:00',
    isFlagged: true,
    flagSeverity: 'LOW',
  },
  {
    id: 'l5',
    authorId: 'u4',
    authorName: 'Sarah Nguyen, RN',
    authorRole: 'CLINICIAN',
    entryType: 'CLINICAL_NOTE',
    summary: 'Home visit assessment complete',
    details: {
      'Assessment': 'Patient showing mild nausea, likely chemo-related. Temp slightly elevated — monitoring.',
      'Plan': 'Continue anti-emetics. Increase fluid intake. Follow up if temp exceeds 100.4°F.',
    },
    timestamp: '2026-03-11T14:30:00',
    isFlagged: false,
  },
]

export const todayChecklist: ChecklistItem[] = [
  { id: 'c1', label: 'Morning blood pressure check', completed: true, time: '8:00 AM' },
  { id: 'c2', label: 'Take morning medications', completed: true, time: '8:30 AM' },
  { id: 'c3', label: 'Drink 8oz water', completed: true, time: '9:00 AM' },
  { id: 'c4', label: 'Light walk (10 min)', completed: false, time: '11:00 AM' },
  { id: 'c5', label: 'Lunch + afternoon meds', completed: false, time: '12:30 PM' },
  { id: 'c6', label: 'Rest period', completed: false, time: '1:00 PM' },
  { id: 'c7', label: 'Evening vitals check', completed: false, time: '5:00 PM' },
  { id: 'c8', label: 'Evening medications', completed: false, time: '7:00 PM' },
]

export const alerts: Alert[] = [
  {
    id: 'a1',
    logEntryId: 'l3',
    message: 'Patient reported moderate nausea',
    severity: 'MEDIUM',
    status: 'ACKNOWLEDGED',
    timestamp: '2026-03-11T10:45:00',
  },
  {
    id: 'a2',
    logEntryId: 'l4',
    message: 'Temperature trending upward: 99.1°F',
    severity: 'LOW',
    status: 'RESOLVED',
    timestamp: '2026-03-11T12:00:00',
  },
]
