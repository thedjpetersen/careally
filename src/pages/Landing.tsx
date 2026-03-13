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
  Star,
  Smartphone,
  Lock,
  RefreshCw,
} from 'lucide-react'

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
    description: 'Flagged entries automatically generate alerts for clinicians and primary caregivers based on severity level.',
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
  {
    num: '01',
    title: 'Build your care team',
    description: 'Add family members, caregivers, and clinicians to the patient\'s care circle. Everyone gets the right level of access.',
  },
  {
    num: '02',
    title: 'Log and track daily',
    description: 'Record vitals, symptoms, and medications throughout the day. Check off tasks as they\'re completed.',
  },
  {
    num: '03',
    title: 'Stay informed, stay connected',
    description: 'Everyone on the team sees updates in real-time. Severity-based alerts surface what matters most.',
  },
]

const testimonials = [
  {
    quote: 'CareAlly made our shift transitions so much smoother. My mom\'s night caregiver always knows exactly what happened during the day.',
    name: 'Jennifer L.',
    role: 'Primary Caregiver',
    avatar: 'JL',
  },
  {
    quote: 'As a home health nurse, I love that I can see the full picture before each visit. The symptom history and vitals trends are invaluable.',
    name: 'Dr. Sarah K.',
    role: 'Home Health Clinician',
    avatar: 'SK',
  },
  {
    quote: 'I live out of state but can finally stay in the loop on Dad\'s care. The daily checklist gives me peace of mind.',
    name: 'Michael R.',
    role: 'Family Member',
    avatar: 'MR',
  },
]

const stats = [
  { value: '40%', label: 'of family caregivers report burnout from poor coordination' },
  { value: '65%', label: 'of care errors happen during shift handoffs' },
  { value: '3.5x', label: 'better outcomes with structured care documentation' },
]

