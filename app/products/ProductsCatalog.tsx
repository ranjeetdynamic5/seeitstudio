"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";
import type { SanityProduct, SanityCategory } from "../../lib/sanity/types";

type SortOption = "default" | "price-asc" | "price-desc";

function CatalogInner({
  products,
  categories,
}: {
  products: SanityProduct[];
  categories: SanityCategory[];
}) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const param = searchParams.get("category");
    if (!param) return "All";
    const match = categories.find((c) => c.slug.current === param.toLowerCase());
    return match ? match.title : "All";
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    let result =
      isSearching || activeCategory === "All"
        ? products
        : products.filter((p) => p.category.title === activeCategory);

    if (isSearching) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, activeCategory, search, sort, isSearching]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: products.length };
    for (const p of products) {
      map[p.category.title] = (map[p.category.title] ?? 0) + 1;
    }
    return map;
  }, [products]);

  return (
    <>
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
            <a href="/" className="hover:text-[#0B0F19] transition-colors">
              Home
            </a>
            <svg
              className="w-3.5 h-3.5 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            <span className="text-[#0B0F19] font-medium">Products</span>
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                All Products
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-xl">
                Professional software, extensions, and rendering tools —
                hand-picked for design professionals.
              </p>
            </div>
            <p className="text-sm text-[#64748B] shrink-0">
              <span className="font-semibold text-[#0B0F19]">
                {products.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* Search */}
          <div className="mt-5 relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
              />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-9 pr-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D9534F] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ── Category Filter Tabs ──────────────────────────────────────── */}
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity ${
            isSearching ? "opacity-40 pointer-events-none" : "opacity-100"
          }`}
        >
          <div
            className="flex items-center gap-1 overflow-x-auto pb-0 scrollbar-none"
            role="tablist"
            aria-label="Filter by category"
          >
            {[{ _id: "all", title: "All", slug: { current: "all" } }, ...categories].map((cat) => {
              const isActive = activeCategory === cat.title;
              return (
                <button
                  key={cat._id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.title)}
                  className={`
                    relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap
                    transition-colors border-b-2 -mb-px
                    ${
                      isActive
                        ? "border-[#D9534F] text-[#D9534F]"
                        : "border-transparent text-[#64748B] hover:text-[#0B0F19] hover:border-slate-300"
                    }
                  `}
                >
                  {cat.title}
                  <span
                    className={`
                      inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold
                      ${
                        isActive
                          ? "bg-[#D9534F] text-white"
                          : "bg-slate-100 text-[#64748B]"
                      }
                    `}
                  >
                    {counts[cat.title] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Product Grid ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Results bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <p className="text-sm text-[#64748B]">
            Showing{" "}
            <span className="font-semibold text-[#0B0F19]">
              {filtered.length}
            </span>
            {" "}of{" "}
            <span className="font-semibold text-[#0B0F19]">
              {products.length}
            </span>{" "}
            product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && (
              <>
                {" "}in{" "}
                <span className="font-semibold text-[#D9534F]">
                  {activeCategory}
                </span>
              </>
            )}
            {search.trim() && (
              <>
                {" "}matching{" "}
                <span className="font-semibold text-[#0B0F19]">
                  &ldquo;{search.trim()}&rdquo;
                </span>
              </>
            )}
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {(activeCategory !== "All" || search.trim()) && (
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearch("");
                  setSort("default");
                }}
                className="text-sm font-medium text-[#64748B] hover:text-[#D9534F] transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Grid — 1 col → 2 col sm → 3 col lg → 4 col xl */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
                />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#0B0F19] mb-1">
              No products found
            </p>
            <p className="text-sm text-[#64748B]">
              Try a different category or view all products.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              View all products
            </button>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
              Need help choosing?
            </p>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
              Speak with a product specialist
            </h2>
            <p className="text-sm text-slate-400 max-w-md">
              Not sure which software fits your workflow? Our team can recommend
              the right tools and arrange a demo.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:03331212187"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              0333 121 2187
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              Send an Enquiry
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProductsCatalog({
  products,
  categories,
}: {
  products: SanityProduct[];
  categories: SanityCategory[];
}) {
  return (
    <Suspense fallback={null}>
      <CatalogInner products={products} categories={categories} />
    </Suspense>
  );
}
