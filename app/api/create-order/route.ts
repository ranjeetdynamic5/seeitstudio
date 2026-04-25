import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type OrderProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("[create-order] body received:", JSON.stringify(body));

    const { orderId, products, totalAmount, customerName, email } = body as {
      orderId: string;
      products: OrderProduct[];
      totalAmount: number;
      customerName: string;
      email: string;
    };

    if (!orderId || !products?.length || !totalAmount || !customerName || !email) {
      console.error("[create-order] Validation failed:", { orderId, customerName, email, totalAmount, productCount: products?.length });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const insertPayload = {
      order_id: orderId,
      customer_name: customerName,
      customer_email: email,
      total_amount: totalAmount,
      products: JSON.parse(JSON.stringify(products)),
    };

    console.log("[create-order] inserting:", JSON.stringify(insertPayload));

    const { data, error } = await supabase.from("orders").insert(insertPayload).select();

    if (error) {
      console.error("[create-order] Supabase error — code:", error.code, "| message:", error.message, "| details:", error.details, "| hint:", error.hint);
      return NextResponse.json({
        error: "Failed to save order",
        details: error.message,
        code: error.code,
        hint: error.hint ?? null,
      }, { status: 500 });
    }

    console.log("[create-order] inserted row:", JSON.stringify(data));
    return NextResponse.json({ success: true, id: orderId });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[create-order] Unexpected error:", message);
    return NextResponse.json({ error: "Failed to process order", details: message }, { status: 500 });
  }
}
