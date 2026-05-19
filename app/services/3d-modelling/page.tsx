'use client'

import { useState, useRef, Fragment } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import ExploreServices from '@/components/ExploreServices'

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: '3D Modelling' },
]

const SERVICE = '3D Modelling'

const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-colors'

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    title: 'Architectural Models',
    description: 'Detailed 3D models built from drawings for planning submissions and visualisation.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Interior Design Models',
    description: 'Accurate furniture, fixture and space planning models for interior projects.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Product Models',
    description: 'Manufacturable 3D models for products, components and industrial design.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    title: 'BIM Modelling',
    description: 'Building information models for construction coordination and project delivery.',
  },
]

const steps = [
  {
    title: 'Requirements Gathering',
    description: 'We review your drawings, specifications and intended use to confirm scope, file formats and timeline.',
  },
  {
    title: '3D Modelling',
    description: 'Our specialists build accurate, production-ready models using industry-standard software.',
  },
  {
    title: 'Review & Export',
    description: 'You review the model, request any amendments, then we deliver clean exports in your required formats.',
  },
]

export default function ThreeDModellingPage() {
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
              radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 24px 24px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
            <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Expert 3D Modelling Services
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Precision 3D models for architecture, interior design and product development
            </p>
            <a
              href="#enquiry-form"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors"
            >
              Start Your Project
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">What We Offer</h2>
              <p className="text-[#64748B] max-w-xl mx-auto">
                Precision modelling services for architecture, design and engineering
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
                A proven process that keeps projects on brief, on time and on budget
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

        <ExploreServices currentSlug="3d-modelling" />

        {/* Enquiry Form */}
        <section id="enquiry-form" className="py-20 bg-slate-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Start Your Project</h2>
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
                      placeholder="Tell us about your project — drawings available, file format needed, deadline..."
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