const trustPoints = [
  { icon: Lock, label: 'End-to-end encryption' },
  { icon: Smartphone, label: 'Works on any device' },
  { icon: RefreshCw, label: 'Real-time sync' },
  { icon: Shield, label: 'HIPAA-conscious design' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Nav */}
      <nav className="bg-white border-b border-warm-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-700 flex items-center justify-center text-white">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <span className="text-xl text-brand-800" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-warm-600">
            <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-600 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-brand-600 transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-warm-600 hover:text-brand-600 transition-colors px-4 py-2 hidden sm:block"
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
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
                <CheckCircle className="w-3.5 h-3.5" />
                Designed for home caregiving teams
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] text-brand-800 leading-[1.15]">
                Better handoffs.<br />Better care.
              </h1>
              <p className="text-lg text-warm-600 mt-5 leading-relaxed">
                CareAlly gives families, caregivers, and clinicians a shared space to coordinate care &mdash; so nothing gets lost between shifts.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-white bg-brand-700 hover:bg-brand-600 transition-all px-7 py-3.5 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md"
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
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src="/images/hero.jpg"
                    alt="Caregiver supporting a patient in a warm, home setting"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating card accent */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2.5 border border-warm-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-warm-900">All tasks complete</p>
                    <p className="text-[10px] text-warm-400">Today, 5:30 PM</p>
                  </div>
                </div>
                {/* Floating alert accent */}
                <div className="absolute -top-3 -right-3 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2.5 border border-warm-100 hidden md:flex">
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-warm-900">Vitals logged</p>
                    <p className="text-[10px] text-warm-400">Helen C. &middot; 8:15 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-brand-700 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.value}>
              <p className="text-3xl md:text-4xl font-light text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{stat.value}</p>
              <p className="text-sm text-brand-200 mt-1.5 max-w-[240px] mx-auto leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl text-brand-800">Everything your care team needs</h2>
            <p className="text-warm-500 mt-3 max-w-lg mx-auto leading-relaxed">
              Purpose-built tools for coordinating care across family members, professional caregivers, and clinicians.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-warm-200 rounded-2xl p-6 hover:shadow-md hover:border-brand-200 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-100 transition-colors">
                  <f.icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg text-warm-900 mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{f.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App preview / product image */}
      <section className="bg-white border-y border-warm-100 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 w-full max-w-md md:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/nurse-sofa.jpg"
                  alt="Professional caregiver with patient in comfortable home setting"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold mb-3">Why CareAlly</p>
              <h2 className="text-3xl md:text-4xl text-brand-800 leading-tight">Care doesn't stop when the shift ends</h2>
              <p className="text-warm-500 mt-4 leading-relaxed">
                Every day, millions of family caregivers manage complex care routines with no formal system. Information gets lost in text threads, sticky notes, and verbal handoffs. CareAlly changes that.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Structured logs replace scattered text messages',
                  'Severity-based alerts ensure nothing critical is missed',
                  'Checklists keep daily routines on track across shifts',
                  'Role-based access protects sensitive clinical information',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-warm-700">
                    <CheckCircle className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="flex-1 order-2 md:order-1">
              <p className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl text-brand-800 mb-12">Simple to start</h2>
              <div className="space-y-10">
                {steps.map((step, i) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {step.num}
                      </div>
                      {i < steps.length - 1 && <div className="w-px h-full bg-brand-100 mt-2" />}
                    </div>
                    <div className="pb-2">
                      <h3 className="text-lg text-warm-900 mb-1.5" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>{step.title}</h3>
                      <p className="text-sm text-warm-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-sm md:max-w-none order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4]">
                <img
                  src="/images/family.jpg"
                  alt="Family caregiver sharing a warm moment with loved one"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white border-y border-warm-100 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl text-brand-800">Trusted by caregiving families</h2>
            <p className="text-warm-500 mt-3">Hear from families and clinicians who use CareAlly every day.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-warm-700 leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-warm-200">
                  <div className="w-9 h-9 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-warm-900">{t.name}</p>
                    <p className="text-xs text-warm-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / security bar */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {trustPoints.map((tp) => (
              <div key={tp.label} className="flex items-center gap-2.5 text-warm-500">
                <tp.icon className="w-4 h-4 text-brand-500" />
                <span className="text-sm font-medium">{tp.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section id="roles" className="bg-white border-y border-warm-100 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] text-brand-600 uppercase tracking-[0.2em] font-semibold mb-3">Built for every role</p>
            <h2 className="text-3xl md:text-4xl text-brand-800">One platform, every perspective</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Patients',
                description: 'Log symptoms, complete checklists, and stay informed about your own care plan.',
                color: 'bg-sky-50 text-sky-700',
              },
              {
                title: 'Primary Caregivers',
                description: 'Full control over logs, team management, and daily care coordination.',
                color: 'bg-brand-50 text-brand-700',
              },
              {
                title: 'Family Members',
                description: 'Stay in the loop with appropriate access to schedules and status updates.',
                color: 'bg-warm-100 text-warm-700',
              },
              {
                title: 'Clinicians',
                description: 'Full clinical access to notes, vitals history, and severity-based alert management.',
                color: 'bg-violet-50 text-violet-700',
              },
            ].map((role) => (
              <div key={role.title} className="rounded-2xl border border-warm-200 p-6 text-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${role.color}`}>
                  {role.title}
                </span>
                <p className="text-sm text-warm-500 leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-brand-700 rounded-3xl overflow-hidden relative">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-8" />
                <div className="relative">
                  <h2 className="text-3xl md:text-4xl text-white mb-4">Ready to coordinate care?</h2>
                  <p className="text-brand-200 max-w-md mb-8 leading-relaxed">
                    Try the demo with a pre-built care team. See how CareAlly keeps everyone on the same page &mdash; from morning meds to evening vitals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-700 bg-white hover:bg-warm-50 transition-colors px-8 py-3.5 rounded-full shadow-sm"
                    >
                      Try the demo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors px-8 py-3.5 rounded-full"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-80 lg:w-96">
                <img
                  src="/images/caregiver-bench.jpg"
                  alt="Caregiver and patient sharing a warm moment outdoors"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warm-200 bg-brand-800">
        {/* Main footer content */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <span className="text-xl text-white" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>CareAlly</span>
              </div>
              <p className="text-sm text-brand-300 leading-relaxed max-w-xs mb-6">
                Coordinating care for families, caregivers, and clinicians. Because better handoffs mean better care.
              </p>
              <div className="flex items-center gap-2 text-brand-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium">All systems operational</span>
              </div>
            </div>

            {/* Product column */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-[10px] text-brand-400 uppercase tracking-[0.15em] font-semibold mb-4">Product</p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="text-brand-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-brand-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="text-brand-300 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#roles" className="text-brand-300 hover:text-white transition-colors">Who It's For</a></li>
              </ul>
            </div>

            {/* Features column */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-[10px] text-brand-400 uppercase tracking-[0.15em] font-semibold mb-4">Features</p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#features" className="text-brand-300 hover:text-white transition-colors">Handoff Logs</a></li>
                <li><a href="#features" className="text-brand-300 hover:text-white transition-colors">Symptom Tracking</a></li>
                <li><a href="#features" className="text-brand-300 hover:text-white transition-colors">Care Checklists</a></li>
                <li><a href="#features" className="text-brand-300 hover:text-white transition-colors">Smart Alerts</a></li>
              </ul>
            </div>

            {/* Get Started column */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-[10px] text-brand-400 uppercase tracking-[0.15em] font-semibold mb-4">Get Started</p>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="text-brand-300 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/login" className="text-brand-300 hover:text-white transition-colors">Try the Demo</Link></li>
                <li><a href="#how-it-works" className="text-brand-300 hover:text-white transition-colors">Quick Start Guide</a></li>
              </ul>
            </div>

            {/* Legal / Info column */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-[10px] text-brand-400 uppercase tracking-[0.15em] font-semibold mb-4">Legal</p>
              <ul className="space-y-2.5 text-sm">
                <li><a href="#" className="text-brand-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-brand-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-brand-300 hover:text-white transition-colors">HIPAA Notice</a></li>
                <li><a href="#" className="text-brand-300 hover:text-white transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-700">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-brand-400">&copy; 2026 CareAlly. All rights reserved. This is a demo application.</p>
            <div className="flex items-center gap-6 text-xs text-brand-400">
              <a href="#" className="hover:text-brand-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-brand-200 transition-colors">Terms</a>
              <a href="#" className="hover:text-brand-200 transition-colors">Cookies</a>
              <span>Photos by <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-brand-300 hover:text-white transition-colors">Unsplash</a></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
