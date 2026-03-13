import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { signJWT, verifyJWT, parseCookies, JWTPayload } from '../auth'

type Bindings = {
  DB: D1Database
  JWT_SECRET: string
  DEMO_PIN: string
}

type AuthedEnv = {
  Bindings: Bindings
  Variables: { user: JWTPayload }
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

const COOKIE_NAME = 'careally_session'

// ===================== Auth Routes (unauthenticated) =====================

app.get('/auth/users', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT id, care_team_id, role, name, avatar FROM users ORDER BY role').all()
  return c.json(results)
})

app.post('/auth/login', async (c) => {
  const body = await c.req.json<{ userId: string; pin: string }>()
  if (body.pin !== c.env.DEMO_PIN) {
    return c.json({ error: 'Invalid PIN' }, 401)
  }
  const user = await c.env.DB.prepare('SELECT id, care_team_id, role, name, avatar FROM users WHERE id = ?')
    .bind(body.userId).first<{ id: string; care_team_id: string; role: string; name: string; avatar: string }>()
  if (!user) return c.json({ error: 'User not found' }, 404)

  const token = await signJWT(
    { sub: user.id, role: user.role, teamId: user.care_team_id, name: user.name, avatar: user.avatar },
    c.env.JWT_SECRET
  )
  c.header('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`)
  return c.json({ id: user.id, role: user.role, name: user.name, avatar: user.avatar, care_team_id: user.care_team_id })
})

app.post('/auth/logout', (c) => {
  c.header('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`)
  return c.json({ ok: true })
})

app.get('/auth/me', async (c) => {
  const cookies = parseCookies(c.req.header('Cookie'))
  const token = cookies[COOKIE_NAME]
  if (!token) return c.json({ user: null })
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ user: null })
  return c.json({ user: { id: payload.sub, role: payload.role, name: payload.name, avatar: payload.avatar, care_team_id: payload.teamId } })
})

// ===================== Auth Middleware =====================

const authed = new Hono<AuthedEnv>()

authed.use('*', async (c, next) => {
  const cookies = parseCookies(c.req.header('Cookie'))
  const token = cookies[COOKIE_NAME]
  if (!token) return c.json({ error: 'Unauthorized' }, 401)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ error: 'Unauthorized' }, 401)
  c.set('user', payload)
  await next()
})

// ===================== Care Teams =====================

authed.get('/care-teams/:id', async (c) => {
  const id = c.req.param('id')
  const team = await c.env.DB.prepare('SELECT * FROM care_teams WHERE id = ?').bind(id).first()
  if (!team) return c.json({ error: 'Not found' }, 404)
  return c.json(team)
})

// ===================== Users =====================

authed.get('/care-teams/:teamId/users', async (c) => {
  const teamId = c.req.param('teamId')
  const { results } = await c.env.DB.prepare('SELECT * FROM users WHERE care_team_id = ? ORDER BY role').bind(teamId).all()
  return c.json(results)
})

// ===================== Handoff Log =====================

authed.get('/care-teams/:teamId/log', async (c) => {
  const teamId = c.req.param('teamId')
  const user = c.get('user')
  const entryType = c.req.query('entry_type')

  let query = 'SELECT h.*, u.name as author_name, u.role as author_role, u.avatar as author_avatar FROM handoff_log_entries h JOIN users u ON h.author_id = u.id WHERE h.care_team_id = ?'
  const binds: string[] = [teamId]

  // SECONDARY_CAREGIVER cannot see CLINICAL_NOTE
  if (user.role === 'SECONDARY_CAREGIVER') {
    query += " AND h.entry_type != 'CLINICAL_NOTE'"
  }

  if (entryType && entryType !== 'ALL') {
    query += ' AND h.entry_type = ?'
    binds.push(entryType)
  }
  query += ' ORDER BY h.timestamp ASC'
  const stmt = c.env.DB.prepare(query)
  const { results } = await stmt.bind(...binds).all()
  const parsed = results.map((r: any) => ({
    ...r,
    details: r.details ? JSON.parse(r.details) : null,
    is_flagged: Boolean(r.is_flagged),
  }))
  return c.json(parsed)
})

