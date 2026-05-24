'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay },
  },
})

const TRUST_ITEMS = [
  'Studio-quality output',
  'Clear project briefs',
  'Transparent pricing',
  'UK-based team',
]

export default function ServicesHero() {
  return (
    <section
      className="relative bg-[#001424] overflow-hidden"
      aria-label="Services hero"
    >
      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text content ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-[520px]"
          >
            {/* Breadcrumb */}
            <motion.nav
              variants={fadeUp(0)}
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-slate-500 mb-10"
            >
              <Link href="/" className="hover:text-slate-300 transition-colors">
                Home
              </Link>

              <svg
                className="w-3 h-3 text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>

              <span className="text-slate-300 font-medium">Services</span>
            </motion.nav>

            {/* Eyebrow */}
            <motion.p
              variants={fadeUp(0.05)}
              className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-5"
            >
              Based in London &middot; Working Globally
            </motion.p>

            {/* Heading */}
            <motion.h1
              variants={fadeUp(0.1)}
              className="text-[2.4rem] sm:text-[3rem] lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.06] mb-6"
            >
              Digital excellence,
              <br />
              crafted with intent.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp(0.15)}
              className="text-base text-slate-400 leading-relaxed max-w-[420px] mb-10"
            >
              We architect premium digital experiences — merging structural 3D
              modelling, cutting-edge AI, and fluid web ecosystems for industry
              leaders.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp(0.2)}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0066FF] rounded-xl hover:bg-[#0052cc] transition-colors shadow-[0_2px_20px_rgba(0,102,255,0.28)]"
              >
                Explore services

                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white/75 border border-white/20 rounded-xl hover:bg-white/8 hover:text-white transition-colors"
              >
                Get in touch
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUp(0.25)}
              className="flex flex-wrap gap-x-7 gap-y-3"
            >
              {TRUST_ITEMS.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-sm text-slate-500"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088cc] shrink-0" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Video container ── */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease, delay: 0.18 }}
            className="relative w-full"
          >
            {/* Video card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#020B16] shadow-[0_24px_72px_rgba(0,0,0,0.55)]">

              {/* Aspect ratio wrapper */}
              <div className="aspect-[16/10] flex items-center justify-center">

                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-[88%] h-[88%] object-contain opacity-90 mix-blend-screen"
                  src="/videos/black_home.mp4"
                />

              </div>

              {/* Cinematic overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at center, transparent 45%, rgba(0,10,20,0.45) 100%),
                    linear-gradient(135deg, rgba(0,20,36,0.18) 0%, transparent 60%, rgba(0,20,36,0.12) 100%)
                  `,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.7 }}
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#00334e] border border-[#0088cc]/30 rounded-xl px-4 py-3 shadow-xl"
            >
              <p className="text-[11px] font-semibold text-[#0088cc] uppercase tracking-widest mb-0.5">
                Award-winning
              </p>

              <p className="text-sm font-bold text-white leading-tight">
                UK Design Studio
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}