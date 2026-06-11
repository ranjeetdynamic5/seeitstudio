"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/supabase";
import { useCartStore } from "@/lib/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const href = `/products/${product.slug}`;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image_url: product.image_url ?? null,
    });
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAdded(false);
      timerRef.current = null;
    }, 1800);
  }

  const platform = (product as any).platform;

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">

      {/* Image */}
      <Link href={href} className="relative block w-full overflow-hidden bg-[#f1f3f5]" style={{ height: '200px' }}>
        {product.is_on_sale && product.discount_percent != null && (
          <span className="absolute top-3 left-3 z-10 bg-[#f0a500] text-[#092145] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-[0_2px_8px_rgba(240,165,0,0.35)]">
            {product.discount_percent}% OFF
          </span>
        )}
        {product.image_url ? (
          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Dark bottom section */}
      <div className="flex flex-col flex-1 bg-[#092145] p-4 gap-3">

        {/* Title + platform icons */}
        <div className="flex items-start justify-between gap-2">
          <Link href={href} className="text-base font-semibold text-white leading-snug hover:text-[#0066FF] transition-colors line-clamp-2">
            {product.title}
          </Link>

          {platform && platform !== 'none' && (
            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
              {(platform === 'windows' || platform === 'both') && (
                <div className="group/win relative">
                  <svg className="w-4 h-4 text-white/40 hover:text-[#0066FF] transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                  </svg>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#092145] text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/win:opacity-100 transition-opacity pointer-events-none z-50">
                    Windows
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                  </div>
                </div>
              )}
              {(platform === 'mac' || platform === 'both') && (
                <div className="group/mac relative">
                  <svg className="w-4 h-4 text-white/40 hover:text-white transition-colors cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#092145] text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/mac:opacity-100 transition-opacity pointer-events-none z-50">
                    Mac
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-white/[0.08]">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase tracking-wide">From</span>
            {product.is_on_sale && product.original_price != null ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white">£{product.price?.toFixed(2) || "0.00"}</span>
                <span className="text-xs text-white/40 line-through">£{product.original_price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-white">£{product.price?.toFixed(2) || "0.00"}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              added ? "bg-green-500 text-white" : "bg-[#0066FF] text-white hover:bg-[#0052cc]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}