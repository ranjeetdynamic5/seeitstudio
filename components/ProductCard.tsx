"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/lib/supabase";
import { useCartStore } from "@/lib/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const href = `/products/${product.slug}`;

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
    <div
      className="relative overflow-hidden h-80 bg-white border border-[#e8e8e8] rounded-2xl shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)] transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image layer */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? -20 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {product.is_on_sale && product.discount_percent != null && (
          <div className="absolute top-0 left-0 w-28 h-28 overflow-hidden z-10 pointer-events-none">
            <div
              className="absolute top-5 -left-7 w-36 text-center bg-[#1d1d1f] text-white text-[10px] font-semibold tracking-wide py-1.5"
              style={{ transform: "rotate(-45deg)" }}
            >
              {product.discount_percent}% OFF
            </div>
          </div>
        )}
        <div className="relative w-full h-full bg-white">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain p-5"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-10 h-10 text-[#e8e8e8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
              </svg>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-[#111111] px-5 py-3">
            <p className="text-[13px] font-medium text-white/85 line-clamp-1">{product.title}</p>
          </div>
        </div>
      </motion.div>

      {/* Content layer */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 gap-2 bg-white"
      >
        <Link
          href={href}
          className="text-[15px] font-medium text-[#1d1d1f] leading-snug line-clamp-2 text-center hover:text-[#6b7280] transition-colors"
        >
          {product.title}
        </Link>

        {product.is_on_sale && product.offer_text && (
          <p className="text-xs text-[#6b7280] font-medium">{product.offer_text}</p>
        )}

        <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2 text-center">
          {product.description
            ? product.description.replace(/#{1,6}\s/g, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/\n/g, ' ').trim()
            : "No description available"}
        </p>

        <div className="pt-3 border-t border-[#ebebeb] flex flex-col gap-2.5 w-full">
          {product.is_on_sale && product.original_price != null ? (
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-2xl font-semibold text-[#1d1d1f]">
                £{product.price?.toFixed(2) || "0.00"}
              </span>
              <span className="text-sm text-[#6b7280]/50 line-through">
                £{product.original_price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-semibold text-[#1d1d1f]">
              £{product.price?.toFixed(2) || "0.00"}
            </span>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              added
                ? "bg-green-600 text-white"
                : "bg-[#1d1d1f] text-white hover:bg-[#3a3a3c] active:bg-[#3a3a3c]"
            }`}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
