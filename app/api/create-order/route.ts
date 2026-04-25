import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type OrderProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { orderId, products, totalAmount, customerName, email } = body as {
      orderId: string;
      products: OrderProduct[];
      totalAmount: number;
      customerName: string;
      email: string;
    };

    if (!orderId || !products?.length || !totalAmount || !customerName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabase.from("orders").insert({
      order_id: orderId,
      customer_name: customerName,
      customer_email: email,
      total_amount: totalAmount,
      products,
    });

    if (error) {
      console.error("[create-order] Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: orderId });
  } catch (error) {
    console.error("[create-order]", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
