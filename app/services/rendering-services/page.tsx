'use client'

import { useState, useRef, Fragment } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

const SERVICE = 'Rendering Services'

const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-colors'

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Architectural Rendering',
    description: 'Stunning exterior visuals for planning applications and marketing materials.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: 'Interior Rendering',
    description: 'Photorealistic interior scenes for residential and commercial projects.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: 'Product Rendering',
    description: 'High-quality product visuals for e-commerce, catalogues and presentations.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
    title: 'Animation & Walkthrough',
    description: 'Immersive 3D walkthroughs and fly-through animations for marketing and presentations.',
  },
]

const steps = [
  {
    title: 'Project Brief',
    description: 'Share your drawings, references and goals. We review everything and confirm scope, timeline and pricing.',
  },
  {
    title: '3D Production',
    description: 'Our team builds and renders your scenes with photorealistic lighting, materials and fine detail.',
  },
  {
    title: 'Final Delivery',
    description: 'High-resolution renders delivered in your preferred format, with revisions included as standard.',
  },
]

export default function RenderingServicesPage() {
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
      <main className="flex-1 pt-20">

        {/* Hero */}
        <section
          className="relative min-h-[480px] flex items-center"
          style={{
            backgroundColor: '#0F172A',
            backgroundImage: `
              linear-gradient(135deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.97) 100%),
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
            <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Professional 3D Rendering Services
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Photorealistic visualisations for architects and designers across the UK
            </p>
            <a
              href="#enquiry-form"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors"
            >
              Get a Free Quote
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">What We Offer</h2>
              <p className="text-[#64748B] max-w-xl mx-auto">
                Comprehensive rendering solutions tailored to every stage of your project
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
                A clear, structured process from brief to final delivery
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

        {/* Enquiry Form */}
        <section id="enquiry-form" className="py-20 bg-slate-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Get a Free Quote</h2>
              <p className="text-[#64748B]">Tell us about your project — we&apos;ll respond within 24 hours</p>
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
                      placeholder="Tell us about your project — type of building, required views, deadline..."
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
