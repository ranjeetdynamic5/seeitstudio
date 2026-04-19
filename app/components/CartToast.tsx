"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

export default function CartToast() {
  const items = useCartStore((state) => state.items);
  const [visible, setVisible] = useState(false);
  const [lastName, setLastName] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevCountRef = useRef(0);

  const count = items.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    // Only trigger when count increases (item added)
    if (count > prevCountRef.current) {
      // Find the item whose quantity just changed or was added
      const last = items[items.length - 1];
      if (last) setLastName(last.name);

      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        timerRef.current = null;
      }, 2500);
    }
    prevCountRef.current = count;
  }, [count, items]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-3 bg-[#0F172A] text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg whitespace-nowrap">
        <span className="flex items-center justify-center w-5 h-5 bg-green-500 rounded-full shrink-0">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <span>
          <span className="font-semibold">{lastName}</span> added to cart
        </span>
        <Link href="/cart" className="ml-1 text-[#D9534F] hover:underline font-semibold shrink-0">
          View cart
        </Link>
      </div>
    </div>
  );
}
