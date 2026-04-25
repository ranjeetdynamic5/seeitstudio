"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: string;
  message: string;
  hearAboutUs: string[];
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "",
  message: "",
  hearAboutUs: [],
};

const HEAR_ABOUT_OPTIONS = ["Google", "LinkedIn", "Referral", "Social Media", "Other"];

const inputClass =
  "w-full px-4 py-3 text-sm text-[#0B0F19] bg-white border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (value: string) => {
    setForm((prev) => {
      const exists = prev.hearAboutUs.includes(value);
      return {
        ...prev,
        hearAboutUs: exists
          ? prev.hearAboutUs.filter((v) => v !== value)
          : [...prev.hearAboutUs, value],
      };
    });
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setStep(1);
    setStatus("idle");
  };

  const handleSubmit = async () => {
    setStatus("loading");

    const { error } = await supabase.from("leads").insert([{
      full_name: form.fullName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      inquiry_type: form.inquiryType,
      message: form.message,
      source: form.hearAboutUs.join(", "),
      status: "new",
    }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      setStatus("error");
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-10 flex flex-col items-center text-center gap-6">
          <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#0B0F19] mb-1">Enquiry Received</h3>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
              Thank you, {form.fullName.split(" ")[0]}. We&apos;ll be in touch within one business day.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 text-sm font-semibold text-[#64748B] border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

      {/* Step indicator */}
      <div className="flex border-b border-slate-200">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${
              step === s
                ? "text-[#D9534F] border-b-2 border-[#D9534F]"
                : "text-[#64748B]"
            }`}
          >
            Step {s} — {s === 1 ? "Your Details" : "Your Enquiry"}
          </div>
        ))}
      </div>

      <div className="p-6 sm:p-8">

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#D9534F]">*</span>
                </label>
                <input
                  name="fullName"
                  placeholder="Jane Smith"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#D9534F]">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="jane@studio.co.uk"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+44 7700 000000"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                  Company
                </label>
                <input
                  name="company"
                  placeholder="Your Studio Ltd"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!form.fullName || !form.email}
              className="w-full py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                Enquiry Type
              </label>
              <select
                name="inquiryType"
                value={form.inquiryType}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select an enquiry type</option>
                <option value="Products">Products &amp; Software</option>
                <option value="Training">Training Courses</option>
                <option value="Services">Services &amp; Consulting</option>
                <option value="General">General Enquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us about your project or question..."
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={inputClass}
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2.5">
                How did you hear about us?
              </p>
              <div className="flex flex-wrap gap-3">
                {HEAR_ABOUT_OPTIONS.map((item) => (
                  <label key={item} className="flex items-center gap-2 text-sm text-[#0B0F19] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hearAboutUs.includes(item)}
                      onChange={() => handleCheckbox(item)}
                      className="w-4 h-4 accent-[#D9534F]"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2.5 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                Something went wrong. Please try again or call us on 0333 121 2187.
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                disabled={status === "loading"}
                className="flex-1 py-3 text-sm font-semibold text-[#64748B] border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                className="flex-1 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Enquiry"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
