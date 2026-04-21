"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getTrainingCategories } from "@/lib/sanity/queries";

type Category = {
  _id?: string;
  title?: string;
  slug?: string;
};

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getTrainingCategories();

      // ✅ remove duplicates (important)
      const unique = data.filter(
        (cat: Category, index: number, self: Category[]) =>
          index === self.findIndex((c) => c.slug === cat.slug)
      );

      setCategories(unique);
    }

    fetchCategories();
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          Seelt Studio
        </Link>

        {/* Menu */}
        <nav className="flex gap-6 items-center">
          
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/events">Events</Link>

          {/* 🔥 TRAINING DROPDOWN */}
          <div className="relative group">
            <span className="cursor-pointer font-medium">
              Training ▾
            </span>

            <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
              
              {/* Categories */}
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/training/category/${cat.slug}`}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    {/* ✅ FIXED HERE */}
                    {cat?.title || "Training"}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">
                  No categories
                </div>
              )}

              {/* Divider */}
              <div className="border-t" />

              {/* All Courses */}
              <Link
                href="/training"
                className="block px-4 py-3 font-semibold hover:bg-gray-100"
              >
                All Courses →
              </Link>
            </div>
          </div>

          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}