import { Suspense } from "react";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import { getAllProducts, getAllCategories } from "../../lib/sanity/queries";
import ProductsCatalog from "./ProductsCatalog";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        <Suspense fallback={null}>
          <ProductsCatalog products={products} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
