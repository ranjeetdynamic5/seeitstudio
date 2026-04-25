import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Order = {
  id: string;
  order_id: string;
  customer_name: string;
  total_amount: number;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, order_id, customer_name, total_amount, created_at")
    .order("created_at", { ascending: false });

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0B0F19", marginBottom: "24px" }}>
        Orders
      </h1>

      {error && (
        <p style={{ color: "#d9534f", marginBottom: "16px", fontSize: "14px" }}>
          Error: {error.message}
        </p>
      )}

      {!error && (!orders || orders.length === 0) && (
        <p style={{ color: "#64748b", fontSize: "14px" }}>No orders found.</p>
      )}

      {orders && orders.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={th}>Order ID</th>
                <th style={th}>Customer Name</th>
                <th style={th}>Total Amount</th>
                <th style={th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {(orders as Order[]).map((order) => (
                <tr key={order.id} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <td style={td}>{order.order_id}</td>
                  <td style={td}>{order.customer_name}</td>
                  <td style={td}>£{Number(order.total_amount).toFixed(2)}</td>
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
