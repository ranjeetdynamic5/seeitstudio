import Link from "next/link";
import NavHeader from "../../components/NavHeader";
import Footer from "../../components/Footer";

export default function ProductNotFound() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
              />
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#0B0F19] tracking-tight mb-2">
            Product not found
          </h1>
          <p className="text-sm text-[#64748B] leading-relaxed mb-8">
            The product you&apos;re looking for doesn&apos;t exist or may have been removed.
            Browse our full catalogue to find what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-xl hover:bg-[#c9302c] transition-colors"
            >
              Browse all products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-white border border-slate-200 rounded-xl hover:bg-[#f0f5fa] transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
