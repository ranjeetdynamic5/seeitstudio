import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL!;

export async function POST(req: NextRequest) {
  const { orderId, customerEmail, customerName } = await req.json();

  if (!orderId || !customerEmail) {
    return NextResponse.json(
      { error: "orderId and customerEmail are required" },
      { status: 400 }
    );
  }

  const customerHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
      <h2 style="color:#d9534f;">Order Confirmation</h2>
      <p>Dear ${customerName ?? "Customer"},</p>
      <p>Thank you for your order. We have received it and will process it shortly.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p>If you have any questions, please do not hesitate to contact us.</p>
      <p style="margin-top:32px;">Kind regards,<br/>Seelt Studio</p>
    </div>
  `;

  const adminHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
      <h2 style="color:#d9534f;">New Order Received</h2>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Customer Email:</strong> ${customerEmail}</p>
      <p><strong>Customer Name:</strong> ${customerName ?? "N/A"}</p>
    </div>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Seelt Studio <onboarding@resend.dev>",
        to: customerEmail,
        subject: "Order Confirmation",
        html: customerHtml,
      }),
      resend.emails.send({
        from: "Seelt Studio <onboarding@resend.dev>",
        to: adminEmail,
        subject: `New Order: ${orderId}`,
        html: adminHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
