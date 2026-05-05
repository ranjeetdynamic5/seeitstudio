import Link from "next/link";
import type { TrainingCourse } from "@/lib/supabase";

export default function TrainingCard({ training }: { training: TrainingCourse }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* Image */}
      <div className="relative bg-[#f0f5fa] h-44 flex items-center justify-center border-b border-slate-100">
        {training.image_url ? (
          <img
            src={training.image_url}
            alt={training.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
        )}
      </div>

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