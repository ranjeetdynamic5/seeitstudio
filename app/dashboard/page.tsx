import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/app/_components/LogoutButton";

type Order = {
  id: string;
  order_id: string;
  total_amount: number;
  created_at: string;
};

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

  if (!user) {
    redirect("/login");
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_id, total_amount, created_at")
    .eq("customer_email", user.email)
    .order("created_at", { ascending: false })
    .limit(20);

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    user.email?.split("@")[0] ||
    "User";

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#0B0F19",
                margin: 0,
              }}
            >
              My Account
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#64748b",
                marginTop: "4px",
                marginBottom: 0,
              }}
            >
              {displayName} &middot; {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#0B0F19",
            marginBottom: "16px",
          }}
        >
          Order History
        </h2>

        {!orders || orders.length === 0 ? (
          <p style={{ fontSize: "14px", color: "#64748b" }}>No orders yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={th}>Order ID</th>
                  <th style={th}>Amount</th>
                  <th style={th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {(orders as Order[]).map((order) => (
                  <tr
                    key={order.id}
                    style={{ borderTop: "1px solid #e2e8f0" }}
                  >
                    <td style={td}>{order.order_id}</td>
                    <td style={td}>
                      £{Number(order.total_amount).toFixed(2)}
                    </td>
                    <td style={td}>
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
        )}
      </div>
    </main>
  );
}

const th: React.CSSProperties = {
  padding: "11px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.4px",
};

const td: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "14px",
  color: "#0B0F19",
};
