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

const PAYMENT_OPTIONS = [
  "Credit / Debit Card",
  "Bank Transfer",
  "PayPal",
  "Invoice",
];

type FormState = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  hearAboutUs: string[];
  otherInfo: string;
  registeredUsername: string;
  softwareProduct: string;
  serialNumbers: string;
  operatingSystem: string[];
  paymentMethod: string;
  newsletter: string;
};

const INITIAL: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  inquiryType: "",
  message: "",
  hearAboutUs: [],
  otherInfo: "",
  registeredUsername: "",
  softwareProduct: "",
  serialNumbers: "",
  operatingSystem: [],
  paymentMethod: "",
  newsletter: "",
};

const INPUT =
  "w-full px-4 py-2.5 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400";

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function toggleArray(field: "hearAboutUs" | "operatingSystem", value: string) {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return {
        ...prev,
        [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  }

  function handleNext() {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email address.";
    if (!form.inquiryType) errs.inquiryType = "Please select a nature of enquiry.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  }

  async function handleSubmit() {
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

  function reset() {
    setForm(INITIAL);
    setErrors({});
    setStep(1);
    setStatus("idle");
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
                  <p className="text-base font-semibold text-[#0B0F19] mb-1">
                    Thank you. Your enquiry has been received.
                  </p>
                  <p className="text-sm text-[#64748B] max-w-xs">
                    We will get back to you within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 px-5 py-2.5 text-sm font-semibold text-[#64748B] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* ── Step Indicator ─────────────────────────── */}
                <div className="flex items-center mb-8">
                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-[#D9534F]">
                      {step > 1 ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : "1"}
                    </div>
                    <span className="text-xs font-medium text-[#0B0F19]">Step 1</span>
                  </div>

                  <div className="flex-1 mx-3 mb-4 relative h-px bg-slate-200">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#D9534F] transition-all duration-500"
                      style={{ width: step > 1 ? "100%" : "0%" }}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${step >= 2 ? "bg-[#D9534F]" : "bg-slate-300"}`}>
                      2
                    </div>
                    <span className={`text-xs font-medium ${step >= 2 ? "text-[#0B0F19]" : "text-[#64748B]"}`}>
                      Step 2
                    </span>
                  </div>

                  <p className="ml-4 text-xs text-[#64748B] max-w-[150px] leading-snug hidden sm:block">
                    For software purchase / upgrades, complete Step 2
                  </p>
                </div>

                {/* ── Step 1 ─────────────────────────────────── */}
                {step === 1 && (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="fullName" className="text-sm font-medium text-[#0B0F19]">
                          Full Name <span className="text-[#D9534F]">*</span>
                        </label>
                        <input
                          id="fullName" name="fullName" type="text" autoComplete="name"
                          value={form.fullName} onChange={handleChange} placeholder="Jane Smith"
                          className={`${INPUT} ${errors.fullName ? "border-red-400" : ""}`}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500">{errors.fullName}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="text-sm font-medium text-[#0B0F19]">
                          Company{" "}
                          <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                        </label>
                        <input
                          id="company" name="company" type="text" autoComplete="organization"
                          value={form.company} onChange={handleChange} placeholder="Smith Architecture Ltd"
                          className={INPUT}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-[#0B0F19]">
                          Email Address <span className="text-[#D9534F]">*</span>
                        </label>
                        <input
                          id="email" name="email" type="email" autoComplete="email"
                          value={form.email} onChange={handleChange} placeholder="jane@studio.com"
                          className={`${INPUT} ${errors.email ? "border-red-400" : ""}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-sm font-medium text-[#0B0F19]">
                          Phone Number{" "}
                          <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                        </label>
                        <input
                          id="phone" name="phone" type="tel" autoComplete="tel"
                          value={form.phone} onChange={handleChange} placeholder="+44 7700 900000"
                          className={INPUT}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="inquiryType" className="text-sm font-medium text-[#0B0F19]">
                        Nature of Enquiry <span className="text-[#D9534F]">*</span>
                      </label>
                      <select
                        id="inquiryType" name="inquiryType"
                        value={form.inquiryType} onChange={handleChange}
                        className={`${INPUT} ${errors.inquiryType ? "border-red-400" : ""}`}
                      >
                        <option value="">Select an option</option>
                        {INQUIRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.inquiryType && (
                        <p className="text-xs text-red-500">{errors.inquiryType}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-medium text-[#0B0F19]">
                        Additional Comments
                      </label>
                      <textarea
                        id="message" name="message" rows={4}
                        value={form.message} onChange={handleChange}
                        placeholder="Please provide any additional details about your enquiry..."
                        className={`${INPUT} resize-none`}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-[#0B0F19]">
                        Where did you hear about us?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {HEAR_ABOUT_OPTIONS.map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={form.hearAboutUs.includes(option)}
                              onChange={() => toggleArray("hearAboutUs", option)}
                              className="w-4 h-4 rounded border-slate-300 text-[#D9534F] focus:ring-[#D9534F] cursor-pointer"
                            />
                            <span className="text-sm text-[#64748B] group-hover:text-[#0B0F19] transition-colors">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="otherInfo" className="text-sm font-medium text-[#0B0F19]">
                        Anything else you&apos;d like to add?{" "}
                        <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                      </label>
                      <input
                        id="otherInfo" name="otherInfo" type="text"
                        value={form.otherInfo} onChange={handleChange}
                        placeholder="Any other relevant information..."
                        className={INPUT}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
                    >
                      Next
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>

                    <p className="text-xs text-[#64748B] text-center">
                      <span className="text-[#D9534F]">*</span> Required fields. We process your data in accordance with UK GDPR.
                    </p>
                  </div>
                )}

                {/* ── Step 2 ─────────────────────────────────── */}
                {step === 2 && (
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="registeredUsername" className="text-sm font-medium text-[#0B0F19]">
                        Registered Username{" "}
                        <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                      </label>
                      <input
                        id="registeredUsername" name="registeredUsername" type="text"
                        value={form.registeredUsername} onChange={handleChange}
                        placeholder="Your existing account username"
                        className={INPUT}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="softwareProduct" className="text-sm font-medium text-[#0B0F19]">
                        Software Product{" "}
                        <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                      </label>
                      <input
                        id="softwareProduct" name="softwareProduct" type="text"
                        value={form.softwareProduct} onChange={handleChange}
                        placeholder="e.g. SketchUp Pro, V-Ray, Enscape..."
                        className={INPUT}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="serialNumbers" className="text-sm font-medium text-[#0B0F19]">
                        Existing Software Serial Numbers{" "}
                        <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                      </label>
                      <textarea
                        id="serialNumbers" name="serialNumbers" rows={3}
                        value={form.serialNumbers} onChange={handleChange}
                        placeholder="Enter your serial numbers, one per line..."
                        className={`${INPUT} resize-none`}
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-[#0B0F19]">Computer Operating System</p>
                      <div className="flex gap-8">
                        {["Windows", "Mac"].map((os) => (
                          <label key={os} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={form.operatingSystem.includes(os)}
                              onChange={() => toggleArray("operatingSystem", os)}
                              className="w-4 h-4 rounded border-slate-300 text-[#D9534F] focus:ring-[#D9534F] cursor-pointer"
                            />
                            <span className="text-sm text-[#64748B] group-hover:text-[#0B0F19] transition-colors">
                              {os}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="paymentMethod" className="text-sm font-medium text-[#0B0F19]">
                        Method of Payment{" "}
                        <span className="ml-1.5 text-xs font-normal text-[#64748B]">(optional)</span>
                      </label>
                      <select
                        id="paymentMethod" name="paymentMethod"
                        value={form.paymentMethod} onChange={handleChange}
                        className={INPUT}
                      >
                        <option value="">Select a payment method</option>
                        {PAYMENT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-3">
                      <p className="text-sm font-medium text-[#0B0F19]">OPT-IN to Newsletter</p>
                      <div className="flex gap-8">
                        {["Yes", "No"].map((val) => (
                          <label key={val} className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="newsletter"
                              value={val}
                              checked={form.newsletter === val}
                              onChange={handleChange}
                              className="w-4 h-4 border-slate-300 text-[#D9534F] focus:ring-[#D9534F] cursor-pointer"
                            />
                            <span className="text-sm text-[#64748B] group-hover:text-[#0B0F19] transition-colors">
                              {val}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* reCAPTCHA placeholder */}
                    <div className="border border-slate-200 rounded-lg px-4 py-3 flex items-center gap-4 bg-slate-50">
                      <div className="w-5 h-5 border-2 border-slate-300 rounded flex-shrink-0" />
                      <span className="text-sm text-[#64748B] flex-1">I&apos;m not a robot</span>
                      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                        <div className="w-10 h-10 bg-slate-200 rounded" />
                        <span className="text-[10px] text-slate-400 leading-tight">reCAPTCHA</span>
                        <span className="text-[9px] text-slate-400 leading-tight">Privacy · Terms</span>
                      </div>
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-500 text-center">
                        Something went wrong. Please try again or email us directly.
                      </p>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-[#0B0F19] bg-slate-100 rounded-lg hover:bg-slate-200 active:bg-slate-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] disabled:opacity-60 transition-colors"
                      >
                        {status === "loading" ? "Sending…" : "Send"}
                      </button>
                    </div>

                    <p className="text-xs text-[#64748B] text-center">
                      We process your data in accordance with UK GDPR.
                    </p>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
