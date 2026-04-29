"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!toastVisible) return;
    const t = setTimeout(() => setToastVisible(false), 2000);
    return () => clearTimeout(t);
  }, [toastVisible]);

  async function handleSignOut() {
    setLoading(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    setLoading(false);
    setToastVisible(true);
    setTimeout(() => router.replace("/login"), 1200);
  }

  return (
    <>
      {toastVisible && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-lg bg-green-600 text-white">
          Signed out successfully.
        </div>
      )}
      <button
        onClick={handleSignOut}
        disabled={loading}
        style={{
          fontSize: "14px",
          color: "#64748b",
          background: "none",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          padding: 0,
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Signing out…" : "Sign out"}
      </button>
    </>
  );
}
