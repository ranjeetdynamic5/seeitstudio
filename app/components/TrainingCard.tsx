import Link from "next/link";
import type { TrainingCourse } from "@/lib/supabase";

export default function TrainingCard({ training }: { training: TrainingCourse }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      <div className="bg-[#0F172A] px-5 py-5">
        <h3 className="text-sm font-semibold text-white leading-snug">{training.title}</h3>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-4">
        {training.description && (
          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">{training.description}</p>
        )}

        {training.duration && (
          <div className="flex items-center gap-2 bg-[#f0f5fa] rounded-lg px-3 py-2.5">
            <svg className="w-4 h-4 text-[#64748B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium text-[#0B0F19]">{training.duration}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100 mt-auto">
          <Link
            href={`/training/${training.id}`}
            className="w-full flex items-center justify-center py-2.5 text-sm font-semibold text-[#D9534F] border border-[#D9534F] rounded-lg hover:bg-[#D9534F] hover:text-white active:bg-[#c9302c] transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