authed.post('/care-teams/:teamId/log', async (c) => {
  const teamId = c.req.param('teamId')
  const user = c.get('user')
  const body = await c.req.json<{
    author_id: string
    entry_type: string
    summary: string
    details?: Record<string, string>
    is_flagged?: boolean
    flag_severity?: string
  }>()

  // SECONDARY_CAREGIVER cannot create CLINICAL_NOTE
  if (user.role === 'SECONDARY_CAREGIVER' && body.entry_type === 'CLINICAL_NOTE') {
    return c.json({ error: 'Forbidden' }, 403)
  }

  const id = crypto.randomUUID()
  const timestamp = new Date().toISOString()

  await c.env.DB.prepare(
    'INSERT INTO handoff_log_entries (id, care_team_id, author_id, entry_type, summary, details, timestamp, is_flagged, flag_severity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    id, teamId, body.author_id, body.entry_type, body.summary,
    body.details ? JSON.stringify(body.details) : null,
    timestamp,
    body.is_flagged ? 1 : 0,
    body.flag_severity || null
  ).run()

  // Auto-create alert if flagged
  if (body.is_flagged && body.flag_severity) {
    const alertId = crypto.randomUUID()
    const clinician = await c.env.DB.prepare(
      "SELECT id FROM users WHERE care_team_id = ? AND role = 'CLINICIAN' LIMIT 1"
    ).bind(teamId).first<{ id: string }>()

    if (clinician) {
      await c.env.DB.prepare(
        'INSERT INTO actionable_alerts (id, log_entry_id, target_user_id, message, severity, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(alertId, id, clinician.id, body.summary, body.flag_severity, 'UNREAD', timestamp).run()
    }
  }

  return c.json({ id, timestamp }, 201)
})

// ===================== Checklist =====================

authed.get('/care-teams/:teamId/checklist', async (c) => {
  const teamId = c.req.param('teamId')
  const date = c.req.query('date') || new Date().toISOString().split('T')[0]
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM checklist_items WHERE care_team_id = ? AND date = ? ORDER BY rowid'
  ).bind(teamId, date).all()
  const parsed = results.map((r: any) => ({ ...r, completed: Boolean(r.completed) }))
  return c.json(parsed)
})

authed.patch('/care-teams/:teamId/checklist/:itemId', async (c) => {
  const user = c.get('user')
  // SECONDARY_CAREGIVER and CLINICIAN cannot modify checklist
  if (user.role === 'SECONDARY_CAREGIVER' || user.role === 'CLINICIAN') {
    return c.json({ error: 'Forbidden' }, 403)
  }
  const itemId = c.req.param('itemId')
  const body = await c.req.json<{ completed: boolean }>()
  const completedAt = body.completed ? new Date().toISOString() : null
  await c.env.DB.prepare(
    'UPDATE checklist_items SET completed = ?, completed_at = ? WHERE id = ?'
  ).bind(body.completed ? 1 : 0, completedAt, itemId).run()
  return c.json({ ok: true })
})

// ===================== Alerts =====================

authed.get('/care-teams/:teamId/alerts', async (c) => {
  const user = c.get('user')
  // Only CLINICIAN and PRIMARY_CAREGIVER can see alerts
  if (user.role !== 'CLINICIAN' && user.role !== 'PRIMARY_CAREGIVER') {
    return c.json({ error: 'Forbidden' }, 403)
  }
  const teamId = c.req.param('teamId')
  const { results } = await c.env.DB.prepare(
    'SELECT a.* FROM actionable_alerts a JOIN handoff_log_entries h ON a.log_entry_id = h.id WHERE h.care_team_id = ? ORDER BY a.created_at DESC'
  ).bind(teamId).all()
  return c.json(results)
})

authed.patch('/alerts/:alertId', async (c) => {
  const user = c.get('user')
  // Only CLINICIAN can manage alerts
  if (user.role !== 'CLINICIAN') {
    return c.json({ error: 'Forbidden' }, 403)
  }
  const alertId = c.req.param('alertId')
  const body = await c.req.json<{ status: string }>()
  await c.env.DB.prepare(
    'UPDATE actionable_alerts SET status = ? WHERE id = ?'
  ).bind(body.status, alertId).run()
  return c.json({ ok: true })
})

// Mount authed routes
app.route('/', authed)

export const onRequest = handle(app)
