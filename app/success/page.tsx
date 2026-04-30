"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function SuccessPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [orderEmail, setOrderEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");

    if (!id) {
      window.location.href = "/";
      return;
    }

    setOrderId(`#${id}`);

    const email = sessionStorage.getItem("orderEmail") ?? "";
    setOrderEmail(email);

    getSupabase()
      .auth.getUser()
      .then(({ data: { user } }) => {
        setIsLoggedIn(!!user);
      });
  }, []);

  async function handleCreateAccount(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (createPassword.length < 6) {
      setCreateError("Password must be at least 6 characters.");
      return;
    }
    if (createPassword !== confirmPassword) {
      setCreateError("Passwords do not match.");
      return;
    }
    setCreateLoading(true);
    setCreateError(null);
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signUp({
      email: orderEmail,
      password: createPassword,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      if (
        error.message.toLowerCase().includes("already registered") ||
        error.message.toLowerCase().includes("already exists") ||
        error.code === "user_already_exists"
      ) {
        setEmailAlreadyRegistered(true);
      } else {
        setCreateError(error.message);
      }
      setCreateLoading(false);
      return;
    }
    // Supabase may return a user without error for existing emails (no-op confirmation flow)
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setEmailAlreadyRegistered(true);
      setCreateLoading(false);
      return;
    }
    if (data.user) {
      await supabase
        .from("profiles")
        .upsert({ id: data.user.id, email: data.user.email, role: "user" }, { onConflict: "id" });
      setCreateSuccess(true);
      setTimeout(() => router.push("/dashboard"), 2000);
    }
    setCreateLoading(false);
  }

  async function handleLogin(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email: orderEmail,
      password: loginPassword,
    });
    if (error) {
      setLoginError(error.message);
      setLoginLoading(false);
      return;
    }
    router.push("/dashboard");
  }

  if (!orderId) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="bg-white p-10 rounded-xl shadow-md text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          ✅ Order Successful
        </h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase!
        </p>
        <p className="font-semibold text-lg mb-6">{orderId}</p>

        <a
          href="/products"
          className="inline-block px-6 py-3 bg-[#D9534F] text-white rounded-lg hover:bg-[#c9302c]"
        >
          Continue Shopping
        </a>

        {isLoggedIn === false && orderEmail && !createSuccess && (
          <div className="mt-8 pt-8 border-t border-slate-200 text-left">
            <h2 className="text-base font-semibold text-[#0B0F19] mb-1">
              Track your order
            </h2>
            <p className="text-sm text-[#64748B] mb-4">
              Create an account to view your order history and track future purchases.
            </p>

            {!emailAlreadyRegistered ? (
              <form onSubmit={handleCreateAccount} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={orderEmail}
                  readOnly
                  className="w-full px-3.5 py-2.5 text-sm text-[#64748B] bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
                <input
                  type="password"
                  placeholder="Choose a password (min. 6 characters)"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={createLoading}
                  className="w-full px-3.5 py-2.5 text-sm text-[#0B0F19] border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-300"
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={createLoading}
                  className="w-full px-3.5 py-2.5 text-sm text-[#0B0F19] border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-300"
                />
                {createError && <p className="text-xs text-red-500">{createError}</p>}
                <button
                  type="submit"
                  disabled={createLoading}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-60 transition-colors"
                >
                  {createLoading ? "Creating account…" : "Create Account"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <p className="text-sm text-[#64748B] px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                  This email is already registered. Please log in to track your order.
                </p>
                <input
                  type="email"
                  value={orderEmail}
                  readOnly
                  className="w-full px-3.5 py-2.5 text-sm text-[#64748B] bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
                <input
                  type="password"
                  placeholder="Your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  disabled={loginLoading}
                  className="w-full px-3.5 py-2.5 text-sm text-[#0B0F19] border border-slate-200 rounded-lg outline-none focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50 transition-colors placeholder:text-slate-300"
                />
                {loginError && <p className="text-xs text-red-500">{loginError}</p>}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-60 transition-colors"
                >
                  {loginLoading ? "Logging in…" : "Login"}
                </button>
              </form>
            )}
          </div>
        )}

        {createSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              Account created! Redirecting to your dashboard…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
