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

  console.log("PRODUCTS DATA:", products); // 👈 DEBUG

  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
        
        {/* 🔥 TEMP DEBUG UI */}
        <div className="p-6">
          <h2 className="text-lg font-bold mb-2">Debug Products:</h2>
          {products.length === 0 ? (
            <p>No products found ❌</p>
          ) : (
            products.map((p) => (
              <p key={p._id}>✅ {p.name}</p>
            ))
          )}
        </div>

        {/* ORIGINAL COMPONENT */}
        <Suspense fallback={null}>
          <ProductsCatalog products={products} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}