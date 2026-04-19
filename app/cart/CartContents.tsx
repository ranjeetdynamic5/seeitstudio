"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

export default function CartContents() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getShipping = useCartStore((state) => state.getShipping);
  const getTotal = useCartStore((state) => state.getTotal);

  const subtotal = mounted ? getSubtotal() : 0;
  const shipping = mounted ? getShipping() : 0;
  const total = mounted ? getTotal() : 0;

  return (
    <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Page heading */}
        <div className="mb-8">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
            <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-[#0B0F19] font-medium">Cart</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0B0F19]">Your Cart</h1>
        </div>

        {/* Wait for mount to avoid SSR mismatch */}
        {!mounted ? null : items.length === 0 ? (

          /* Empty state */
          <div className="bg-white rounded-2xl border border-slate-200 px-8 py-20 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-5 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 110-1.5.75.75 0 010 1.5zm12.75 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#0B0F19] mb-1">Your cart is empty</p>
            <p className="text-sm text-[#64748B] mb-6">Browse our products and add items to get started.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              Browse Products
            </Link>
          </div>

        ) : (

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Item list */}
            <div className="flex-1 flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-[#f0f5fa] flex items-center justify-center shrink-0">
                    <svg className="w-7 h-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0B0F19] leading-snug truncate">{item.name}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">£{item.price.toFixed(2)} each</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-200 text-[#64748B] hover:border-[#D9534F] hover:text-[#D9534F] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-[#0B0F19]">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 flex items-center justify-center rounded-md border border-slate-200 text-[#64748B] hover:border-[#D9534F] hover:text-[#D9534F] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-base font-semibold text-[#0B0F19] shrink-0 w-20 text-right">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-slate-300 hover:text-[#D9534F] transition-colors shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="self-start text-sm text-[#64748B] hover:text-[#D9534F] transition-colors mt-1"
              >
                Clear cart
              </button>
            </div>

            {/* Order summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4 sticky top-36">
                <h2 className="text-base font-semibold text-[#0B0F19]">Order Summary</h2>

                <div className="flex flex-col gap-2 text-sm text-[#64748B]">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="truncate pr-2">{item.name} ×{item.quantity}</span>
                      <span className="shrink-0 font-medium text-[#0B0F19]">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-3 flex flex-col gap-2 text-sm text-[#64748B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#0B0F19]">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-[#0B0F19]">
                      {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">Free shipping on orders over £50</p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-semibold text-[#0B0F19]">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
                >
                  Proceed to Checkout
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>

                <Link
                  href="/products"
                  className="text-center text-sm text-[#64748B] hover:text-[#D9534F] transition-colors"
                >
                  Continue shopping
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
