'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

function inView(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.65, ease, delay },
  }
}

const inputCls =
  'w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#0088cc]/50 focus:ring-2 focus:ring-[#0088cc]/10 transition-colors'

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '£500M+', label: 'Property Value Visualised' },
  { value: '150+', label: 'UK Practices Supported' },
  { value: '98%', label: 'Client Retention Rate' },
  { value: '10+', label: 'Years Architectural Experience' },
]

const RENDER_TYPES = [
  {
    title: 'Exterior Rendering',
    description:
      'Convey scale, context, and atmosphere. We produce compelling exterior visuals that help secure planning permissions, impress stakeholders, and drive off-plan property sales before ground is broken.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Interior Rendering',
    description:
      'Showcase natural light, bespoke textures, and spatial flow. Our interior CGI brings unbuilt spaces to life, allowing your clients to genuinely experience the design long before construction begins.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: 'Product Rendering',
    description:
      'Precision digital twin creation for furniture, fixtures, and lighting manufacturers. Achieve studio-quality lighting setups and styling without the logistical cost and limitations of physical photography.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: 'Animation & Walkthroughs',
    description:
      'Cinematic fly-throughs and immersive virtual tours. Guide your stakeholders through the built environment with fluid, high-fidelity motion graphics that capture the true essence of your development.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
  },
]

const PROCESS = [
  {
    step: '01',
    title: 'Discovery & Briefing',
    description:
      'We review your CAD models, floor plans, and material schedules. Together, we define the optimal camera angles, lighting mood, and core narrative required for the final visuals.',
  },
  {
    step: '02',
    title: '3D Production',
    description:
      'Our artists build the scene, applying physically accurate materials and lighting environments. We populate the space with high-quality, curated assets to provide authentic scale and context.',
  },
  {
    step: '03',
    title: 'Review & Refinement',
    description:
      'We supply initial white-clay renders for geometry and composition approval, followed by draft colour visuals. You review and refine lighting, textures, and styling until the vision is realised.',
  },
  {
    step: '04',
    title: 'Final Delivery',
    description:
      'Upon final sign-off, we render at ultra-high resolution (4K or 8K). Our post-production team completes the final grading for a polished, cinematic finish ready for print and digital use.',
  },
]

