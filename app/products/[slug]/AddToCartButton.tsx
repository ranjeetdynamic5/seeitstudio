"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";

type Props = {
  id: string;
  name: string;
  price: number;
};

export default function AddToCartButton({ id, name, price }: Props) {
  const addToCart = useCartStore((s) => s.addToCart);
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleAddToCart() {
    addToCart({ id, name, price });
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAdded(false);
      timerRef.current = null;
    }, 1800);
  }

  function handleBuyNow() {
    addToCart({ id, name, price });
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Buy Now */}
      <button
        type="button"
        onClick={handleBuyNow}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#D9534F] rounded-xl hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zm12.75 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
        Buy Now
      </button>

      {/* Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl transition-colors ${
          added
            ? "bg-green-600 text-white"
            : "bg-white text-[#0B0F19] border border-slate-200 hover:bg-[#f0f5fa] hover:border-slate-300 active:bg-slate-100"
        }`}
      >
        {added ? (
          <>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Added to Cart
          </>
        ) : (
          <>
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </div>
  );
}
