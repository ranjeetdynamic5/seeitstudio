'use client'

import Link from "next/link"
import type { ReactNode } from "react"
import {
  Layers,
  Box,
  Building2,
  Cpu,
  Globe,
  Pen,
} from "lucide-react"

export type Service = {
  title: string
  category: string
  description: string
  href: string
  icon?: ReactNode
  highlights: string[]
  image?: string
}

function getIcon(title: string) {
  const t = title.toLowerCase()
  if (t.includes('render') || t.includes('visual')) return <Layers className="w-5 h-5" />
  if (t.includes('3d') || t.includes('model')) return <Box className="w-5 h-5" />
  if (t.includes('bim') || t.includes('architect')) return <Building2 className="w-5 h-5" />
  if (t.includes('ai') || t.includes('consult')) return <Cpu className="w-5 h-5" />
  if (t.includes('web') || t.includes('ux') || t.includes('ui')) return <Globe className="w-5 h-5" />
  return <Pen className="w-5 h-5" />
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={service.href}
      className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Icon badge */}
      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-[#092145] mb-5 group-hover:bg-[#0066FF]/10 group-hover:text-[#0066FF] transition-colors">
        {getIcon(service.title)}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#092145] mb-2 group-hover:text-[#0066FF] transition-colors">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#64748B] leading-relaxed flex-1 mb-5">
        {service.description}
      </p>

      {/* Learn more */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-[#092145] group-hover:text-[#0066FF] transition-colors">
        Learn more
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </div>
    </Link>
  )
}