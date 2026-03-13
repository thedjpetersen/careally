import { Link } from 'react-router-dom'
import {
  HeartHandshake,
  ClipboardList,
  HeartPulse,
  Users,
  Shield,
  Bell,
  ArrowRight,
  CheckCircle,
  Clock,
  ListChecks,
} from 'lucide-react'

const HERO_IMG = 'https://images.unsplash.com/photo-1576765608866-5b51046452be?w=800&q=80&auto=format&fit=crop'
const SECTION_IMG = 'https://images.unsplash.com/photo-1556484687-30636164638b?w=700&q=80&auto=format&fit=crop'
const CTA_IMG = 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=700&q=80&auto=format&fit=crop'

const features = [
  {
    icon: ClipboardList,
    title: 'Clinical-Grade Handoff Logs',
    description: 'Document vitals, medications, symptoms, and clinical notes in a structured timeline that every caregiver can follow.',
  },
  {
    icon: HeartPulse,
    title: 'One-Tap Symptom Logging',
    description: 'Patients and caregivers can log symptoms in seconds. Alerts are sent automatically when severity warrants attention.',
  },
  {
    icon: ListChecks,
    title: 'Daily Care Checklists',
    description: 'Track medications, exercises, and tasks with shared checklists so nothing falls through the cracks during shift changes.',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Flagged entries automatically generate alerts for clinicians and primary caregivers based on severity.',
  },
  {
    icon: Users,
    title: 'Care Team Coordination',
    description: 'Connect patients, family caregivers, and clinicians in one place with role-based access to the right information.',
  },
  {
    icon: Shield,
    title: 'Role-Based Privacy',
    description: 'Clinical notes stay private from secondary caregivers. Each role sees exactly what they need, nothing more.',
  },
]

const steps = [
  { num: '01', title: 'Build your care team', description: 'Add family members, caregivers, and clinicians to the patient\'s care circle.' },
  { num: '02', title: 'Log and track daily', description: 'Record vitals, symptoms, and medications. Check off tasks as they\'re completed.' },
  { num: '03', title: 'Stay informed', description: 'Everyone on the team sees updates in real-time. Alerts surface what matters most.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Nav */}
      <nav className="bg-white border-b border-warm-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-xl text-brand-800" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-warm-600 hover:text-brand-600 transition-colors px-4 py-2"
            >
              Log in
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-white bg-brand-700 hover:bg-brand-600 transition-colors px-5 py-2.5 rounded-full flex items-center gap-2"
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white border-b border-warm-100">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
                <CheckCircle className="w-3.5 h-3.5" />
                Designed for home caregiving teams
              </div>
              <h1 className="text-4xl md:text-5xl text-brand-800 leading-tight">
                Better handoffs.<br />Better care.
              </h1>
              <p className="text-lg text-warm-600 mt-5 leading-relaxed">
                CareAlly gives families, caregivers, and clinicians a shared space to coordinate care &mdash; so nothing gets lost between shifts.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white bg-brand-700 hover:bg-brand-600 transition-colors px-7 py-3.5 rounded-full flex items-center gap-2 shadow-sm"
                >
                  Try the demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#features"
                  className="text-sm font-medium text-warm-600 hover:text-brand-600 transition-colors px-7 py-3.5 rounded-full border border-warm-200 hover:border-brand-300"
                >
                  See how it works
                </a>
              </div>
            </div>
            <div className="flex-1 w-full max-w-md md:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <img
                  src={HERO_IMG}
                  alt="Caregiver supporting a patient in a warm, home setting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-brand-700 py-5">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-300" />
            <span className="font-medium">Real-time updates</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-300" />
            <span className="font-medium">Role-based privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-brand-300" />
            <span className="font-medium">Automatic alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-300" />
            <span className="font-medium">Team coordination</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-brand-800">Everything your care team needs</h2>
            <p className="text-warm-500 mt-3 max-w-lg mx-auto">
              Purpose-built tools for coordinating care across family members, professional caregivers, and clinicians.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-warm-200 rounded-2xl p-6 hover:shadow-md hover:border-brand-200 transition-all">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4">
                  <f.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg text-warm-900 mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-warm-100 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 w-full max-w-sm md:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[3/4]">
                <img
                  src={SECTION_IMG}
                  alt="Family caregiver holding hands with loved one"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl text-brand-800 mb-12">Simple to start</h2>
              <div className="space-y-10">
                {steps.map((step) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="text-3xl font-light text-brand-200 leading-none mt-0.5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{step.num}</div>
                    <div>
                      <h3 className="text-lg text-warm-900 mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{step.title}</h3>
                      <p className="text-sm text-warm-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-brand-700 rounded-3xl overflow-hidden relative">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl text-white mb-4">Ready to coordinate care?</h2>
                  <p className="text-brand-200 max-w-md mb-8">
                    Try the demo with a pre-built care team. See how CareAlly keeps everyone on the same page.
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 bg-white hover:bg-warm-50 transition-colors px-8 py-3.5 rounded-full shadow-sm"
                  >
                    Try the demo
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="hidden md:block w-80 lg:w-96">
                <img
                  src={CTA_IMG}
                  alt="Caring hands supporting each other"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center text-white">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-warm-600">CareAlly</span>
            </div>
            <p className="text-xs text-warm-400">
              Built with care for caregivers. This is a demo application.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
