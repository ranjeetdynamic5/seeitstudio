import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProducts } from "@/lib/supabase";

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

      {products.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Title
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Sale
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Added
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 sm:px-6 py-3">
                      <span className="font-medium text-gray-900">
                        {product.title}
                      </span>
                      {product.offer_text && (
                        <span className="block text-xs text-gray-400 mt-0.5">
                          {product.offer_text}
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                      {product.is_on_sale && product.original_price ? (
                        <>
                          <span className="line-through text-gray-400 mr-1">
                            £{Number(product.original_price).toFixed(2)}
                          </span>
                          <span className="font-medium">
                            £{Number(product.price).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>£{Number(product.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      {product.is_on_sale ? (
                        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Sale
                        </span>
                      ) : (
                        <span className="text-gray-400">&mdash;</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(product.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-10 text-center">
          <p className="text-sm text-gray-500">No products yet.</p>
        </div>
      )}
    </main>
  );
}
