'use client'

import { useState, useRef, Fragment } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const SERVICE = 'Web Development'

const inputCls = 'w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-colors'

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: 'Portfolio Websites',
    description: 'Stunning portfolio sites that showcase your best work and leave a lasting impression on clients.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: 'Practice Websites',
    description: 'Professional websites for architecture and design practices that build trust and win new instructions.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zm12.75 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
    ),
    title: 'E-commerce',
    description: 'Sell products, courses and services online with a seamless, branded shopping experience.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Maintenance & Support',
    description: 'Ongoing updates, security monitoring and technical support so your website always performs.',
  },
]

const steps = [
  {
    title: 'Discovery & Brief',
    description: 'We learn about your practice, goals and audience, then agree on scope, structure and timeline.',
  },
  {
    title: 'Design & Build',
    description: 'We design and develop your site with your brand at the centre — built for speed, mobile, and search.',
  },
  {
    title: 'Launch & Support',
    description: 'We launch your site, train you on managing content, and stay on hand for ongoing support and updates.',
  },
]

export default function WebDevelopmentPage() {
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
              repeating-linear-gradient(
                0deg,
                transparent 0,
                transparent 28px,
                rgba(255,255,255,0.04) 28px,
                rgba(255,255,255,0.04) 29px
              )
            `,
            backgroundSize: '100% 100%, 100% 100%',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
            <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">Services</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Web Development for Architects &amp; Designers
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Professional websites that showcase your work and win more clients
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
                Web solutions built for design professionals who want to stand out online
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
                From initial conversation to live website — a smooth, collaborative process
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
                      placeholder="Tell us about your project — type of site, key pages, budget, deadline..."
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
