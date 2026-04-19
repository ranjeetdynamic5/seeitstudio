"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

// ── Types & data ──────────────────────────────────────────────────────────────

type Category = "SketchUp" | "Rendering" | "AI" | "Web Design";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
  image: string;
};

const POSTS: Post[] = [
  {
    slug: "sketchup-tips-for-architects",
    title: "10 SketchUp Tips Every Architect Should Know",
    excerpt:
      "From component libraries to section planes, these workflow shortcuts will save you hours on every project.",
    category: "SketchUp",
    date: "2026-03-28",
    readTime: "5 min read",
    image: "/blog/sketchup-tips.jpg",
  },
  {
    slug: "vray-lighting-guide",
    title: "A Practical Guide to V-Ray Lighting in SketchUp",
    excerpt:
      "Natural light, artificial sources, and HDRI environments — learn how to set up lighting that makes your renders look convincing.",
    category: "Rendering",
    date: "2026-03-14",
    readTime: "7 min read",
    image: "/blog/vray-lighting.jpg",
  },
  {
    slug: "ai-tools-for-design-studios",
    title: "How Design Studios Are Using AI in 2026",
    excerpt:
      "From automated briefs to generative concept sketches, here's how forward-thinking studios are integrating AI into their workflows.",
    category: "AI",
    date: "2026-02-27",
    readTime: "6 min read",
    image: "/blog/ai-design.jpg",
  },
  {
    slug: "sketchup-layout-construction-docs",
    title: "Using LayOut to Produce Professional Construction Documents",
    excerpt:
      "LayOut is one of SketchUp's most underused tools. This guide walks through how to produce clean, dimensioned drawings for planning and construction.",
    category: "SketchUp",
    date: "2026-02-12",
    readTime: "8 min read",
    image: "/blog/layout-docs.jpg",
  },
  {
    slug: "d5-render-vs-enscape",
    title: "D5 Render vs Enscape: Which Is Right for Your Studio?",
    excerpt:
      "Both are real-time rendering tools, but they suit different workflows. We compare features, speed, and output quality to help you decide.",
    category: "Rendering",
    date: "2026-01-30",
    readTime: "5 min read",
    image: "/blog/d5-vs-enscape.jpg",
  },
  {
    slug: "website-for-architecture-studio",
    title: "What Makes a Great Architecture Studio Website in 2026",
    excerpt:
      "Portfolio presentation, load speed, and enquiry conversion — the benchmarks that separate effective studio websites from average ones.",
    category: "Web Design",
    date: "2026-01-15",
    readTime: "4 min read",
    image: "/blog/arch-website.jpg",
  },
  {
    slug: "chatgpt-for-design-briefs",
    title: "Using ChatGPT to Write Better Design Briefs",
    excerpt:
      "AI won't replace the designer, but it can sharpen the brief. Here's a practical approach to using language models at the start of a project.",
    category: "AI",
    date: "2025-12-18",
    readTime: "4 min read",
    image: "/blog/chatgpt-briefs.jpg",
  },
  {
    slug: "sketchup-extensions-workflow",
    title: "The Best SketchUp Extensions for a Faster Workflow",
    excerpt:
      "FlexTools, Skalp, and the mind.sight.studios pack can transform how quickly you work. Here's how to combine them effectively.",
    category: "SketchUp",
    date: "2025-11-22",
    readTime: "6 min read",
    image: "/blog/extensions.jpg",
  },
];

const CATEGORIES: Array<{ value: Category | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "SketchUp", label: "SketchUp" },
  { value: "Rendering", label: "Rendering" },
  { value: "AI", label: "AI" },
  { value: "Web Design", label: "Web Design" },
];

const CATEGORY_COLORS: Record<Category, string> = {
  SketchUp: "text-blue-700 bg-blue-50",
  Rendering: "text-amber-700 bg-amber-50",
  AI: "text-violet-700 bg-violet-50",
  "Web Design": "text-emerald-700 bg-emerald-50",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Placeholder image component ───────────────────────────────────────────────

function PostImage({ category }: { category: Category }) {
  const bg: Record<Category, string> = {
    SketchUp: "from-blue-900 to-slate-800",
    Rendering: "from-amber-900 to-slate-800",
    AI: "from-violet-900 to-slate-800",
    "Web Design": "from-emerald-900 to-slate-800",
  };
  return (
    <div className={`w-full h-44 bg-gradient-to-br ${bg[category]} flex items-center justify-center`}>
      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${CATEGORY_COLORS[category]}`}>
        {category}
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    let result = activeCategory === "all" ? POSTS : POSTS.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  const counts: Record<string, number> = { all: POSTS.length };
  for (const p of POSTS) counts[p.category] = (counts[p.category] ?? 0) + 1;

  function clearFilters() {
    setSearch("");
    setActiveCategory("all");
  }

  return (
    <>
      <NavHeader />

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
              <span className="text-[#0B0F19] font-medium">Blog</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                  Insights & Resources
                </h1>
                <p className="mt-2 text-base text-[#64748B] max-w-xl">
                  Practical guides, software tips, and industry perspectives for design and
                  architecture professionals.
                </p>
              </div>
              <p className="text-sm text-[#64748B] shrink-0">
                <span className="font-semibold text-[#0B0F19]">{filtered.length}</span> article{filtered.length !== 1 ? "s" : ""}
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
                placeholder="Search articles..."
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
          </div>

          {/* ── Category tab bar ─────────────────────────────────────────────── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none" role="tablist" aria-label="Filter by category">
              {CATEGORIES.map((tab) => {
                const isActive = tab.value === activeCategory;
                const count = counts[tab.value === "all" ? "all" : tab.value] ?? 0;
                return (
                  <button
                    key={tab.value}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(tab.value)}
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

        {/* ── Blog grid ─────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                >
                  {/* Image */}
                  <PostImage category={post.category} />

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    {/* Meta */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[post.category]}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-[#64748B]">{post.readTime}</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h2 className="text-sm font-semibold text-[#0B0F19] leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between gap-2">
                      <time className="text-xs text-[#64748B]">{formatDate(post.date)}</time>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9534F] hover:text-[#c9302c] transition-colors"
                      >
                        Read Article
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-[#0B0F19] mb-1">No articles found</p>
              <p className="text-sm text-[#64748B] mb-6 max-w-xs">
                {search.trim() && activeCategory !== "all"
                  ? <>No results for <span className="font-medium text-[#0B0F19]">&ldquo;{search.trim()}&rdquo;</span> in <span className="font-medium text-[#0B0F19]">{activeCategory}</span>.</>
                  : search.trim()
                  ? <>No results for <span className="font-medium text-[#0B0F19]">&ldquo;{search.trim()}&rdquo;</span>.</>
                  : <>No articles in this category yet.</>
                }
                {" "}Try a different keyword or clear filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
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
                Stay up to date
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Want to learn more?
              </h2>
              <p className="text-sm text-slate-400 max-w-md">
                Explore our training courses or get in touch to discuss your software and workflow needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/training"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                View Training
              </Link>
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

      <Footer />
    </>
  );
}
