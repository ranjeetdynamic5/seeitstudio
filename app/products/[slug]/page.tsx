import { notFound } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import { getProductBySlug } from "@/lib/sanity/queries";
import type { SanityProduct } from "@/lib/sanity/types";
import StickyBar from "./StickyBar";
import AddToCartButton from "./AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  // ✅ FIX: unwrap params (Next.js latest)
  const { slug: slugParam } = await params;

  // ✅ FIX: handle string OR array
  const slug = Array.isArray(slugParam)
    ? slugParam[0]
    : slugParam;

  console.log("SLUG:", slug);

  // ✅ Fetch from Sanity
  const product: SanityProduct | null = await getProductBySlug(slug);

  console.log("PRODUCT:", product);

  // ✅ Not found handling
  if (!product) notFound();

  const categoryName = product?.category?.title || "General";

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B]">
              <Link href="/" className="hover:text-[#0B0F19]">Home</Link>
              <span>›</span>
              <Link href="/products" className="hover:text-[#0B0F19]">Products</Link>
              <span>›</span>
              <span className="text-[#0B0F19] font-medium">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Section */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Image */}
            <div className="bg-[#f0f5fa] rounded-xl flex items-center justify-center h-80">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-40 object-contain"
                />
              ) : (
                <span className="text-slate-400">No Image</span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">

              <span className="text-xs uppercase tracking-widest text-[#64748B]">
                {categoryName}
              </span>

              <h1 className="text-2xl font-bold text-[#0B0F19]">
                {product.name}
              </h1>

              <p className="text-[#64748B]">
                {product.description || "No description available"}
              </p>

              <div className="text-2xl font-semibold text-[#0F172A]">
                £{product.price?.toFixed(2)}
              </div>

              <AddToCartButton
                id={product.slug.current}
                name={product.name}
                price={product.price}
              />

            </div>
          </div>
        </div>

      </main>

      <Footer />

      <StickyBar
        id={product.slug.current}
        name={product.name}
        price={product.price}
      />
    </>
  );
}