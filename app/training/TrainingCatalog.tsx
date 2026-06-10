"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import EnrollModal from "@/components/EnrollModal";
import type { TrainingCourse } from "@/lib/supabase";

export default function TrainingCatalog({ trainings }: { trainings: TrainingCourse[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollTitle, setEnrollTitle] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return trainings;
    const q = search.trim().toLowerCase();
    return trainings.filter((t) => t.title.toLowerCase().includes(q));
  }, [trainings, search]);

  function openEnquiry(title: string) {
    setSelectedTitle(title);
    setModalOpen(true);
  }

  function openEnroll(title: string) {
    setEnrollTitle(title);
    setEnrollOpen(true);
  }

  return (
    <>
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* Page header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-[#0B0F19] font-medium">Training</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                  Online Training Courses
                </h1>
                <p className="mt-2 text-base text-[#64748B] max-w-xl">
                  Expert-led training for design professionals. All courses are delivered by
                  certified instructors and tailored to real-world workflows.
                </p>
              </div>
              <p className="text-sm text-[#64748B] shrink-0">
                <span className="font-semibold text-[#0B0F19]">{filtered.length}</span>{" "}
                course{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search */}
            <div className="mt-5 relative max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search training..."
                className="w-full pl-9 pr-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-50 transition-colors placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0B0F19] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Certified UK instructors",
                "Small group sizes",
                "Certificate of completion",
                "Post-course support included",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((training) => (
                <CourseCard
                  key={training.id}
                  training={training}
                  onEnquire={() => openEnquiry(training.title)}
                  onEnroll={() => openEnroll(training.title)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-[#0B0F19] mb-1">No courses found</p>
              <p className="text-sm text-[#64748B] mb-6 max-w-xs">
                {search.trim()
                  ? <>No results for &ldquo;{search.trim()}&rdquo;. Try a different keyword.</>
                  : <>No courses available yet.</>
                }
              </p>
              <button
                type="button"
                onClick={() => { setSearch(""); router.push("/training"); }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0B0F19] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#0066FF] uppercase tracking-widest mb-2">Bespoke training</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Need training for your team?</h2>
              <p className="text-sm text-slate-300 max-w-md">
                We offer group sessions, on-site training, and fully bespoke programmes for studios and businesses of any size.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:03331212187"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0333 121 2187
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      <EnquiryModal
        isOpen={modalOpen}
        title={selectedTitle}
        onClose={() => setModalOpen(false)}
      />
      <EnrollModal
        isOpen={enrollOpen}
        courseTitle={enrollTitle}
        onClose={() => setEnrollOpen(false)}
      />
    </>
  );
}

function CourseCard({
  training,
  onEnquire,
  onEnroll,
}: {
  training: TrainingCourse;
  onEnquire: () => void;
  onEnroll: () => void;
}) {
  const href = `/training/${training.id}`;

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-[28px] shadow-sm hover:border-[#00334e] hover:shadow-[0_18px_50px_rgba(0,51,78,0.10)] hover:-translate-y-0.5 transition-all duration-300 overflow-visible cursor-pointer">

      {/* Image */}
      <Link href={href} className="relative block rounded-t-[28px] overflow-hidden" style={{ height: '200px' }}>
        {training.image_url ? (
          <img src={training.image_url} alt={training.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e0f0f8] to-[#f0f8ff]">
            <svg className="w-10 h-10 text-[#00527d]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
          </div>
        )}
        {(training as any).price && (
          <span className="absolute top-3 left-3 z-10 bg-[#f0a500] text-[#0B0F19] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(240,165,0,0.35)]">
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

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        <Link
          href={href}
          className="text-sm font-semibold text-[#0B0F19] leading-snug line-clamp-2 hover:text-[#00334e] transition-colors"
        >
          {training.title}
        </Link>
        {training.description && (
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mt-1.5 mb-auto">
            {training.description}
          </p>
        )}

        <div className="flex flex-col gap-1.5 mt-3 pt-2.5 border-t border-slate-100">
          <button
            type="button"
            onClick={onEnroll}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full bg-[#f0a500] text-[#0B0F19] hover:bg-[#d4890a] transition-colors shadow-[0_2px_8px_rgba(240,165,0,0.20)]"
          >
            Enroll Now
          </button>
          <div className="flex gap-2">
            <Link
              href={href}
              className="flex-1 flex items-center justify-center py-1.5 text-xs font-semibold rounded-full bg-white border border-slate-200 text-[#0B0F19] hover:bg-[#00334e] hover:text-white hover:border-[#00334e] transition-colors"
            >
              View Course
            </Link>
            <button
              type="button"
              onClick={onEnquire}
              className="flex-1 flex items-center justify-center py-1.5 text-xs font-semibold rounded-full bg-white border border-slate-200 text-[#0B0F19] hover:bg-[#00334e] hover:text-white hover:border-[#00334e] transition-colors"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}