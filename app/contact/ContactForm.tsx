"use client";

import { useState } from "react";

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

export default function ContactForm() {
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

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
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
                  <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-[#0B0F19] mb-1">Thank you. Your enquiry has been received.</p>
                  <p className="text-sm text-[#64748B] max-w-xs">
                    We will get back to you within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ fullName: "", company: "", email: "", phone: "", inquiryType: "", message: "", hearAboutUs: [] });
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
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-sm font-medium text-[#0B0F19]">
                      Full Name <span className="text-[#D9534F]">*</span>
                    </label>
                    <input
                      id="fullName" name="fullName" type="text" required autoComplete="name"
                      value={form.fullName} onChange={handleChange} placeholder="Jane Smith"
                      className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-[#0B0F19]">
                      Company <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                    </label>
                    <input
                      id="company" name="company" type="text" autoComplete="organization"
                      value={form.company} onChange={handleChange} placeholder="Smith Architecture Ltd"
                      className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-[#0B0F19]">
                      Email Address <span className="text-[#D9534F]">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required autoComplete="email"
                      value={form.email} onChange={handleChange} placeholder="jane@studio.com"
                      className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-[#0B0F19]">
                      Phone Number <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" autoComplete="tel"
                      value={form.phone} onChange={handleChange} placeholder="+44 7700 900000"
                      className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="inquiryType" className="text-sm font-medium text-[#0B0F19]">
                    Nature of Enquiry <span className="text-[#D9534F]">*</span>
                  </label>
                  <select
                    id="inquiryType" name="inquiryType" required
                    value={form.inquiryType} onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors"
                  >
                    <option value="">Select an option</option>
                    {INQUIRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-[#0B0F19]">
                    Additional Comments
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Please provide any additional details about your enquiry..."
                    className="w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium text-[#0B0F19]">Where did you hear about us?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {HEAR_ABOUT_OPTIONS.map((option) => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
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
                  <span className="text-[#D9534F]">*</span> Required fields. We process your data in accordance with UK GDPR.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
