"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

const INQUIRY_OPTIONS = [
  "General Enquiry",
  "Software Purchase",
  "Licence Upgrade",
  "Training & Courses",
  "Technical Support",
  "Partnership",
];

const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Social Media",
  "Referral / Word of mouth",
  "Email Newsletter",
  "Trade Show / Event",
  "Other",
];

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  hearAboutUs: string[];
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    hearAboutUs: [],
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCheckbox(value: string) {
    setForm((prev) => ({
      ...prev,
      hearAboutUs: prev.hearAboutUs.includes(value)
        ? prev.hearAboutUs.filter((v) => v !== value)
        : [...prev.hearAboutUs, value],
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
        <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
          <Image
            src="/hero/Arch-banner.webp"
            alt="Contact Seelt3D"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Contact
            </h1>
            <nav className="flex items-center gap-2 text-sm text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white">Contact</span>
            </nav>
          </div>
        </section>

        {/* ── 2. INTRO SECTION ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left: Image */}
            <div className="relative h-[300px] sm:h-[420px] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/hero/webservices.webp"
                alt="Seelt3D workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                  Get in touch
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] tracking-tight mb-4">
                  Get in Touch with Seelt3D
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed mb-3">
                  Whether you have a project in mind, need advice on software licensing, or want to
                  discuss training options for your team, we&apos;re here to help. Our UK-based team
                  responds within one business day.
                </p>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  We work with architects, interior designers, product studios, and engineering
                  firms across the UK. Reach out and let&apos;s discuss how we can support your practice.
                </p>
              </div>

              {/* GDPR Notice */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-[#0B0F19] mb-1.5">
                  Privacy Notice (GDPR Compliance)
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Your personal data will be processed in accordance with UK GDPR. We use your
                  information solely to respond to your enquiry and will not share it with third
                  parties without your consent. You may withdraw consent at any time by contacting
                  us at{" "}
                  <a
                    href="mailto:jamesogston@seeit3d.co.uk"
                    className="text-[#D9534F] hover:underline"
                  >
                    jamesogston@seeit3d.co.uk
                  </a>
                  .
                </p>
              </div>

              {/* Newsletter CTA */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
              >
                Click here to OPT-IN to receive our newsletter
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. SALES SECTION ────────────────────────────────────────────────── */}
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              {/* Left: Text */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                    Software &amp; Licences
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] tracking-tight mb-4">
                    Buy Software or Upgrade Licences
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    As an authorised UK reseller for SketchUp, V-Ray, Enscape, and more, we offer
                    competitive pricing on new licences and straightforward licence upgrades.
                    Purchase directly or speak with our team for volume or subscription options.
                  </p>
                </div>
                <div>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
                  >
                    Order Now
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
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative h-[280px] sm:h-[360px] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/hero/SKP_2026.webp"
                  alt="SketchUp 2026"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. CONTACT FORM SECTION ─────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">

              <div className="bg-[#0F172A] px-6 sm:px-8 py-6">
                <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-1.5">
                  Contact Form
                </p>
                <h2 className="text-lg font-semibold text-white">Send us a message</h2>
              </div>

              <div className="p-6 sm:p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#0B0F19] mb-1">Message received</p>
                      <p className="text-sm text-[#64748B] max-w-xs">
                        Thank you for contacting us. We&apos;ll respond within 1 business day.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setForm({
                          fullName: "",
                          company: "",
                          email: "",
                          phone: "",
                          inquiryType: "",
                          message: "",
                          hearAboutUs: [],
                        });
                        setStatus("idle");
                      }}
                      className="mt-2 px-5 py-2.5 text-sm font-semibold text-[#64748B] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-sm font-medium text-[#0B0F19]">
                          Full Name <span className="text-[#D9534F]">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                        />
                      </div>

                      {/* Company */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="text-sm font-medium text-[#0B0F19]">
                          Company
                          <span className="ml-1.5 text-xs font-normal text-[#64748B]">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Smith Architecture Ltd"
                          className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                      {/* Phone */}
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-sm font-medium text-[#0B0F19]">
                          Phone Number
                          <span className="ml-1.5 text-xs font-normal text-[#64748B]">
                            (optional)
                          </span>
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
                    </div>

                    {/* Nature of Enquiry */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inquiryType" className="text-sm font-medium text-[#0B0F19]">
                        Nature of Enquiry <span className="text-[#D9534F]">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        required
                        value={form.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors"
                      >
                        <option value="">Select an option</option>
                        {INQUIRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Additional Comments */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-[#0B0F19]">
                        Additional Comments
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Please provide any additional details about your enquiry..."
                        className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    {/* Where did you hear about us */}
                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-[#0B0F19]">
                        Where did you hear about us?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {HEAR_ABOUT_OPTIONS.map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={form.hearAboutUs.includes(option)}
                              onChange={() => handleCheckbox(option)}
                              className="w-4 h-4 rounded border-slate-300 text-[#D9534F] focus:ring-[#D9534F] cursor-pointer"
                            />
                            <span className="text-sm text-[#64748B] group-hover:text-[#0B0F19] transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] disabled:opacity-60 transition-colors"
                    >
                      {status === "loading" ? "Sending…" : "Next"}
                    </button>

                    {status === "error" && (
                      <p className="text-xs text-red-500 text-center">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <p className="text-xs text-[#64748B] text-center">
                      <span className="text-[#D9534F]">*</span> Required fields. We process your
                      data in accordance with UK GDPR.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. NEWSLETTER SECTION ───────────────────────────────────────────── */}
        <section className="bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Newsletter
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Join To Get Our Newsletter
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Stay up to date with the latest software releases, training events, and industry news.
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
            >
              Subscribe Now
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
