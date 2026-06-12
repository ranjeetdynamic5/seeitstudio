"use client";

import Link from "next/link";
import type { TrainingCourse } from "@/lib/supabase";

export default function TrainingCard({ training }: { training: TrainingCourse }) {
  const href = `/training/${training.id}`;

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer">

      {/* Image */}
      <Link href={href} className="relative block w-full overflow-hidden bg-white" style={{ height: '180px' }}>
        {training.image_url ? (
          <img src={training.image_url} alt={training.title} className="w-full h-full object-contain p-4" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e8f0fe] to-[#f0f4ff]">
            <svg className="w-10 h-10 text-[#0066FF]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
        )}
        {(training as any).price && (
          <span className="absolute top-3 left-3 z-10 bg-[#f0a500] text-[#092145] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(240,165,0,0.35)]">
            £{(training as any).price}
          </span>
        )}
        {training.duration && (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {training.duration}
          </span>
        )}
      </Link>

      {/* Dark bottom section */}
      <div className="flex flex-col flex-1 bg-[#092145] p-4 gap-2">
        <Link
          href={href}
          className="text-base font-semibold text-white leading-snug line-clamp-2 hover:text-[#0066FF] transition-colors"
        >
          {training.title}
        </Link>

        {training.description && (
          <p className="text-xs text-white/50 leading-relaxed line-clamp-2">
            {training.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-white/[0.08]">
          <Link
            href={href}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#0066FF] text-white hover:bg-[#0052cc] transition-colors whitespace-nowrap"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}