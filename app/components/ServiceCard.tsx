// ServiceCard — Server Component

import Image from "next/image";
import type { ReactNode } from "react";

export type Service = {
  title: string;
  category: string;
  description: string;
  href: string;
  icon: ReactNode;
  highlights: string[];
  image?: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-5">
      {/* Image */}
      {service.image && (
        <div className="relative w-full h-44 shrink-0">
          <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        </div>
      )}

      <div className="px-6 flex flex-col gap-5 pb-6">
      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-[#f0f5fa] border border-slate-200 flex items-center justify-center text-[#0F172A] shrink-0">
        {service.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest">
          {service.category}
        </p>
        <h3 className="text-base font-semibold text-[#0B0F19]">{service.title}</h3>
        <p className="text-sm text-[#64748B] leading-relaxed">{service.description}</p>
      </div>

      {/* Highlights */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {service.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-[#64748B]">
            <svg
              className="w-4 h-4 text-[#D9534F] shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {h}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={service.href}
        className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9534F] hover:text-[#c9302c] transition-colors"
      >
        Learn more
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </a>
      </div>
    </div>
  );
}
