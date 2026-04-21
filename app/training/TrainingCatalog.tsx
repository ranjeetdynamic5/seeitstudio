"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import EnquiryModal from "@/app/components/EnquiryModal";
import { TRAINING_CATEGORIES, paramToLabel } from "@/lib/trainingCategories";
import type { SanityTraining } from "@/lib/sanity/types";

// ── Constants ─────────────────────────────────────────────────────────────────

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-emerald-700 bg-emerald-50",
  Intermediate: "text-amber-700 bg-amber-50",
  Advanced: "text-rose-700 bg-rose-50",
  "All Levels": "text-blue-700 bg-blue-50",
};

// ── TrainingCatalog ───────────────────────────────────────────────────────────

export default function TrainingCatalog({
  trainings,
}: {
  trainings: SanityTraining[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams.get("category")?.toLowerCase() ?? "";
  const activeCategory = paramToLabel(param);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");

  const filtered = useMemo(() => {
    let result = activeCategory
      ? trainings.filter((t) => t.category === activeCategory)
      : trainings;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    return result;
  }, [trainings, activeCategory, search]);

  // Pre-compute counts keyed by category label
  const counts: Record<string, number> = { all: trainings.length };
  for (const t of trainings) {
    if (t.category) counts[t.category] = (counts[t.category] ?? 0) + 1;
  }

  function selectTab(tabParam: string | null) {
    router.push(tabParam ? `/training?category=${tabParam}` : "/training");
  }

  function openEnquiry(title: string) {
    setSelectedTitle(title);
    setModalOpen(true);
  }

  return (
    <>
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header ── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              {activeCategory ? (
                <>
                  <Link href="/training" className="hover:text-[#0B0F19] transition-colors">Training</Link>
                  <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  <span className="text-[#0B0F19] font-medium">{activeCategory}</span>
                </>
              ) : (
                <span className="text-[#0B0F19] font-medium">Training</span>
              )}
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                  {activeCategory ? `${activeCategory} Training` : "Online Training Courses"}
                </h1>
                <p className="mt-2 text-base text-[#64748B] max-w-xl">
                  Expert-led training for design professionals. All courses are delivered by
                  certified instructors and tailored to real-world workflows.
                </p>
              </div>
              <div className="text-sm text-[#64748B] shrink-0 flex flex-col items-end gap-1">
                <span>
                  <span className="font-semibold text-[#0B0F19]">{filtered.length}</span>{" "}
                  course{filtered.length !== 1 ? "s" : ""}
                  {activeCategory && (
                    <> in <span className="font-semibold text-[#D9534F]">{activeCategory}</span></>
                  )}
                </span>
                {activeCategory && (
                  <Link
                    href="/training"
                    className="text-xs text-[#64748B] hover:text-[#D9534F] transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear filter
                  </Link>
                )}
              </div>
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
                className="w-full pl-9 pr-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D9534F] transition-colors"
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

          {/* ── Category tabs ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="flex items-center gap-1 overflow-x-auto scrollbar-none"
              role="tablist"
              aria-label="Filter by category"
            >
              {TRAINING_CATEGORIES.map((tab) => {
                const isAll = tab.value === "all";
                const isActive = isAll ? !activeCategory : tab.label === activeCategory;
                const count = isAll ? counts.all : (counts[tab.label] ?? 0);
                return (
                  <button
                    key={tab.value}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectTab(isAll ? null : tab.value)}
                    className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px
                      ${isActive
                        ? "border-[#D9534F] text-[#D9534F]"
                        : "border-transparent text-[#64748B] hover:text-[#0B0F19] hover:border-slate-300"
                      }`}
                  >
                    {tab.label}
                    <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold
                      ${isActive ? "bg-[#D9534F] text-white" : "bg-slate-100 text-[#64748B]"}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Course grid ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((training) => (
                <CourseCard
                  key={training._id}
                  training={training}
                  onEnquire={() => openEnquiry(training.title)}
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
                {search.trim() && activeCategory
                  ? <>No results for &ldquo;{search.trim()}&rdquo; in {activeCategory}.</>
                  : search.trim()
                  ? <>No results for &ldquo;{search.trim()}&rdquo;.</>
                  : <>No courses in this category yet.</>
                }
                {" "}Try a different keyword or clear filters.
              </p>
              <button
                type="button"
                onClick={() => { setSearch(""); router.push("/training"); }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">Bespoke training</p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Need training for your team?</h2>
              <p className="text-sm text-slate-400 max-w-md">
                We offer group sessions, on-site training, and fully bespoke programmes for studios and businesses of any size.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:03331212187"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0333 121 2187
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
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
    </>
  );
}

// ── CourseCard ────────────────────────────────────────────────────────────────

function CourseCard({
  training,
  onEnquire,
}: {
  training: SanityTraining;
  onEnquire: () => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* Image */}
      {training.image ? (
        <div className="relative h-44 bg-slate-100">
          <Image
            src={training.image}
            alt={training.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-44 bg-[#0F172A] flex items-center justify-center">
          <svg className="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
          </svg>
        </div>
      )}

      {/* Header band */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {training.category && (
            <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-1">
              {training.category}
            </p>
          )}
          <h3 className="text-sm font-semibold text-[#0B0F19] leading-snug">{training.title}</h3>
        </div>
        {training.level && (
          <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${LEVEL_COLORS[training.level] ?? "text-slate-700 bg-slate-100"}`}>
            {training.level}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {training.description && (
          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">{training.description}</p>
        )}

        {/* Meta */}
        {(training.duration || training.format) && (
          <div className="grid grid-cols-2 gap-2.5">
            {training.duration && (
              <div className="flex items-center gap-2 bg-[#f0f5fa] rounded-lg px-3 py-2.5">
                <svg className="w-4 h-4 text-[#64748B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-medium text-[#0B0F19] leading-tight">{training.duration}</span>
              </div>
            )}
            {training.format && (
              <div className="flex items-center gap-2 bg-[#f0f5fa] rounded-lg px-3 py-2.5">
                <svg className="w-4 h-4 text-[#64748B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                </svg>
                <span className="text-xs font-medium text-[#0B0F19] leading-tight">{training.format}</span>
              </div>
            )}
          </div>
        )}

        {/* Price + CTAs */}
        <div className="pt-3 border-t border-slate-100 mt-auto flex flex-col gap-3">
          {training.price !== undefined && (
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-[#0F172A]">£{training.price.toFixed(2)}</span>
              <span className="text-sm text-[#64748B] ml-1">/ person</span>
            </div>
          )}
          <div className="flex gap-2">
            <Link
              href={`/training/${training.slug}`}
              className="flex-1 flex items-center justify-center py-2.5 text-sm font-semibold text-[#D9534F] border border-[#D9534F] rounded-lg hover:bg-[#D9534F] hover:text-white transition-colors"
            >
              View Course
            </Link>
            <button
              type="button"
              onClick={onEnquire}
              className="flex-1 flex items-center justify-center py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
