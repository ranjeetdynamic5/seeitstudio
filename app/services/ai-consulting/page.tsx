'use client'

import { useState, useRef, Fragment } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import ExploreServices from '@/components/ExploreServices'

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'AI Consulting' },
]

const SERVICE = 'AI Consulting'

const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-colors'

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
    title: 'AI Workflow Integration',
    description: 'Streamline your design process by embedding AI tools directly into your existing workflow.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Custom AI Tools',
    description: 'Bespoke AI solutions built specifically for your practice — from image generation to automation.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Training & Support',
    description: 'Hands-on AI training sessions for your team, plus ongoing support as the technology evolves.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Process Automation',
    description: 'Automate repetitive tasks and save hours every week with intelligent AI-powered workflows.',
  },
]

const steps = [
  {
    title: 'Workflow Audit',
    description: 'We analyse your current processes, tools and pain points to identify where AI delivers the greatest impact.',
  },
  {
    title: 'AI Strategy',
    description: 'We build a clear roadmap tailored to your practice — tools to adopt, workflows to automate, quick wins and long-term gains.',
  },
  {
    title: 'Implementation & Training',
    description: 'We set up the tools, integrate them with your workflow, and train your team to use them with confidence.',
  },
]

export default function AiConsultingPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/services/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fd.get('full_name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          company: fd.get('company') || '',
          message: fd.get('message'),
          service: SERVICE,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Header />
      <main className="flex-1 pt-20 md:pt-32">
        <Breadcrumb items={BREADCRUMB} />

        {/* Hero */}
        <section
          className="relative min-h-[480px] flex items-center"
          style={{
            backgroundColor: '#0F172A',
            backgroundImage: `
              linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.97) 100%),
              repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.03) 0,
                rgba(255,255,255,0.03) 1px,
                transparent 0,
                transparent 50%
              )
            `,
            backgroundSize: '100% 100%, 14px 14px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
            <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI Consulting for Design Professionals
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Integrate artificial intelligence into your design workflow and stay ahead
            </p>
            <a
              href="#enquiry-form"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors"
            >
              Book a Consultation
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">What We Offer</h2>
              <p className="text-[#64748B] max-w-xl mx-auto">
                Practical AI solutions that save time and give your practice a competitive edge
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#0066FF]/10 text-[#0066FF] rounded-lg flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-[#0F172A] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">How It Works</h2>
              <p className="text-[#64748B] max-w-xl mx-auto">
                A structured engagement designed to deliver measurable results
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              {steps.map((step, i) => (
                <Fragment key={step.title}>
                  <div className="flex-1 flex flex-col items-center text-center px-2">
                    <div className="w-12 h-12 rounded-full bg-[#0066FF] text-white flex items-center justify-center font-bold text-lg mb-5 shrink-0">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-[#0F172A] text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{step.description}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex items-start pt-4 shrink-0">
                      <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        <ExploreServices currentSlug="ai-consulting" />

        {/* Enquiry Form */}
        <section id="enquiry-form" className="py-20 bg-slate-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Book a Consultation</h2>
              <p className="text-[#64748B]">Tell us about your practice — we&apos;ll respond within 24 hours</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2">Thank you!</h3>
                  <p className="text-[#64748B]">We&apos;ll contact you within 24 hours.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Full Name <span className="text-[#0066FF]">*</span>
                      </label>
                      <input required name="full_name" type="text" placeholder="Jane Smith" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Email Address <span className="text-[#0066FF]">*</span>
                      </label>
                      <input required name="email" type="email" placeholder="jane@studio.co.uk" className={inputCls} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Phone Number <span className="text-[#0066FF]">*</span>
                      </label>
                      <input required name="phone" type="tel" placeholder="+44 7700 000000" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                        Company <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input name="company" type="text" placeholder="Your practice name" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0F172A] mb-1.5">
                      Message <span className="text-[#0066FF]">*</span>
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder="Tell us about your practice and where you'd like to use AI..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                  {status === 'error' && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-[#0052cc] transition-colors disabled:opacity-60 text-base"
                  >
                    {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
                  </button>
                  <p className="text-xs text-center text-slate-400">
                    By submitting you agree to our{' '}
                    <a href="/privacy" className="underline hover:text-slate-600 transition-colors">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
