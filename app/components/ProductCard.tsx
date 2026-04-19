"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { SanityProduct } from "@/lib/sanity/types";
import { useCartStore } from "@/lib/cartStore";

export default function ProductCard({ product }: { product: SanityProduct }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slug = product?.slug?.current;
  const href = slug ? `/products/${slug}` : "#";

  const categoryLabel = product?.category?.title || "Uncategorised";
  const title = product?.name || "Untitled Product";

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();

    if (!slug) return;

    addToCart({
      id: slug,
      name: title,
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
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold text-white bg-[#D9534F] rounded-full">
            {product.badge}
          </span>
        )}

        {product.image ? (
          <img
            src={product.image}
            alt={title}
            className="max-h-16 max-w-[70%] object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-300">
            <span className="text-xs font-medium text-slate-400">
              {categoryLabel}
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest mb-1.5">
            {categoryLabel}
          </p>

          <Link
            href={href}
            className="text-sm font-semibold text-[#0B0F19] leading-snug line-clamp-2 hover:text-[#D9534F] transition-colors"
          >
            {title}
          </Link>
        </div>

        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2 flex-1">
          {product.description || "No description available"}
        </p>

        {/* Price + CTA */}
        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-[#0F172A]">
              £{product.price?.toFixed(2) || "0.00"}
            </span>
          </div>

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