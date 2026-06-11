'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const SERVICES = [
  {
    label: 'Architectural Visualisation',
    heading: 'Photorealistic renders\nthat sell before you build.',
    description:
      'Studio-grade architectural renders that communicate design intent with precision and elegance — trusted by architects, developers, and design studios worldwide.',
    features: [
      'Photorealistic lighting & materials',
      'Stills, animations & virtual tours',
      'Fast turnaround, revision-inclusive',
    ],
    href: '/services/rendering-services',
    image: '/services/rendering.jpg',
    imageAlt: 'Architectural rendering — cinematic interior',
  },
  {
    label: '3D Modelling',
    heading: 'Precision models,\nbuilt to specification.',
    description:
      'From concept geometry to construction-ready assets, we deliver accurate, clean 3D models for architecture, product design, and interior visualisation projects.',
    features: [
      'BIM-compatible & IFC-ready geometry',
      'Multi-format export (FBX, RVT, SKP)',
      'Architecture, interior & product-ready',
    ],
    href: '/services/3d-modelling',
    image: '/services/modelling.jpg',
    imageAlt: '3D architectural model — structural detail',
  },
  {
    label: 'AI Consulting',
    heading: 'Intelligent systems\nbuilt around your workflow.',
    description:
      'We integrate AI into your studio processes — automating repetitive tasks, accelerating production, and delivering measurable competitive advantage through bespoke solutions.',
    features: [
      'Custom AI workflow automation',
      'Tool integration, training & onboarding',
      'Strategy, scoping & end-to-end delivery',
    ],
    href: '/services/ai-consulting',
    image: '/services/ai-consulting.jpg',
    imageAlt: 'AI consulting — intelligent workflow system',
  },
  {
    label: 'Web Development',
    heading: 'Premium digital platforms\nbuilt to perform.',
    description:
      'Custom-built web experiences engineered for speed, conversion, and longevity — from portfolio sites to full SaaS products serving architecture and design studios.',
    features: [
      'Custom Next.js & React development',
      'Performance-optimised, SEO-ready',
      'Scalable, secure & maintainable',
    ],
    href: '/services/web-development',
    image: '/services/web-development.jpg',
    imageAlt: 'Web development — premium digital product',
  },
]

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-[#0088cc] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

export default function ServicesShowcase() {
  return (
    <section id="services" aria-label="Our services">
      {SERVICES.map((service, i) => {
        const reversed = i % 2 !== 0

        return (
          <div
            key={service.href}
            className={`border-b border-slate-100 ${reversed ? 'bg-[#f8fafc]' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
              <div
                className={`flex flex-col gap-12 lg:gap-20 items-center ${
                  reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >

                {/* ── Text side ── */}
                <motion.div
                  className="flex-1 max-w-lg w-full"
                  initial={{ opacity: 0, x: reversed ? 28 : -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease }}
                >
                  {/* Label */}
                  <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-5">
                    {service.label}
                  </p>

                  {/* Heading */}
                  <h2 className="text-[1.85rem] sm:text-[2.25rem] lg:text-[2.5rem] font-bold tracking-tight text-[#092145] leading-[1.08] mb-5 whitespace-pre-line">
                    {service.heading}
                  </h2>

                  {/* Description */}
                  <p className="text-base text-[#64748B] leading-relaxed mb-8 max-w-[420px]">
                    {service.description}
                  </p>

                  {/* Feature points */}
                  <ul className="flex flex-col gap-3 mb-10">
                    {service.features.map(feat => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-[#374151]">
                        <CheckIcon />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#092145] rounded-xl hover:bg-[#00527d] transition-colors shadow-sm group"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>

                {/* ── Image side ── */}
                <motion.div
                  className="flex-1 w-full"
                  initial={{ opacity: 0, x: reversed ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, ease, delay: 0.1 }}
                >
                  <div className="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 shadow-[0_8px_48px_rgba(0,0,0,0.10)] aspect-[4/3]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle bottom-left gradient for depth */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: 'linear-gradient(135deg, rgba(0,20,36,0.08) 0%, transparent 50%)' }}
                      aria-hidden="true"
                    />
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
