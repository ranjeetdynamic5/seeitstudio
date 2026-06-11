"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product, ProductCategory } from "../../lib/supabase";

type SortOption = "default" | "price-asc" | "price-desc" | "latest";

const ITEMS_PER_PAGE = 12;

const SORT_LABELS: Record<SortOption, string> = {
  default: "Default",
  latest: "Latest",
  "price-asc": "Price: Low–High",
  "price-desc": "Price: High–Low",
};

function CategoryDropdown({
  categories,
  selected,
  onChange,
}: {
  categories: ProductCategory[];
  selected: number[];
  onChange: (ids: number[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (id: number) => {
    onChange(selected.includes(id) ? selected.filter(c => c !== id) : [...selected, id]);
  };

  const label = selected.length === 0 ? "Category" : `Category (${selected.length})`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
          selected.length > 0
            ? "border-[#0066FF] text-[#0066FF] bg-blue-50"
            : "border-slate-200 text-[#64748B] bg-white hover:border-[#0066FF] hover:text-[#0066FF]"
        }`}
      >
        {label}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5">
          <button
            onClick={() => { onChange([]); setOpen(false); }}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
              selected.length === 0 ? "text-[#0066FF] font-medium bg-blue-50" : "text-[#64748B] hover:bg-slate-50"
            }`}
          >
            <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
              selected.length === 0 ? "bg-[#0066FF] border-[#0066FF]" : "border-slate-300"
            }`}>
              {selected.length === 0 && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </span>
            All Categories
          </button>

          <div className="h-px bg-slate-100 my-1" />

          {categories.map(cat => {
            const isChecked = selected.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                  isChecked ? "text-[#0066FF] font-medium bg-blue-50" : "text-[#64748B] hover:bg-slate-50"
                }`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                  isChecked ? "bg-[#0066FF] border-[#0066FF]" : "border-slate-300"
                }`}>
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                {cat.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
          value !== "default"
            ? "border-[#092145] text-[#092145] bg-slate-50"
            : "border-slate-200 text-[#64748B] bg-white hover:border-[#092145] hover:text-[#092145]"
        }`}
      >
        Sort: {SORT_LABELS[value]}
        <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5">
          {(Object.keys(SORT_LABELS) as SortOption[]).map(option => (
            <button
              key={option}
              onClick={() => { onChange(option); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                value === option ? "text-[#092145] font-semibold bg-slate-50" : "text-[#64748B] hover:bg-slate-50"
              }`}
            >
              {SORT_LABELS[option]}
              {value === option && (
                <svg className="w-4 h-4 text-[#092145]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CatalogInner({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const clearAll = () => {
    setSearch("");
    setSelectedCategories([]);
    setSort("default");
    setOnSaleOnly(false);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategories.length > 0) {
      result = result.filter((p) => p.category_id != null && selectedCategories.includes(p.category_id as number));
    }

    if (onSaleOnly) {
      result = result.filter((p) => p.is_on_sale === true);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "latest") result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return result;
  }, [products, search, sort, selectedCategories, onSaleOnly]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handleSearch = (val: string) => { setSearch(val); setCurrentPage(1); };
  const handleSort = (val: SortOption) => { setSort(val); setCurrentPage(1); };
  const handleCategories = (ids: number[]) => { setSelectedCategories(ids); setCurrentPage(1); };
  const handleOnSale = () => { setOnSaleOnly(o => !o); setCurrentPage(1); };

  const hasActiveFilters = search.trim() || selectedCategories.length > 0 || sort !== "default" || onSaleOnly;

  return (
    <>
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
            <a href="/" className="hover:text-[#092145] transition-colors">Home</a>
            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-[#092145] font-medium">Products</span>
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#092145]">
                All Products
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#64748B] max-w-xl">
                Professional software, extensions, and rendering tools — hand-picked for design professionals.
              </p>
            </div>
            <p className="text-sm text-[#64748B] shrink-0">
              <span className="font-semibold text-[#092145]">{products.length}</span> products
            </p>
          </div>

          {/* Search + Filters */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full pl-9 pr-4 py-2 text-sm text-[#1d1d1f] bg-white border border-[#e8e8e8] rounded-lg outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-blue-50 transition-colors placeholder:text-[#6b7280]"
              />
              {search && (
                <button onClick={() => handleSearch("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1d1d1f] transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <CategoryDropdown
                categories={categories}
                selected={selectedCategories}
                onChange={handleCategories}
              />

              {/* On Sale toggle */}
              <button
                onClick={handleOnSale}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  onSaleOnly
                    ? "border-[#f0a500] text-[#092145] bg-amber-50"
                    : "border-slate-200 text-[#64748B] bg-white hover:border-[#f0a500] hover:text-[#092145]"
                }`}
              >
                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                  onSaleOnly ? "bg-[#f0a500] border-[#f0a500]" : "border-slate-300"
                }`}>
                  {onSaleOnly && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </span>
                On Sale
              </button>

              <SortDropdown value={sort} onChange={handleSort} />

              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-sm font-medium text-[#6b7280] hover:text-[#092145] transition-colors px-2 py-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <p className="text-sm text-[#64748B]">
            Showing{" "}
            <span className="font-semibold text-[#092145]">
              {filtered.length === 0 ? 0 : Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of <span className="font-semibold text-[#092145]">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
            {search.trim() && (
              <> matching <span className="font-semibold text-[#092145]">&ldquo;{search.trim()}&rdquo;</span></>
            )}
          </p>
        </div>

        {paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const isActive = page === currentPage;
                  const show = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  const showEllipsisBefore = page === currentPage - 2 && page > 2;
                  const showEllipsisAfter = page === currentPage + 2 && page < totalPages - 1;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return <span key={page} className="px-1 text-slate-400">…</span>;
                  }
                  if (!show) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#0066FF] text-white"
                          : "border border-slate-200 text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 text-[#64748B] hover:border-[#0066FF] hover:text-[#0066FF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#092145] mb-1">No products found</p>
            <p className="text-sm text-[#64748B]">Try a different search term or filter.</p>
            <button
              onClick={clearAll}
              className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors"
            >
              View all products
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#092145] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.18em] mb-2">Need help choosing?</p>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">Speak with a product specialist</h2>
            <p className="text-sm text-slate-400 max-w-md">Not sure which software fits your workflow? Our team can recommend the right tools and arrange a demo.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="tel:03331212187" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#092145] bg-white rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              0333 121 2187
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#0066FF] rounded-lg hover:bg-[#0052cc] transition-colors">
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
  products: Product[];
  categories: ProductCategory[];
}) {
  return <CatalogInner products={products} categories={categories} />;
}