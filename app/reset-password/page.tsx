"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

export default function ResetPasswordPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { flowType: "implicit" } }
  );

  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      setError("Invalid or expired reset link");
      return;
    }

    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const type = params.get("type");

    if (!access_token || !refresh_token || type !== "recovery") {
      setError("Invalid or expired reset link");
      return;
    }

    supabase.auth.setSession({ access_token, refresh_token }).then(({ error }) => {
      if (error) {
        setError(error.message);
      } else {
        setReady(true);
      }
    });
  }, []);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("Password updated successfully");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <div className="bg-white border rounded-xl p-8 w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">Reset Password</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        {ready && (
          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="New password"
              className="w-full mb-3 p-3 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="w-full bg-[#00334e] text-white py-3 rounded">
              Update Password
            </button>
          </form>
        )}
      </div>
    </main>
  );
}