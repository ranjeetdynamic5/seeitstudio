"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";

type Props = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
};

export default function StickyBar({ id, name, price, originalPrice }: Props) {
  const [visible, setVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAddToCart() {
    addToCart({ id, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addToCart({ id, name, price });
    router.push("/checkout");
  }

  return (
    <div
      aria-hidden={!visible}
      className={`
        fixed bottom-0 left-0 right-0 z-40
        bg-white border-t border-slate-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]
        transition-transform duration-300 ease-in-out
        ${visible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Product info */}
        <div className="hidden sm:flex flex-col min-w-0">
          <span className="text-sm font-semibold text-[#0B0F19] truncate">{name}</span>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#0F172A]">£{price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-sm text-[#64748B] line-through">£{originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Mobile: price only */}
        <div className="sm:hidden flex items-baseline gap-2">
          <span className="text-base font-bold text-[#0F172A]">£{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-[#64748B] line-through">£{originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              added
                ? "bg-green-600 text-white"
                : "text-[#0B0F19] bg-white border border-slate-200 hover:bg-[#f0f5fa]"
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {added
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              }
            </svg>
            <span className="hidden sm:inline">{added ? "Added" : "Add to Cart"}</span>
            <span className="sm:hidden">{added ? "✓" : "Cart"}</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zm12.75 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