const BENEFITS = [
  {
    title: 'Faster Planning Approvals',
    description:
      'Present clear, unambiguous visual evidence to planning committees. High-quality CGI removes the guesswork from the approval process and clearly demonstrates contextual integration.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Elevated Client Presentations',
    description:
      'Replace flat 2D plans with immersive 3D environments. Help non-technical stakeholders understand spatial relationships and design nuances instantly.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Streamlined Communication',
    description:
      'Bridge the gap between technical design and client expectation. Ensure architects, investors, and contractors share exactly the same visual reference from day one.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: 'Reduced Design Revisions',
    description:
      'Identify and resolve material clashes, spatial constraints, and lighting issues in the digital space before they become costly site variations during construction.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
  {
    title: 'High-Impact Marketing',
    description:
      'Launch sales campaigns months earlier. Magazine-quality imagery commands premium property valuations and accelerates off-plan commitments.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
]

const WHY_US = [
  {
    title: 'Architectural Backgrounds',
    description:
      "Our team understands construction details, spatial hierarchy, and architectural proportions. We don't just render; we accurately read your technical drawings and understand your design language.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Commercial Acumen',
    description:
      "We know these images serve a purpose — whether that's securing investment, passing planning, or selling premium real estate. We engineer our visuals to convert and perform in the real world.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Uncompromising Quality',
    description:
      'We utilise industry-leading rendering engines to achieve physically accurate lighting and materiality. The result is a genuinely photorealistic image that stands up to the closest scrutiny.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'UK-Based Reliability',
    description:
      'Operating from the UK means real-time communication, aligned working hours, and an inherent understanding of British architectural vernacular, building regulations, and planning standards.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Seeit Studio consistently delivers visuals that capture the exact atmosphere we intend. Their ability to read complex technical drawings and translate them into compelling imagery has made them an indispensable extension of our own practice.",
    name: 'Sarah Jenkins',
    role: 'Director, SJ Architects — London',
    initials: 'SJ',
  },
  {
    quote:
      'The exterior CGIs and fly-throughs produced for our latest residential scheme were instrumental in securing 60% of sales off-plan. A highly professional studio that completely understands commercial deadlines and property marketing.',
    name: 'David Harwood',
    role: 'Managing Director, Harwood Property Group',
    initials: 'DH',
  },
  {
    quote:
      "I am incredibly particular about lighting and fabric textures. Seeit Studio is the only visualisation partner I've worked with who gets the materiality right on the first draft. Their attention to detail is exceptional.",
    name: 'Eleanor Croft',
    role: 'Founder, Croft Interiors',
    initials: 'EC',
  },
]

const FAQS = [
  {
    question: 'How do you structure your pricing?',
    answer:
      'Pricing is determined by the complexity of the 3D model, the number of final images required, and the target resolution. We provide a transparent, fixed-fee quotation upfront after reviewing your project brief and CAD files.',
  },
  {
    question: 'What is included in your revision process?',
    answer:
      'Our standard workflow includes two formal rounds of revisions. The first round focuses on camera angles and structural geometry, whilst the second refines lighting, materials, and atmospheric details to ensure the exact look is achieved.',
  },
  {
    question: 'What are your typical turnaround times?',
    answer:
      'For standard architectural projects, initial draft renders are typically delivered within 5 to 7 working days. Highly complex masterplans or animated walkthroughs will require a tailored production schedule, which we agree upon before commencement.',
  },
  {
    question: 'What file formats do you need to begin?',
    answer:
      'We accept most standard 3D and 2D formats, including SketchUp (.skp), Revit (.rvt), Rhino (.3dm), AutoCAD (.dwg), as well as standard PDF floor plans and elevations.',
  },
  {
    question: 'Which industries do you primarily serve?',
    answer:
      'We partner with architecture practices, property developers, interior design studios, and construction firms across the UK. We also provide specialist product rendering for high-end furniture and lighting manufacturers.',
  },
  {
    question: 'How are the final files delivered?',
    answer:
      'Final static images are delivered digitally via a secure link in uncompressed TIFF and high-quality JPEG formats at your requested resolution (typically 4K or 8K). Video walkthroughs and animations are provided in 4K MP4 format.',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRow() {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#f0a500]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[#0B0F19] group-hover:text-[#00334e] transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease }}
          className="shrink-0 w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#e0f0f8] flex items-center justify-center text-[#64748B] group-hover:text-[#0088cc] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-5 text-sm text-[#64748B] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ArchRenderingContent() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormStatus('loading')
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
          service: 'Architectural Rendering',
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFormStatus('success')
        formRef.current?.reset()
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#001424] overflow-hidden" aria-label="Hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              className="max-w-[520px]"
            >
              <motion.nav
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } } }}
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-sm text-slate-500 mb-10"
              >
                <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                <svg className="w-3 h-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <Link href="/services" className="hover:text-slate-300 transition-colors">Services</Link>
                <svg className="w-3 h-3 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span className="text-slate-300 font-medium">Architectural Rendering</span>
              </motion.nav>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay: 0.05 } } }}
                className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-5"
              >
                Architectural Rendering · UK Design Studio
              </motion.p>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay: 0.1 } } }}
                className="text-[2.4rem] sm:text-[3rem] lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.06] mb-6"
              >
                Cinematic Architectural
                <br />
                Visualisation.
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay: 0.15 } } }}
                className="text-base text-slate-400 leading-relaxed max-w-[440px] mb-10"
              >
                We produce photorealistic 3D rendering and animations for UK architects, property developers, and
                interior designers. Communicate your design intent with absolute clarity and secure commercial success.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay: 0.2 } } }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B0F19] bg-[#f0a500] rounded-xl hover:bg-[#d4890a] transition-colors shadow-[0_2px_20px_rgba(240,165,0,0.28)]"
                >
                  Discuss Your Project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white/75 border border-white/20 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
                >
                  View Our Portfolio
                </a>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease, delay: 0.25 } } }}
                className="flex flex-wrap gap-x-7 gap-y-3"
              >
                {[
                  'Trusted by leading UK practices',
                  'Physically accurate lighting & materiality',
                  'Seamless integration with your design workflow',
                ].map((label) => (
                  <div key={label} className="flex items-center gap-2.5 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0088cc] shrink-0" />
                    {label}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: image */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease, delay: 0.18 }}
              className="relative w-full"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_72px_rgba(0,0,0,0.55)] aspect-[16/10]">
                <Image
                  src="/hero/D5-banner.webp"
                  alt="Photorealistic architectural rendering — luxury development"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(0,20,36,0.18) 0%, transparent 60%)' }}
                  aria-hidden="true"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.7 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#00334e] border border-[#0088cc]/30 rounded-xl px-4 py-3 shadow-xl"
              >
                <p className="text-[11px] font-semibold text-[#0088cc] uppercase tracking-widest mb-0.5">
                  Studio Grade
                </p>
                <p className="text-sm font-bold text-white leading-tight">Photorealistic Output</p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 2. STATS ─────────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-slate-100" aria-label="Statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-100">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} {...inView(i * 0.08)} className="text-center lg:px-8">
                <p className="text-4xl sm:text-5xl font-bold text-[#00334e] tracking-tight mb-2">{stat.value}</p>
                <p className="text-sm text-[#64748B] font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PORTFOLIO SHOWCASE ────────────────────────────────────────────── */}
      <section className="bg-[#001424]" aria-label="Portfolio showcase" id="portfolio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16">
            <motion.div {...inView()}>
              <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-4">Selected Work</p>
              <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-white leading-[1.1]">
                Architecture brought<br />to life.
              </h2>
            </motion.div>
            <motion.p {...inView(0.1)} className="text-sm text-slate-400 max-w-xs leading-relaxed sm:text-right">
              A selection of architectural CGI produced for leading UK practices and property developers.
            </motion.p>
          </div>

          {/* Hero — full-width cinematic render */}
          <motion.div
            {...inView(0.05)}
            className="relative w-full rounded-2xl overflow-hidden aspect-[21/9] mb-4"
          >
            <motion.div
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.85, ease }}
              className="absolute inset-0"
            >
              <Image
                src="/hero/D5-banner.webp"
                fill
                className="object-cover"
                alt="Photorealistic exterior render — luxury residential development, London"
                sizes="100vw"
                priority
              />
            </motion.div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,20,36,0.82) 0%, rgba(0,20,36,0.10) 45%, transparent 100%)' }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 pointer-events-none">
              <div className="flex items-end justify-between">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-[#0088cc] rounded-full mb-3">
                    Exterior Rendering
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">
                    Luxury Residential Development
                  </h3>
                  <p className="text-sm text-white/50">London, United Kingdom · 4K Ultra-HD</p>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-0.5">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Output</p>
                  <p className="text-sm font-semibold text-white/55">Studio Grade</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Asymmetric 12-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">

            {/* Left — wider landscape image */}
            <motion.div
              {...inView(0.1)}
              className="md:col-span-7 relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0"
              >
                <Image
                  src="/hero/Arch-banner.webp"
                  fill
                  className="object-cover"
                  alt="Photorealistic interior render — bespoke residential design, Edinburgh"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </motion.div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,20,36,0.80) 0%, transparent 55%)' }}
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white/90 bg-white/10 backdrop-blur-sm rounded-full mb-2.5 border border-white/10">
                  Interior CGI
                </span>
                <p className="text-sm font-semibold text-white leading-snug">Bespoke Residential Interior</p>
                <p className="text-xs text-white/45 mt-1">Edinburgh, United Kingdom</p>
              </div>
            </motion.div>

            {/* Right column — image + info tile stacked */}
            <div className="md:col-span-5 flex flex-col gap-4">

              <motion.div
                {...inView(0.14)}
                className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <motion.div
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/hero/open_bim.webp"
                    fill
                    className="object-cover"
                    alt="Aerial CGI — mixed-use masterplan development, Birmingham"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </motion.div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,20,36,0.80) 0%, transparent 55%)' }}
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <span className="inline-block px-2.5 py-1 text-[11px] font-semibold text-white/90 bg-white/10 backdrop-blur-sm rounded-full mb-2 border border-white/10">
                    Aerial CGI
                  </span>
                  <p className="text-sm font-semibold text-white leading-snug">Mixed-Use Masterplan</p>
                  <p className="text-xs text-white/45 mt-1">Birmingham, United Kingdom</p>
                </div>
              </motion.div>

              {/* Info tile */}
              <motion.div
                {...inView(0.18)}
                className="rounded-2xl bg-[#00334e]/60 border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <p className="text-[11px] font-semibold text-[#0088cc] uppercase tracking-widest mb-4">
                    Delivery Standard
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-white leading-[1.15] mb-3">
                    4K &amp; 8K<br />Output
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Every render delivered print-ready in uncompressed TIFF and high-quality JPEG — billboard to digital.
                  </p>
                </div>
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f0a500] hover:text-[#d4890a] transition-colors mt-5"
                >
                  Start a project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </motion.div>

            </div>
          </div>

          {/* Bottom strip */}
          <motion.div
            {...inView(0.22)}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.07]"
          >
            <p className="text-sm text-slate-500 text-center sm:text-left">
              Every project is unique.{' '}
              <span className="text-white/75">We tailor our approach to your brief and timeline.</span>
            </p>
            <a
              href="#enquiry"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0B0F19] bg-[#f0a500] rounded-xl hover:bg-[#d4890a] transition-colors"
            >
              Start Your Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── 4. SERVICE TYPES ─────────────────────────────────────────────────── */}
      <section className="bg-[#F7F9FA]" aria-label="Rendering service types" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div {...inView()} className="max-w-2xl mb-14">
            <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-4">What We Offer</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-[#0B0F19] leading-[1.1] mb-5">
              A complete range of architectural
              <br />
              visualisation services.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              From single exterior stills to full animation packages — we cover every stage of the architectural
              visualisation workflow with the same level of precision and craft.
            </p>
          </motion.div>

          {/* 2-column grid for larger, more editorial service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {RENDER_TYPES.map((type, i) => (
              <motion.div
                key={type.title}
                {...inView(i * 0.08)}
                className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-13 h-13 w-12 h-12 bg-[#e0f0f8] text-[#0088cc] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0088cc] group-hover:text-white transition-colors duration-300">
                  {type.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#0B0F19] mb-3">{type.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ───────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F9FA]" aria-label="Our process">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div {...inView()} className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-[#0B0F19] leading-[1.1] mb-5">
              A structured process from brief
              <br />
              to final delivery.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Our four-phase workflow ensures consistent quality, no surprises, and deliverables that match your brief exactly.
            </p>
          </motion.div>

          <div className="relative">
            <div
              className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-slate-200"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  {...inView(i * 0.1)}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#00334e] text-white flex items-center justify-center text-sm font-bold mb-5 shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="text-sm font-semibold text-[#0B0F19] mb-2.5">{step.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BENEFITS (image-split layout) ─────────────────────────────────── */}
      <section className="bg-white" aria-label="Benefits of architectural CGI">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

            {/* Left: large cinematic image */}
            <motion.div
              {...inView()}
              className="relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-full order-2 lg:order-1"
            >
              <Image
                src="/hero/Arch-banner.webp"
                alt="Architectural rendering — physically accurate materiality and lighting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001424]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-semibold text-white leading-snug">
                  Physically accurate lighting &amp; materiality
                </p>
                <p className="text-xs text-white/60 mt-1">Applied to every scene we produce</p>
              </div>
            </motion.div>

            {/* Right: section copy + 5 benefit items */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <motion.div {...inView(0.05)}>
                <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-5">The Business Case</p>
                <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-[#0B0F19] leading-[1.1] mb-5">
                  Why CGI is a commercial
                  <br />investment, not a cost.
                </h2>
                <p className="text-base text-[#64748B] leading-relaxed mb-10 max-w-[440px]">
                  High-quality architectural visualisation reduces downstream costs, accelerates decisions, and drives measurable commercial returns.
                </p>
              </motion.div>
              <div className="flex flex-col gap-6">
                {BENEFITS.map((benefit, i) => (
                  <motion.div key={benefit.title} {...inView(0.08 + i * 0.06)} className="flex items-start gap-4">
                    <div className="w-9 h-9 shrink-0 bg-[#e0f0f8] text-[#0088cc] rounded-lg flex items-center justify-center mt-0.5">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#0B0F19] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 7. WHY CHOOSE US ─────────────────────────────────────────────────── */}
      <section className="bg-[#00334e]" aria-label="Why choose us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div {...inView()} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-4">Our Difference</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-white leading-[1.1] mb-5">
              Why studios across the UK
              <br />
              choose Seeit.
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              We don&apos;t just render — we understand the architectural context, the brief, and what it takes to
              present work that wins.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                {...inView(i * 0.08)}
                className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.09] transition-colors duration-300"
              >
                <div className="text-[#0088cc] mb-5">{item.icon}</div>
                <h3 className="text-sm font-semibold text-white mb-2.5">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="bg-[#F7F9FA]" aria-label="Client testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div {...inView()} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-4">
              Client Testimonials
            </p>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-[#0B0F19] leading-[1.1]">
              Trusted by architects and developers
              <br />
              across the UK.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                {...inView(i * 0.1)}
                className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm flex flex-col"
              >
                <StarRow />
                <p className="text-[#0B0F19] text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00334e] text-white rounded-full flex items-center justify-center font-semibold text-xs shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0B0F19] text-sm">{t.name}</p>
                    <p className="text-xs text-[#64748B]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white" aria-label="Frequently asked questions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            <motion.div {...inView()} className="lg:col-span-4">
              <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-4">FAQ</p>
              <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-[#0B0F19] leading-[1.1] mb-5">
                Common questions answered.
              </h2>
              <p className="text-base text-[#64748B] leading-relaxed mb-8">
                Can&apos;t find your answer here? Get in touch and we&apos;ll respond within a few hours.
              </p>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0088cc] hover:text-[#00527d] transition-colors"
              >
                Ask us directly
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </motion.div>

            <div className="lg:col-span-8">
              {FAQS.map((faq, i) => (
                <motion.div key={i} {...inView(i * 0.05)}>
                  <FAQItem question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA + FORM ─────────────────────────────────────────────── */}
      <section className="bg-[#001424]" aria-label="Get in touch" id="enquiry">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left */}
            <motion.div {...inView()}>
              <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-5">Start a Conversation</p>
              <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-tight text-white leading-[1.1] mb-6">
                Ready to bring your unbuilt
                <br />project to life?
              </h2>
              <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-[400px]">
                Partner with Seeit Studio to produce architectural visuals that secure planning, impress stakeholders,
                and drive commercial success.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B0F19] bg-[#f0a500] rounded-xl hover:bg-[#d4890a] transition-colors"
                >
                  Discuss Your Project
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  View Case Studies
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              <div className="flex flex-col gap-4 text-sm text-slate-400">
                <a href="tel:03331212187" className="flex items-center gap-3 hover:text-white transition-colors group">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] group-hover:bg-white/[0.10] flex items-center justify-center shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  0333 121 2187
                </a>
                <a
                  href="mailto:hello@seeitstudio.co.uk"
                  className="flex items-center gap-3 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.06] group-hover:bg-white/[0.10] flex items-center justify-center shrink-0 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  hello@seeitstudio.co.uk
                </a>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div {...inView(0.1)}>
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 sm:p-9">
                {formStatus === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto mb-5">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Thank you!</h3>
                    <p className="text-slate-400">We&apos;ll contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                          Full Name <span className="text-[#f0a500]">*</span>
                        </label>
                        <input required name="full_name" type="text" placeholder="Jane Smith" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                          Email <span className="text-[#f0a500]">*</span>
                        </label>
                        <input required name="email" type="email" placeholder="jane@practice.co.uk" className={inputCls} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                          Phone <span className="text-[#f0a500]">*</span>
                        </label>
                        <input required name="phone" type="tel" placeholder="+44 7700 000000" className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                          Company{' '}
                          <span className="text-slate-500 font-normal normal-case">(optional)</span>
                        </label>
                        <input name="company" type="text" placeholder="Your practice name" className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                        Project Brief <span className="text-[#f0a500]">*</span>
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="Type of building, required views, deadline, file format..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    {formStatus === 'error' && (
                      <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/20 rounded-xl px-4 py-3">
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full py-4 bg-[#f0a500] text-[#0B0F19] font-semibold rounded-xl hover:bg-[#d4890a] transition-colors disabled:opacity-60 text-sm"
                    >
                      {formStatus === 'loading' ? 'Sending…' : 'Send Project Brief'}
                    </button>
                    <p className="text-xs text-center text-slate-600">
                      By submitting you agree to our{' '}
                      <a href="/privacy" className="text-slate-400 underline hover:text-slate-300 transition-colors">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
