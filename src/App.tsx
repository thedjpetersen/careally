import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import HandoffLog from './pages/HandoffLog'
import Checklist from './pages/Checklist'
import Symptoms from './pages/Symptoms'
import Team from './pages/Team'
import LogEntryDetail from './pages/LogEntryDetail'
import AlertDetail from './pages/AlertDetail'
import TeamMemberDetail from './pages/TeamMemberDetail'
import Login from './pages/Login'
import Landing from './pages/Landing'
import { AuthProvider, useAuth } from './context/AuthContext'
import Spinner from './components/Spinner'

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-50 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col md:flex-row">
      <Nav />
      <div className="flex-1 flex flex-col pb-24 md:pb-0">
        <Header />
        <main className="flex-1 p-5 md:p-8 max-w-3xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log" element={<HandoffLog />} />
            <Route path="/log/:id" element={<LogEntryDetail />} />
            <Route path="/alerts/:id" element={<AlertDetail />} />
            <Route path="/team/:id" element={<TeamMemberDetail />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
