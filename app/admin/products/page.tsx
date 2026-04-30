import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProducts } from "@/lib/supabase";
import ProductsManager from "@/components/ProductsManager";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "ranjeetdynamic5@gmail.com")
  .split(",")
  .map((e) => e.trim());

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {}
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) {
    redirect("/dashboard");
  }

  const products = await getProducts();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Products
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>
      <ProductsManager initialProducts={products} />
    </main>
  );
}
