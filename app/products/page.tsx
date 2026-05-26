import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import { getProducts } from "../../lib/supabase";
import ProductsCatalog from "./ProductsCatalog";

export const metadata: Metadata = {
  title: "Products — SketchUp Extensions & Design Software UK | Seeit Studio",
  description:
    "Browse SketchUp extensions, rendering software, AI tools and design licences from Seeit Studio. Authorised UK reseller with competitive pricing.",
  alternates: {
    canonical: "https://seeitstudio.com/products",
  },
  openGraph: {
    title: "Products — SketchUp Extensions & Design Software UK | Seeit Studio",
    description:
      "Browse SketchUp extensions, rendering software, AI tools and design licences from Seeit Studio. Authorised UK reseller with competitive pricing.",
    url: "https://seeitstudio.com/products",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <ProductsCatalog products={products} />
      </main>
      <Footer />
    </>
  );
}