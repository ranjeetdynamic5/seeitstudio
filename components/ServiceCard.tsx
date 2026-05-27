'use client'

import Link from "next/link"
import { useState } from "react"
import type { ReactNode } from "react"
import { RenderingIcon, ModellingIcon, AiIcon, WebIcon } from "@/components/ui/animated-icons"

export type Service = {
  title: string
  category: string
  description: string
  href: string
  icon: ReactNode
  highlights: string[]
  image?: string
}

function ServiceIcon({ title, hovered }: { title: string; hovered: boolean }) {
  const t = title.toLowerCase()
  const outer = { width: 130, height: 130, overflow: 'hidden' as const }
  const inner = { width: 300, height: 300, transform: 'scale(0.4333)', transformOrigin: 'top left' as const }

  if (t.includes('render')) return (
    <div style={outer} className={hovered ? "text-[#0066FF]" : "text-[#0066FF]/60"}>
      <div style={inner}><RenderingIcon isHovered={hovered} /></div>
    </div>
  )
  if (t.includes('model') || t.includes('3d')) return (
    <div style={outer} className={hovered ? "text-[#0066FF]" : "text-[#0066FF]/60"}>
      <div style={inner}><ModellingIcon isHovered={hovered} /></div>
    </div>
  )
  if (t.includes('ai') || t.includes('consult')) return (
    <div style={outer} className={hovered ? "text-[#0066FF]" : "text-[#0066FF]/60"}>
      <div style={inner}><AiIcon isHovered={hovered} /></div>
    </div>
  )
  return (
    <div style={outer} className={hovered ? "text-[#0066FF]" : "text-[#0066FF]/60"}>
      <div style={inner}><WebIcon isHovered={hovered} /></div>
    </div>
  )
}

export default function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={service.href}
      className="group flex flex-col bg-white border border-slate-200 rounded-[28px] shadow-sm hover:border-[#0066FF] hover:shadow-[0_18px_50px_rgba(0,102,255,0.10)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon area */}
      <div className="flex items-center justify-center bg-[#fafafa] min-h-[140px] lg:min-h-[160px] p-1.5 border-b border-slate-100">
        <ServiceIcon title={service.title} hovered={hovered} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-2.5 gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#0B0F19] leading-snug">{service.title}</h3>
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">{service.description}</p>
        </div>

        {service.highlights && service.highlights.length > 0 && (
          <ul className="flex flex-col gap-2">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-xs text-[#64748B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2 border-t border-slate-100">
          <div className="w-full flex items-center justify-center px-4 py-1.5 text-sm font-semibold rounded-full bg-white border border-slate-200 text-[#0B0F19] hover:bg-[#0066FF] hover:text-white hover:border-[#0066FF] transition-colors">
            Learn more
          </div>
        </div>
      </div>
    </Link>
  )
}