"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cartStore";

export default function Navbar() {
  // ✅ Mounted guard (VERY IMPORTANT)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItems = useCartStore((state) => state.items);

  let cartCount = 0;
  if (mounted) {
    cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log("[Navbar] cartItems:", cartItems, "| count:", cartCount);
  }

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          SeeIt Studio
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/training">Training</Link>
          <Link href="/events">Events</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Cart */}
        <div className="relative">
          <Link href="/cart" className="text-xl">
            🛒
          </Link>

          {/* ✅ Render badge ONLY after mount */}
          {mounted && cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </div>

      </div>
    </header>
  );
}