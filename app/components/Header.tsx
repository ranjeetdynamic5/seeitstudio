"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import type { SanityCategory, SanityTrainingCategory } from "@/lib/sanity/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type DropdownItem = { label: string; href: string; description?: string };
type NavItem =
  | { label: string; href: string; dropdown?: never }
  | { label: string; href?: string; dropdown: DropdownItem[] };

// ─── Nav builder ──────────────────────────────────────────────────────────────

function buildNavItems(categories: SanityCategory[], trainingCategories: SanityTrainingCategory[]): NavItem[] {
  return [
    { label: "Home", href: "/" },
    {
      label: "Products",
      href: "/products",
      dropdown: categories.map((cat) => ({
        label: cat.title,
        href: `/products?category=${cat.slug}`,
      })),
    },
    { label: "Events", href: "/events" },
    {
      label: "Training",
      href: "/training",
      dropdown: [
        ...trainingCategories.map((c) => ({
          label: `${c.label} Training`,
          href: `/training/category/${c.slug}`,
        })),
        { label: "All Courses", href: "/training", description: "Browse the full course catalogue" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      dropdown: [
        { label: "3D Modelling", href: "/services/3d-modelling", description: "Precision modelling for any sector" },
        { label: "AI Consulting", href: "/services/ai-consulting", description: "Strategy & implementation" },
        { label: "Web Development", href: "/services/web-development", description: "Performant, modern web builds" },
      ],
    },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
}

// ─── Social links data ────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
];

// ─── Dropdown ─────────────────────────────────────────────────────────────────

function DropdownMenu({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
      <div className="p-1.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-[#f0f5fa] transition-colors group"
          >
            <span className="text-base font-medium text-[#0B0F19] group-hover:text-[#D9534F] transition-colors">
              {item.label}
            </span>
            {item.description && (
              <span className="text-sm text-[#64748B]">{item.description}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header({ categories = [], trainingCategories = [] }: { categories?: SanityCategory[]; trainingCategories?: SanityTrainingCategory[] }) {
  const NAV_ITEMS = buildNavItems(categories, trainingCategories);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const cartItems = useCartStore((state) => state.items);
  const cartCount = mounted
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* ── ROW 1: Top Bar ─────────────────────────────────────────────────────── */}
      <div className="hidden md:block bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">

            {/* Left: Contact */}
            <div className="flex items-center gap-6">
              <a
                href="tel:03331212187"
                className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0B0F19] transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0333 121 2187
              </a>
              <a
                href="mailto:jamesogston@seeit3d.co.uk"
                className="flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0B0F19] transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                jamesogston@seeit3d.co.uk
              </a>
            </div>

            {/* Center: Social icons */}
            <div className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-md text-[#64748B] hover:text-[#0B0F19] hover:bg-slate-200 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Right: Action buttons */}
            <div className="flex items-center gap-2">
              {[
                { label: "Support", href: "/contact" },
                { label: "Shop", href: "/shop" },
                { label: "Sign Up", href: "/signup" },
              ].map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  className="inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold text-white bg-[#D9534F] rounded-md hover:bg-[#c9302c] transition-colors"
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Main Navbar ──────────────────────────────────────────────────── */}
      <nav ref={navRef} className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center">
              <span className="text-white text-base font-bold tracking-tight">S</span>
            </div>
            <span className="text-[#0F172A] font-semibold text-xl tracking-tight">
              SeeIt Studio
            </span>
          </Link>

          {/* Desktop Nav — lg+ */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="relative">
                {item.dropdown ? (
                  <div className="flex items-center">
                    {/* Label — navigates to item.href */}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={`px-3 py-2.5 rounded-l-lg text-base font-medium transition-colors whitespace-nowrap ${
                          openDropdown === item.label
                            ? "text-[#0F172A] bg-[#f0f5fa]"
                            : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#f0f5fa]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className={`px-3 py-2.5 text-base font-medium whitespace-nowrap ${
                          openDropdown === item.label ? "text-[#0F172A]" : "text-[#64748B]"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                    {/* Chevron — toggles dropdown */}
                    <button
                      aria-label={`Toggle ${item.label} menu`}
                      aria-expanded={openDropdown === item.label}
                      className={`flex items-center px-1.5 py-2.5 rounded-r-lg transition-colors ${
                        openDropdown === item.label
                          ? "text-[#0F172A] bg-[#f0f5fa]"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#f0f5fa]"
                      }`}
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                    >
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#f0f5fa] transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )}
                {item.dropdown && (
                  <DropdownMenu items={item.dropdown} isOpen={openDropdown === item.label} />
                )}
              </li>
            ))}
          </ul>

          {/* Right: Cart + hamburger */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              aria-label="View cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#f0f5fa] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zm12.75 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#D9534F] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger — below lg */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#f0f5fa] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-0.5">

              {/* Mobile: top-bar contact row */}
              <div className="flex flex-wrap items-center gap-3 px-3 py-3 mb-1 border-b border-slate-100">
                <a href="tel:03331212187" className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  0333 121 2187
                </a>
                <a href="mailto:jamesogston@seeit3d.co.uk" className="flex items-center gap-2 text-sm font-medium text-[#64748B]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  jamesogston@seeit3d.co.uk
                </a>
              </div>

              {/* Nav items */}
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <>
                      <div className="flex items-center rounded-xl hover:bg-[#f0f5fa] transition-colors">
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex-1 px-4 py-3.5 text-base font-medium text-[#0B0F19]"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="flex-1 px-4 py-3.5 text-base font-medium text-[#0B0F19]">
                            {item.label}
                          </span>
                        )}
                        <button
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={mobileExpanded === item.label}
                          className="px-4 py-3.5"
                          onClick={() =>
                            setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                          }
                        >
                          <svg
                            className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                      </div>
                      {mobileExpanded === item.label && (
                        <div className="ml-4 mb-1 flex flex-col gap-0.5 border-l-2 border-slate-100 pl-4">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex flex-col gap-0.5 py-2.5 group"
                            >
                              <span className="text-sm font-medium text-[#0B0F19] group-hover:text-[#D9534F] transition-colors">
                                {sub.label}
                              </span>
                              {sub.description && (
                                <span className="text-xs text-[#64748B]">{sub.description}</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3.5 rounded-xl text-base font-medium text-[#0B0F19] hover:bg-[#f0f5fa] transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA buttons */}
              <div className="pt-3 mt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
                {[
                  { label: "Support", href: "/contact" },
                  { label: "Shop", href: "/shop" },
                  { label: "Sign Up", href: "/signup" },
                ].map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-xl hover:bg-[#c9302c] transition-colors"
                  >
                    {btn.label}
                  </a>
                ))}
              </div>

              {/* Mobile social row */}
              <div className="flex items-center justify-center gap-2 pt-3 pb-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-[#64748B] hover:text-[#0B0F19] hover:bg-slate-100 transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
