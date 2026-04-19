"use client";

import { useEffect, useRef, useState } from "react";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<FormFields>;

const EMPTY: FormFields = { name: "", email: "", phone: "", message: "" };

function validate(f: FormFields): FormErrors {
  const e: FormErrors = {};
  if (!f.name.trim()) e.name = "Name is required.";
  if (!f.email.trim()) {
    e.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    e.email = "Enter a valid email address.";
  }
  if (!f.phone.trim()) e.phone = "Phone number is required.";
  if (!f.message.trim()) e.message = "Please add a message.";
  return e;
}

type Props = {
  isOpen: boolean;
  courseTitle: string;
  onClose: () => void;
};

export default function EnquiryModal({ isOpen, courseTitle, onClose }: Props) {
  const [form, setForm] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset state each time the modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY);
      setErrors({});
      setSubmitted(false);
      setTimeout(() => firstFieldRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    console.log("Enquiry submitted:", { course: courseTitle, ...form });
    setSubmitted(true);
  }

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Enquire about ${courseTitle}`}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-slate-400 hover:text-[#D9534F] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          /* ── Success state ── */
          <div className="flex flex-col items-center text-center py-4 gap-4">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-[#0B0F19]">Enquiry sent</h2>
            <p className="text-sm text-[#64748B]">
              Thank you, our team will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <>
            <h2 className="text-base font-semibold text-[#0B0F19] mb-1">Enquire about this course</h2>
            <p className="text-sm text-[#64748B] mb-6 line-clamp-1">{courseTitle}</p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Field
                ref={firstFieldRef}
                label="Full Name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                error={errors.phone}
                onChange={handleChange}
              />

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#374151] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Any questions or preferred dates…"
                  className={`w-full px-3.5 py-2.5 text-sm text-[#0B0F19] bg-white border rounded-lg outline-none resize-none transition-colors placeholder:text-slate-300
                    ${errors.message
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50"
                    }`}
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors mt-1"
              >
                Send Enquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── Field sub-component ───────────────────────────────────────────────────────

import { forwardRef } from "react";

type FieldProps = {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, name, type, autoComplete, value, error, onChange }, ref) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#374151] mb-1.5">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`w-full px-3.5 py-2.5 text-sm text-[#0B0F19] bg-white border rounded-lg outline-none transition-colors placeholder:text-slate-300
          ${error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50"
          }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
);
Field.displayName = "Field";
