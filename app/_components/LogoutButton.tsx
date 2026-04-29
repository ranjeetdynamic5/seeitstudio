"use client";

import { signOut } from "@/app/actions/auth";

export function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        style={{
          fontSize: "14px",
          color: "#64748b",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Sign out
      </button>
    </form>
  );
}
