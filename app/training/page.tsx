"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import EnquiryModal from "@/app/components/EnquiryModal";
import { TRAINING_CATEGORIES, paramToLabel } from "@/lib/trainingCategories";

// ── Types & data ──────────────────────────────────────────────────────────────

type Course = {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  format: "Online" | "In-Person" | "Hybrid";
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  price: number;
};

const COURSES: Course[] = [
  {
    id: "sketchup-beginners",
    category: "SketchUp",
    title: "SketchUp for Beginners",
    description:
      "Learn the fundamentals of 3D modelling in SketchUp. Covers navigation, push-pull geometry, groups, and components — ideal for those new to the software.",
    duration: "1 day",
    format: "Online",
    level: "Beginner",
    price: 195.00,
  },
  {
    id: "sketchup-pro-advanced",
    category: "SketchUp",
    title: "SketchUp Pro: Advanced Modelling",
    description:
      "Take your SketchUp skills further with advanced geometry, LayOut for construction documents, dynamic components, and professional presentation workflows.",
    duration: "2 days",
    format: "Online",
    level: "Advanced",
    price: 345.00,
  },
  {
    id: "sketchup-interior-design",
    category: "SketchUp",
    title: "SketchUp for Interior Design",
    description:
      "Purpose-built for interior designers. Learn how to model spaces, apply materials, set up scenes, and produce client-ready visuals using SketchUp and LayOut.",
    duration: "1 day",
    format: "Hybrid",
    level: "Intermediate",
    price: 245.00,
  },
  {
    id: "vray-sketchup-training",
    category: "Rendering",
    title: "V-Ray for SketchUp: Essentials",
    description:
      "Master physically accurate rendering with V-Ray. Covers lighting setup, material creation, camera settings, and producing high-quality images for client presentations.",
    duration: "1 day",
    format: "Online",
    level: "Intermediate",
    price: 275.00,
  },
  {
    id: "d5-render-training",
    category: "Rendering",
    title: "D5 Render: Real-Time Visualisation",
    description:
      "Learn D5 Render from scratch. Live sync with SketchUp, asset library, material editing, lighting, and producing 4K stills and walkthrough animations.",
    duration: "1 day",
    format: "Online",
    level: "All Levels",
    price: 245.00,
  },
  {
    id: "layout-training",
    category: "SketchUp",
    title: "LayOut for Construction Documents",
    description:
      "Produce professional 2D drawings, dimensions, and annotations directly from your SketchUp models using LayOut. Covers viewports, title blocks, and PDF export.",
    duration: "1 day",
    format: "Online",
    level: "Intermediate",
    price: 195.00,
  },
  {
    id: "enscape-training",
    category: "Rendering",
    title: "Enscape: Real-Time Rendering",
    description:
      "Get up to speed with Enscape quickly. Covers the interface, lighting, materials, VR export, and standalone walkthrough creation for client presentations.",
    duration: "Half day",
    format: "Online",
    level: "Beginner",
    price: 145.00,
  },
  {
    id: "sketchup-extensions-training",
    category: "Extensions",
    title: "SketchUp Extensions Masterclass",
    description:
      "Hands-on training covering the most productive SketchUp extensions: FlexTools, Skalp, mind.sight.studios pack, and the Extension Warehouse. Maximise your workflow.",
    duration: "1 day",
    format: "Online",
    level: "Intermediate",
    price: 225.00,
  },
];

const LEVEL_COLORS: Record<Course["level"], string> = {
  Beginner: "text-emerald-700 bg-emerald-50",
  Intermediate: "text-amber-700 bg-amber-50",
  Advanced: "text-rose-700 bg-rose-50",
  "All Levels": "text-blue-700 bg-blue-50",
};

const FORMAT_LABEL: Record<Course["format"], string> = {
  Online: "Online",
  "In-Person": "In Person",
  Hybrid: "Hybrid",
};

// Pre-compute counts once (keyed by TRAINING_CATEGORIES label)
const COUNTS: Record<string, number> = { all: COURSES.length };
for (const c of COURSES) {
  COUNTS[c.category] = (COUNTS[c.category] ?? 0) + 1;
}

// ── Inner catalog (uses useSearchParams — must be inside Suspense) ────────────

function TrainingCatalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const param = searchParams.get("category")?.toLowerCase() ?? "";
  const activeCategory = paramToLabel(param);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filtered = useMemo(() => {
    let result = activeCategory
      ? COURSES.filter((c) => c.category === activeCategory)
      : COURSES;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((c) => c.title.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, search]);

  function selectTab(tabParam: string | null) {
    router.push(tabParam ? `/training?category=${tabParam}` : "/training");
  }

  function openEnquiry(course: Course) {
    setSelectedCourse(course);
    setModalOpen(true);
  }

  function closeEnquiry() {
    setModalOpen(false);
  }

  return (
    <>
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header ──────────────────────────────────────────────────── */}
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

            {/* Trust bar */}
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

          {/* ── Category tab bar ─────────────────────────────────────────────── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="flex items-center gap-1 overflow-x-auto scrollbar-none"
              role="tablist"
              aria-label="Filter by category"
            >
              {TRAINING_CATEGORIES.map((tab) => {
                const isAll = tab.value === "all";
                const isActive = isAll ? !activeCategory : tab.label === activeCategory;
                const count = isAll ? COUNTS.all : (COUNTS[tab.label] ?? 0);
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

        {/* ── Course grid ──────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnquire={() => openEnquiry(course)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
                </svg>
              </div>

              <p className="text-base font-semibold text-[#0B0F19] mb-1">No courses found</p>

              {/* Dynamic message */}
              <p className="text-sm text-[#64748B] mb-6 max-w-xs">
                {search.trim() && activeCategory
                  ? <>No results for <span className="font-medium text-[#0B0F19]">&ldquo;{search.trim()}&rdquo;</span> in <span className="font-medium text-[#0B0F19]">{activeCategory}</span>.</>
                  : search.trim()
                  ? <>No results for <span className="font-medium text-[#0B0F19]">&ldquo;{search.trim()}&rdquo;</span>.</>
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

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Bespoke training
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Need training for your team?
              </h2>
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
        courseTitle={selectedCourse?.title ?? ""}
        onClose={closeEnquiry}
      />
    </>
  );
}

// ── Page shell ────────────────────────────────────────────────────────────────

export default function TrainingPage() {
  return (
    <>
      <NavHeader />
      <Suspense fallback={null}>
        <TrainingCatalog />
      </Suspense>
      <Footer />
    </>
  );
}

// ── CourseCard ────────────────────────────────────────────────────────────────

function CourseCard({ course, onEnquire }: { course: Course; onEnquire: () => void }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* Header */}
      <div className="bg-[#0F172A] px-5 py-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1.5">
            {course.category}
          </p>
          <h3 className="text-sm font-semibold text-white leading-snug">{course.title}</h3>
        </div>
        <span className={`shrink-0 px-2.5 py-1 text-xs font-semibold rounded-full ${LEVEL_COLORS[course.level]}`}>
          {course.level}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">{course.description}</p>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2.5">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
                </svg>
              ),
              label: FORMAT_LABEL[course.format],
            },
          ].map((meta, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#f0f5fa] rounded-lg px-3 py-2.5">
              <span className="text-[#64748B] shrink-0">{meta.icon}</span>
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
          <button
            type="button"
            onClick={onEnquire}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
