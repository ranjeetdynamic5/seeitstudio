import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  console.log("[send-order-email] WEBHOOK HIT —", new Date().toISOString());

  const receivedSecret = req.headers.get("x-webhook-secret")?.trim() ?? "";
  const expectedSecret = (process.env.WEBHOOK_SECRET ?? "").trim();

  if (!receivedSecret || receivedSecret !== expectedSecret) {
    console.warn("[send-order-email] Secret MISMATCH — returning 401");
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch (err) {
    console.error("[send-order-email] Failed to parse body:", err);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const status = typeof body.status === "string" ? body.status : undefined;
  const orderId = typeof body.orderId === "string" ? body.orderId : undefined;

  if (status !== "completed") {
    return NextResponse.json({ skipped: true, reason: `status is "${status}", not "completed"` });
  }

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  try {
    await sendOrderEmails({
      orderId,
      customerName: typeof body.customerName === "string" ? body.customerName : "Customer",
      email: typeof body.email === "string" ? body.email : "",
      products: Array.isArray(body.products) ? body.products as Array<{ name: string; price: number; quantity: number }> : [],
      totalAmount: typeof body.totalAmount === "number" ? body.totalAmount : 0,
      createdAt: typeof body.createdAt === "string" ? body.createdAt : new Date().toISOString(),
    });
    console.log(`[send-order-email] Emails sent for order "${orderId}"`);
  } catch (err) {
    console.error("[send-order-email] sendOrderEmails threw:", err);
    return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, orderId });
}
