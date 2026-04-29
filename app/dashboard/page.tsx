import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import { getServices } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
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
            } catch {
              // read-only in server component context
            }
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[dashboard] user:", user);
  console.log("[dashboard] user.email:", user?.email);

  if (!user || !user.email) {
    redirect("/login");
  }

  const services = await getServices();

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, order_id, total_amount, created_at")
    .eq("customer_email", user.email)
    .order("created_at", { ascending: false })
    .limit(20);

  console.log("[dashboard] orders:", JSON.stringify(orders, null, 2));
  console.log("[dashboard] ordersError:", ordersError);

  const role =
    (user.user_metadata?.role as string | undefined) || "user";

  return (
    <>
      <Header services={services} />

      <main className="min-h-screen bg-gray-50 pt-20 md:pt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* Page heading */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1 truncate max-w-xs sm:max-w-none">
              Welcome back, {user.email}
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

            {/* Account Details Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                Account Details
              </h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-500">Email address</dt>
                  <dd className="mt-0.5 text-sm font-medium text-gray-900 break-all">
                    {user.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Role</dt>
                  <dd className="mt-0.5">
                    <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 capitalize">
                      {role}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Order History Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                Order History
              </h2>

              {orders && orders.length > 0 ? (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-2 pr-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Order ID
                        </th>
                        <th className="pb-2 pr-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Amount
                        </th>
                        <th className="pb-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                            {order.order_id}
                          </td>
                          <td className="py-3 pr-4 text-gray-700 whitespace-nowrap">
                            £{Number(order.total_amount).toFixed(2)}
                          </td>
                          <td className="py-3 text-gray-500 whitespace-nowrap">
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
                <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center gap-2">
                  <span className="text-3xl" aria-hidden>📦</span>
                  <p className="text-sm font-medium text-gray-700">No orders yet</p>
                  <p className="text-sm text-gray-500">
                    You haven&apos;t placed any orders yet.
                  </p>
                  <Link
                    href="/products"
                    className="mt-3 w-full sm:w-auto inline-flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                  >
                    Browse Products
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
