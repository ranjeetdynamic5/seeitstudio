import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getProducts } from "@/lib/supabase";
import Link from "next/link";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "ranjeetdynamic5@gmail.com")
  .split(",")
  .map((e) => e.trim());

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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

  const [{ data: recentOrders }, { count: ordersCount }, products] =
    await Promise.all([
      supabase
        .from("orders")
        .select("id, order_id, customer_name, customer_email, total_amount, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase.from("orders").select("id", { count: "exact", head: true }),
      getProducts(),
    ]);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">
            {ordersCount ?? 0}
          </p>
          <Link
            href="/admin/orders"
            className="text-sm text-gray-500 hover:text-gray-900 mt-3 inline-block transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-3xl font-semibold text-gray-900 mt-1">
            {products.length}
          </p>
          <Link
            href="/admin/products"
            className="text-sm text-gray-500 hover:text-gray-900 mt-3 inline-block transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base font-medium text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            View all
          </Link>
        </div>
        {recentOrders && recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Order ID
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 sm:px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {order.order_id}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700">
                      <span className="block">{order.customer_name}</span>
                      {order.customer_email && (
                        <span className="block text-xs text-gray-400">
                          {order.customer_email}
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                      £{Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-4 sm:px-6 py-6 text-sm text-gray-500">
            No orders yet.
          </p>
        )}
      </div>
    </main>
  );
}
