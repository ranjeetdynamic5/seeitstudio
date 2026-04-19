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
  // ── 1. Confirm the route is being reached ───────────────────────────────
  console.log("[send-order-email] WEBHOOK HIT —", new Date().toISOString());

  // ── 2. Log every incoming header (safe — values are not sensitive secrets) ──
  const headersMap: Record<string, string> = {};
  req.headers.forEach((value, key) => { headersMap[key] = value; });
  console.log("[send-order-email] Headers received:", JSON.stringify(headersMap));

  // ── 3. Verify shared secret ─────────────────────────────────────────────
  const receivedSecret = req.headers.get("x-webhook-secret")?.trim() ?? "";
  const expectedSecret = (process.env.WEBHOOK_SECRET ?? "").trim();

  console.log(
    "[send-order-email] Secret check — received:",
    receivedSecret ? `"${receivedSecret.slice(0, 4)}…"` : "(empty)",
    "| expected set:", expectedSecret ? "yes" : "NO — WEBHOOK_SECRET env var is missing"
  );

  if (!receivedSecret || receivedSecret !== expectedSecret) {
    console.warn("[send-order-email] Secret MISMATCH — returning 401");
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  console.log("[send-order-email] Secret OK");

  // ── 4. Parse body ───────────────────────────────────────────────────────
  let raw: string;
  try {
    raw = await req.text();
  } catch (err) {
    console.error("[send-order-email] Failed to read request body:", err);
    return NextResponse.json({ error: "Could not read request body" }, { status: 400 });
  }

  console.log("[send-order-email] Raw body:", raw.slice(0, 1000)); // first 1 000 chars

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch (err) {
    console.error("[send-order-email] JSON parse failed:", err);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // ── 5. Extract fields defensively ──────────────────────────────────────
  //
  // Sanity sends the full published document. Fields present:
  //   _id        → "order-UK12345"  (deterministic ID we set)
  //   _type      → "order"
  //   orderId    → "UK12345"        (the custom field in our schema)
  //   status     → "completed"
  //   ...rest of schema fields
  //
  // We derive orderId from the custom field first, then fall back to stripping
  // the "order-" prefix from _id so the route still works if orderId is absent.

  const status  = typeof body.status  === "string" ? body.status  : undefined;
  const rawId   = typeof body._id     === "string" ? body._id     : undefined;

  // Prefer the explicit schema field; fall back to _id minus the "order-" prefix
  // and strip any "drafts." prefix Sanity adds for draft documents
  const orderId =
    typeof body.orderId === "string"
      ? body.orderId
      : rawId?.replace(/^drafts\./, "").replace(/^order-/, "") ?? undefined;

  console.log(
    `[send-order-email] Parsed — _id="${rawId}" orderId="${orderId}" status="${status}"`
  );

  // ── 6. Status guard ─────────────────────────────────────────────────────
  if (status !== "completed") {
    console.log(`[send-order-email] Skipping — status is "${status}", not "completed"`);
    return NextResponse.json({
      skipped: true,
      reason: `status is "${status}", not "completed"`,
    });
  }

  if (!orderId) {
    console.error("[send-order-email] Cannot determine orderId from payload — aborting");
    return NextResponse.json({ error: "Cannot determine orderId" }, { status: 400 });
  }

  // ── 7. Re-fetch from Sanity for authoritative data ──────────────────────
  //    (avoids acting on a stale or partial webhook payload)
  type SanityOrder = {
    orderId: string;
    customerName: string;
    email: string;
    products: Array<{ name: string; price: number; quantity: number }>;
    totalAmount: number;
    createdAt: string;
    status: string;
  };

  let order: SanityOrder | null;
  try {
    order = await readClient.fetch<SanityOrder | null>(
      `*[_type == "order" && orderId == $orderId][0]`,
      { orderId }
    );
  } catch (err) {
    console.error("[send-order-email] Sanity fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch order from Sanity" }, { status: 500 });
  }

  console.log(
    "[send-order-email] Sanity fetch result:",
    order
      ? `found — status="${order.status}" customer="${order.customerName}"`
      : "NOT FOUND"
  );

  if (!order) {
    return NextResponse.json({ error: `Order "${orderId}" not found in Sanity` }, { status: 404 });
  }

  // Guard: ensure status is still "completed" at fetch time (race-condition safety)
  if (order.status !== "completed") {
    console.log(
      `[send-order-email] Status changed to "${order.status}" between webhook and fetch — skipping`
    );
    return NextResponse.json({
      skipped: true,
      reason: `Order status is now "${order.status}", not "completed"`,
    });
  }

  // ── 8. Send emails ──────────────────────────────────────────────────────
  try {
    await sendOrderEmails({
      orderId:      order.orderId,
      customerName: order.customerName,
      email:        order.email,
      products:     order.products,
      totalAmount:  order.totalAmount,
      createdAt:    order.createdAt,
    });
    console.log(`[send-order-email] Emails sent successfully for order "${orderId}"`);
  } catch (err) {
    console.error("[send-order-email] sendOrderEmails threw:", err);
    return NextResponse.json({ error: "Email sending failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, orderId });
}
