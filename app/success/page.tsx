"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("orderId");
    const flag = sessionStorage.getItem("orderComplete");
    if (!id || !flag) {
      router.replace("/cart");
      return;
    }
    sessionStorage.removeItem("orderComplete");
    setOrderId(`#${id}`);
  }, [searchParams, router]);

  if (!orderId) return null;

  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-xl p-10 flex flex-col items-center text-center max-w-md w-full">

          {/* Check icon */}
          <div className="w-14 h-14 mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-semibold text-[#0B0F19] mb-1">Order placed successfully</h1>

          {/* Order ID */}
          <p className="text-sm text-[#64748B] mt-1 mb-5">
            Order ID:{" "}
            <span className="font-semibold text-[#0B0F19] tracking-wide">{orderId}</span>
          </p>

          <div className="w-full border-t border-slate-100 mb-5" />

          {/* Messages */}
          <p className="text-sm text-[#64748B] mb-1">A confirmation email has been sent.</p>
          <p className="text-sm text-[#64748B] mb-8">
            Need help?{" "}
            <Link href="/contact" className="text-[#D9534F] hover:underline">
              Contact support
            </Link>
          </p>

          {/* CTA */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
          >
            Continue Shopping
          </Link>

          <Link href="/" className="mt-4 text-sm text-[#64748B] hover:text-[#D9534F] transition-colors">
            Back to Home
          </Link>

        </div>
      </main>
      <Footer />
    </>
  );
}
