import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { sendOrderEmails } from "@/lib/email";

const readClient = createClient({
  projectId: "ibaf5v0k",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(req: NextRequest) {
  // Verify the request comes from Sanity webhook
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    // Sanity webhook sends the full document as the body
    const body = await req.json() as {
      orderId?: string;
      status?: string;
      customerName?: string;
      email?: string;
      products?: Array<{ name: string; price: number; quantity: number }>;
      totalAmount?: number;
      createdAt?: string;
    };

    // Only proceed when status is exactly "completed"
    if (body.status !== "completed") {
      return NextResponse.json({ skipped: true, reason: "status is not completed" });
    }

    const { orderId } = body;
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId in payload" }, { status: 400 });
    }

    // Re-fetch from Sanity to get the authoritative, latest document
    const order = await readClient.fetch<{
      orderId: string;
      customerName: string;
      email: string;
      products: Array<{ name: string; price: number; quantity: number }>;
      totalAmount: number;
      createdAt: string;
      status: string;
    } | null>(
      `*[_type == "order" && orderId == $orderId][0]`,
      { orderId }
    );

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Guard: confirm status is still "completed" at fetch time
    if (order.status !== "completed") {
      return NextResponse.json({ skipped: true, reason: "Order status changed before email was sent" });
    }

    await sendOrderEmails({
      orderId: order.orderId,
      customerName: order.customerName,
      email: order.email,
      products: order.products,
      totalAmount: order.totalAmount,
      createdAt: order.createdAt,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[send-order-email]", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
