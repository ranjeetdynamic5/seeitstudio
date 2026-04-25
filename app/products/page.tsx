import { Suspense } from "react";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import { getProducts } from "../../lib/supabase";
import ProductsCatalog from "./ProductsCatalog";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <Suspense fallback={null}>
          <ProductsCatalog products={products} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
