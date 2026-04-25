"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Product } from "@/lib/supabase";
import { useCartStore } from "@/lib/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const href = `/products/${product.id}`;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
    });

    setAdded(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setAdded(false);
      timerRef.current = null;
    }, 1800);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

      {/* Thumbnail */}
      <Link
        href={href}
        className="relative bg-[#f0f5fa] h-44 sm:h-40 lg:h-44 flex items-center justify-center border-b border-slate-100 hover:bg-[#e8eef5] transition-colors"
      >
        {product.is_on_sale && product.discount_percent != null && (
          <span className="absolute top-2 left-2 bg-[#D9534F] text-white text-xs font-semibold px-2 py-0.5 rounded">
            {product.discount_percent}% OFF
          </span>
        )}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="max-h-16 max-w-[70%] object-contain"
          />
        ) : (
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
          </svg>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <Link
          href={href}
          className="text-sm font-semibold text-[#0B0F19] leading-snug line-clamp-2 hover:text-[#D9534F] transition-colors"
        >
          {product.title}
        </Link>

        {product.is_on_sale && product.offer_text && (
          <p className="text-xs text-[#D9534F] font-medium">{product.offer_text}</p>
        )}

        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 flex-1">
          {product.description || "No description available"}
        </p>

        {/* Price + CTA */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          {product.is_on_sale && product.original_price != null ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#0F172A]">
                £{product.price?.toFixed(2) || "0.00"}
              </span>
              <span className="text-sm text-[#94A3B8] line-through">
                £{product.original_price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-[#0F172A]">
              £{product.price?.toFixed(2) || "0.00"}
            </span>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#D9534F] text-white hover:bg-[#c9302c] active:bg-[#b02a29]"
            }`}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
