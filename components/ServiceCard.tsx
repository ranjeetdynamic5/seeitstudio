"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

const getServiceIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("render")) return (
    <svg className="w-20 h-20 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
  if (t.includes("model") || t.includes("3d")) return (
    <svg className="w-20 h-20 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
    </svg>
  );
  if (t.includes("ai") || t.includes("consult")) return (
    <svg className="w-20 h-20 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  );
  return (
    <svg className="w-20 h-20 text-white opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
  );
};

export default function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-row items-stretch min-h-[160px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Left side */}
      <div className="flex-1 p-6 flex flex-col gap-3 justify-between">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h3 className="text-2xl font-semibold text-[#0B0F19]">{service.title}</h3>

          {/* Description */}
          <p className="text-sm text-[#64748B] leading-relaxed">{service.description}</p>
        </div>

        {/* Learn more */}
        <a
          href={service.href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066FF] hover:text-[#0052cc] transition-colors"
        >
          Learn more
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>

      {/* Right side — decorative */}
      <div className="w-36 shrink-0 bg-[#0B0F19] flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {getServiceIcon(service.title)}
        </motion.div>
      </div>
    </div>
  );
}
