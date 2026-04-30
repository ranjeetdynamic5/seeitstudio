"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { flowType: "implicit" } }
  );

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Reset link sent. Check your email.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white border rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-3 p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00334e] text-white py-3 rounded"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && (
          <p className="text-sm mt-3 text-center text-gray-600">
            {message}
          </p>
        )}

        <Link href="/login" className="block mt-4 text-sm text-center text-gray-500">
          Back to Login
        </Link>
      </div>
    </main>
  );
}