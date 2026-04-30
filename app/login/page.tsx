"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ADMIN_EMAILS = ["ranjeetdynamic2020@gmail.com"];

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.user) {
        const isAdmin = ADMIN_EMAILS.includes(data.user.email ?? "");
        router.push(isAdmin ? "/admin" : "/dashboard");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 inline-block mb-4">
          ← Back to Home
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl p-8 w-full max-w-sm"
        >
          <h2 className="text-lg font-semibold mb-4 text-center">Sign In</h2>

          {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative mb-1">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pr-10 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          <div className="text-right mb-3">
            <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-gray-900">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00334e] text-white py-3 rounded disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Login"}
          </button>

          <div className="my-4 flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full border border-gray-200 py-3 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Continue with Google
          </button>

          <p className="text-sm mt-4 text-center">
            <Link href="/signup" className="text-gray-500 hover:text-gray-900">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
