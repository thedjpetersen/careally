const TEAM_ID = 'ct1'
const BASE = '/api'

export interface User {
  id: string
  care_team_id: string
  role: 'PATIENT' | 'PRIMARY_CAREGIVER' | 'SECONDARY_CAREGIVER' | 'CLINICIAN'
  name: string
  avatar: string
}

export interface LogEntry {
  id: string
  care_team_id: string
  author_id: string
  author_name: string
  author_role: string
  author_avatar: string
  entry_type: 'VITALS' | 'SYMPTOM' | 'MEDICATION_GIVEN' | 'CLINICAL_NOTE' | 'CHECKLIST'
  summary: string
  details: Record<string, string> | null
  timestamp: string
  is_flagged: boolean
  flag_severity: 'LOW' | 'MEDIUM' | 'HIGH' | null
}

export interface ChecklistItem {
  id: string
  care_team_id: string
  label: string
  time_slot: string | null
  completed: boolean
  completed_at: string | null
  date: string
}

export interface Alert {
  id: string
  log_entry_id: string
  target_user_id: string
  message: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'UNREAD' | 'ACKNOWLEDGED' | 'RESOLVED'
  created_at: string
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/care-teams/${TEAM_ID}/users`)
  return res.json()
}

export async function fetchLog(entryType?: string): Promise<LogEntry[]> {
  const params = entryType && entryType !== 'ALL' ? `?entry_type=${entryType}` : ''
  const res = await fetch(`${BASE}/care-teams/${TEAM_ID}/log${params}`)
  return res.json()
}

export async function createLogEntry(data: {
  author_id: string
  entry_type: string
  summary: string
  details?: Record<string, string>
  is_flagged?: boolean
  flag_severity?: string
}): Promise<{ id: string; timestamp: string }> {
  const res = await fetch(`${BASE}/care-teams/${TEAM_ID}/log`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function fetchChecklist(date?: string): Promise<ChecklistItem[]> {
  const params = date ? `?date=${date}` : ''
  const res = await fetch(`${BASE}/care-teams/${TEAM_ID}/checklist${params}`)
  return res.json()
}

export async function toggleChecklistItem(itemId: string, completed: boolean): Promise<void> {
  await fetch(`${BASE}/care-teams/${TEAM_ID}/checklist/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
}

export async function fetchAlerts(): Promise<Alert[]> {
  const res = await fetch(`${BASE}/care-teams/${TEAM_ID}/alerts`)
  return res.json()
}

export async function updateAlertStatus(alertId: string, status: string): Promise<void> {
  await fetch(`${BASE}/alerts/${alertId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
}
