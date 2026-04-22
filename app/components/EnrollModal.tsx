"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function EnrollModal({ isOpen, onClose, courseTitle }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  function reset() {
    setName("");
    setEmail("");
    setPhone("");
    setStatus("idle");
    setErrorMsg("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, courseTitle }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Submission failed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enroll-modal-title"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-1">Enrolment</p>
            <h2 id="enroll-modal-title" className="text-lg font-bold text-[#0B0F19] leading-snug">
              {courseTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={reset}
            aria-label="Close"
            className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-[#64748B] hover:text-[#0B0F19] hover:bg-[#f0f5fa] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div>
              <p className="text-base font-semibold text-[#0B0F19] mb-1">Enrolment received</p>
              <p className="text-sm text-[#64748B]">Thank you, {name}. We will be in touch shortly to confirm your place.</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="enroll-name" className="text-sm font-medium text-[#0B0F19]">Full name</label>
              <input
                id="enroll-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="px-4 py-2.5 text-sm text-[#0B0F19] border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="enroll-email" className="text-sm font-medium text-[#0B0F19]">Email address</label>
              <input
                id="enroll-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="px-4 py-2.5 text-sm text-[#0B0F19] border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="enroll-phone" className="text-sm font-medium text-[#0B0F19]">Phone number</label>
              <input
                id="enroll-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 7700 900000"
                className="px-4 py-2.5 text-sm text-[#0B0F19] border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-400"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-rose-600">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === "submitting" ? "Submitting…" : "Enroll Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
