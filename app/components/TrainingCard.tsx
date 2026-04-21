// TrainingCard — Server Component

import Link from "next/link";
import type { ReactNode } from "react";

export type TrainingCourse = {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  price: number;
  description: string;
  lessons: number;
  format: "Online" | "In-Person" | "Hybrid";
};

const levelColors: Record<TrainingCourse["level"], string> = {
  Beginner: "text-emerald-700 bg-emerald-50",
  Intermediate: "text-amber-700 bg-amber-50",
  Advanced: "text-rose-700 bg-rose-50",
  "All Levels": "text-red-700 bg-red-50",
};

const formatIcons: Record<TrainingCourse["format"], ReactNode> = {
  Online: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  ),
  "In-Person": (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  Hybrid: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
    </svg>
  ),
};

export default function TrainingCard({ course }: { course: TrainingCourse }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Header band */}
      <div className="bg-[#0F172A] px-5 py-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1.5">
            {course.category}
          </p>
          <h3 className="text-sm font-semibold text-white leading-snug">{course.title}</h3>
        </div>
        <span
          className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${levelColors[course.level]}`}
        >
          {course.level}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">{course.description}</p>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            {
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              label: course.duration,
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              ),
              label: `${course.lessons} lessons`,
            },
            {
              icon: formatIcons[course.format],
              label: course.format,
            },
          ].map((meta, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 bg-[#f0f5fa] rounded-lg px-2 py-3 text-center">
              <span className="text-[#64748B]">{meta.icon}</span>
              <span className="text-xs font-medium text-[#0B0F19] leading-tight">{meta.label}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="pt-3 border-t border-slate-100 mt-auto flex flex-col gap-3">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-[#0F172A]">£{course.price.toFixed(2)}</span>
            <span className="text-sm text-[#64748B] ml-1">/ person</span>
          </div>
          <Link
            href={`/training/${course.id}`}
            className="w-full flex items-center justify-center py-2.5 text-sm font-semibold text-[#D9534F] border border-[#D9534F] rounded-lg hover:bg-[#D9534F] hover:text-white active:bg-[#c9302c] transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
