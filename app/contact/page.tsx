"use client";

import { useState } from "react";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type SubmitStatus = "idle" | "submitted";

// ── Contact info ─────────────────────────────────────────────────────────────

const CONTACT_DETAILS = [
  {
    label: "Phone",
    value: "0333 121 2187",
    href: "tel:03331212187",
    description: "Mon – Fri, 9am – 5:30pm",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "jamesogston@seeit3d.co.uk",
    href: "mailto:jamesogston@seeit3d.co.uk",
    description: "We reply within 1 business day",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "United Kingdom",
    href: null,
    description: "Remote & on-site projects welcome",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const TRUST_POINTS = [
  "No obligation",
  "Response within 1 business day",
  "UK-based team",
  "Free initial consultation",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitted");
  }

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-[#0B0F19] font-medium">Contact</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="max-w-xl">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                  Contact Us
                </h1>
                <p className="mt-3 text-base text-[#64748B]">
                  Let&apos;s discuss your project. Whether you have a brief ready or just want to
                  explore what&apos;s possible, we&apos;re happy to talk.
                </p>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 shrink-0">
                {TRUST_POINTS.map((point) => (
                  <div key={point} className="flex items-center gap-1.5 text-sm text-[#64748B]">
                    <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── Left: contact info ──────────────────────────────────────── */}
            <aside className="flex flex-col gap-5">

              {/* Contact cards */}
              {CONTACT_DETAILS.map((item) => (
                <div
                  key={item.label}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-[#0B0F19] hover:text-[#D9534F] transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[#0B0F19]">{item.value}</p>
                    )}
                    <p className="text-xs text-[#64748B] mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}

              {/* Urgent help card */}
              <div className="bg-[#0F172A] rounded-xl p-5">
                <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                  Need urgent help?
                </p>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  For time-sensitive enquiries, call us directly and we&apos;ll do our best to help straight away.
                </p>
                <a
                  href="tel:03331212187"
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Call Now — 0333 121 2187
                </a>
              </div>
            </aside>

            {/* ── Right: contact form ─────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">

                {/* Form header */}
                <div className="bg-[#0F172A] px-6 py-6">
                  <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-1.5">
                    Get in touch
                  </p>
                  <h2 className="text-lg font-semibold text-white">
                    Send us a message
                  </h2>
                </div>

                <div className="p-6 sm:p-8">
                  {status === "submitted" ? (
                    /* ── Success state ── */
                    <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                        <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[#0B0F19] mb-1">Message received</p>
                        <p className="text-sm text-[#64748B] max-w-xs">
                          Thanks for getting in touch. We&apos;ll come back to you within 1 business day.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setForm({ name: "", email: "", phone: "", message: "" }); setStatus("idle"); }}
                        className="mt-2 px-5 py-2.5 text-sm font-semibold text-[#64748B] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    /* ── Form ── */
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="name" className="text-sm font-medium text-[#0B0F19]">
                            Full Name <span className="text-[#D9534F]">*</span>
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Jane Smith"
                            className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                          />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="email" className="text-sm font-medium text-[#0B0F19]">
                            Email Address <span className="text-[#D9534F]">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jane@studio.com"
                            className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-sm font-medium text-[#0B0F19]">
                          Phone Number
                          <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+44 7700 900000"
                          className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="message" className="text-sm font-medium text-[#0B0F19]">
                          Message <span className="text-[#D9534F]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project — what you need, your timeline, and any other relevant details."
                          className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400 resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                        <p className="text-xs text-[#64748B]">
                          <span className="text-[#D9534F]">*</span> Required fields. We never share your details.
                        </p>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors shrink-0"
                        >
                          Send Message
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Explore what we do
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Not sure which service you need?
              </h2>
              <p className="text-sm text-slate-400 max-w-md">
                Browse our services and products — or just call and we&apos;ll point you in the right direction.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                View Services
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
