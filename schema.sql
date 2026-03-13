DROP TABLE IF EXISTS actionable_alerts;
DROP TABLE IF EXISTS checklist_items;
DROP TABLE IF EXISTS handoff_log_entries;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS care_teams;

CREATE TABLE care_teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  care_team_id TEXT NOT NULL REFERENCES care_teams(id),
  role TEXT NOT NULL CHECK(role IN ('PATIENT', 'PRIMARY_CAREGIVER', 'SECONDARY_CAREGIVER', 'CLINICIAN')),
  name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE handoff_log_entries (
  id TEXT PRIMARY KEY,
  care_team_id TEXT NOT NULL REFERENCES care_teams(id),
  author_id TEXT NOT NULL REFERENCES users(id),
  entry_type TEXT NOT NULL CHECK(entry_type IN ('VITALS', 'SYMPTOM', 'MEDICATION_GIVEN', 'CLINICAL_NOTE', 'CHECKLIST')),
  summary TEXT NOT NULL,
  details TEXT, -- JSON
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  is_flagged INTEGER NOT NULL DEFAULT 0,
  flag_severity TEXT CHECK(flag_severity IN ('LOW', 'MEDIUM', 'HIGH'))
);

CREATE TABLE checklist_items (
  id TEXT PRIMARY KEY,
  care_team_id TEXT NOT NULL REFERENCES care_teams(id),
  label TEXT NOT NULL,
  time_slot TEXT,
  completed INTEGER NOT NULL DEFAULT 0,
  completed_at TEXT,
  date TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE actionable_alerts (
  id TEXT PRIMARY KEY,
  log_entry_id TEXT NOT NULL REFERENCES handoff_log_entries(id),
  target_user_id TEXT NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  severity TEXT NOT NULL CHECK(severity IN ('LOW', 'MEDIUM', 'HIGH')),
  status TEXT NOT NULL DEFAULT 'UNREAD' CHECK(status IN ('UNREAD', 'ACKNOWLEDGED', 'RESOLVED')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Seed data: The Chin family
INSERT INTO care_teams (id, name) VALUES ('ct1', 'Chin Family Care Team');

INSERT INTO users (id, care_team_id, role, name, avatar) VALUES
  ('u1', 'ct1', 'PATIENT', 'Margaret Chin', 'MC'),
  ('u2', 'ct1', 'PRIMARY_CAREGIVER', 'Helen Chin', 'HC'),
  ('u3', 'ct1', 'SECONDARY_CAREGIVER', 'David Chin', 'DC'),
  ('u4', 'ct1', 'CLINICIAN', 'Sarah Nguyen, RN', 'SN');

INSERT INTO handoff_log_entries (id, care_team_id, author_id, entry_type, summary, details, timestamp, is_flagged, flag_severity) VALUES
  ('l1', 'ct1', 'u2', 'VITALS', 'Morning vitals recorded', '{"Blood Pressure":"128/82","Temperature":"98.4°F","Heart Rate":"72 bpm"}', '2026-03-11T08:15:00', 0, NULL),
  ('l2', 'ct1', 'u2', 'MEDICATION_GIVEN', 'Morning medications administered', '{"Ondansetron":"8mg oral","Dexamethasone":"4mg oral"}', '2026-03-11T08:30:00', 0, NULL),
  ('l3', 'ct1', 'u1', 'SYMPTOM', 'Feeling nauseous', '{"Severity":"Moderate","Notes":"Started after breakfast"}', '2026-03-11T10:45:00', 1, 'MEDIUM'),
  ('l4', 'ct1', 'u2', 'VITALS', 'Midday vitals check', '{"Blood Pressure":"132/85","Temperature":"99.1°F","Heart Rate":"78 bpm"}', '2026-03-11T12:00:00', 1, 'LOW'),
  ('l5', 'ct1', 'u4', 'CLINICAL_NOTE', 'Home visit assessment complete', '{"Assessment":"Patient showing mild nausea, likely chemo-related. Temp slightly elevated — monitoring.","Plan":"Continue anti-emetics. Increase fluid intake. Follow up if temp exceeds 100.4°F."}', '2026-03-11T14:30:00', 0, NULL);

INSERT INTO checklist_items (id, care_team_id, label, time_slot, completed, date) VALUES
  ('c1', 'ct1', 'Morning blood pressure check', '8:00 AM', 1, '2026-03-11'),
  ('c2', 'ct1', 'Take morning medications', '8:30 AM', 1, '2026-03-11'),
  ('c3', 'ct1', 'Drink 8oz water', '9:00 AM', 1, '2026-03-11'),
  ('c4', 'ct1', 'Light walk (10 min)', '11:00 AM', 0, '2026-03-11'),
  ('c5', 'ct1', 'Lunch + afternoon meds', '12:30 PM', 0, '2026-03-11'),
  ('c6', 'ct1', 'Rest period', '1:00 PM', 0, '2026-03-11'),
  ('c7', 'ct1', 'Evening vitals check', '5:00 PM', 0, '2026-03-11'),
  ('c8', 'ct1', 'Evening medications', '7:00 PM', 0, '2026-03-11');

INSERT INTO actionable_alerts (id, log_entry_id, target_user_id, message, severity, status, created_at) VALUES
  ('a1', 'l3', 'u4', 'Patient reported moderate nausea', 'MEDIUM', 'ACKNOWLEDGED', '2026-03-11T10:45:00'),
  ('a2', 'l4', 'u4', 'Temperature trending upward: 99.1°F', 'LOW', 'RESOLVED', '2026-03-11T12:00:00');
