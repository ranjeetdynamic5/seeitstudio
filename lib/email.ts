import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type OrderEmailData = {
  orderId: string;
  customerName: string;
  email: string;
  products: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  createdAt: string;
};

// ── Invoice HTML ─────────────────────────────────────────────────────────────

function buildInvoiceHtml(order: OrderEmailData): string {
  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = order.products
    .map(
      (p) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0B0F19">${p.name}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0B0F19;text-align:center">${p.quantity}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0B0F19;text-align:right">£${p.price.toFixed(2)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:14px;color:#0B0F19;text-align:right;font-weight:600">£${(p.price * p.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px">

        <!-- Header -->
        <tr>
          <td style="background:#0B0F19;padding:24px 32px">
            <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.3px">SeeIt Studio</span>
            <span style="color:#94a3b8;font-size:13px;margin-left:14px">Order Confirmation</span>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:32px">

          <p style="margin:0 0 6px;color:#64748b;font-size:14px">Dear ${order.customerName},</p>
          <p style="margin:0 0 28px;color:#0B0F19;font-size:15px;line-height:1.5">
            Thank you for your order. We have received it and will be in touch shortly.
          </p>

          <!-- Order meta -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;background:#f8fafc;border-radius:8px;padding:0;border:1px solid #e2e8f0">
            <tr>
              <td style="padding:12px 16px;color:#64748b;font-size:13px;border-bottom:1px solid #e2e8f0">Order Reference</td>
              <td style="padding:12px 16px;color:#0B0F19;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #e2e8f0">#${order.orderId}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;color:#64748b;font-size:13px">Date</td>
              <td style="padding:12px 16px;color:#0B0F19;font-size:13px;text-align:right">${date}</td>
            </tr>
          </table>

          <!-- Products -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:20px">
            <tr style="background:#f8fafc">
              <th style="padding:10px 14px;text-align:left;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px">Product</th>
              <th style="padding:10px 14px;text-align:center;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px">Qty</th>
              <th style="padding:10px 14px;text-align:right;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px">Unit</th>
              <th style="padding:10px 14px;text-align:right;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px">Total</th>
            </tr>
            ${rows}
          </table>

          <!-- Grand total -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px">
            <tr>
              <td></td>
              <td style="width:220px">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-top:2px solid #0B0F19">
                  <tr>
                    <td style="padding:12px 0 0;color:#0B0F19;font-size:15px;font-weight:700">Total</td>
                    <td style="padding:12px 0 0;color:#0B0F19;font-size:18px;font-weight:700;text-align:right">£${order.totalAmount.toFixed(2)}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="margin:0;color:#64748b;font-size:13px;line-height:1.7">
            If you have any questions about your order, please reply to this email or contact us directly.
            We will keep you informed of any updates.
          </p>

        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:18px 32px;border-top:1px solid #e2e8f0">
            <p style="margin:0;color:#94a3b8;font-size:12px;text-align:center;line-height:1.6">
              SeeIt Studio &mdash; Official UK Reseller &mdash; Trusted by UK Professionals
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Admin email HTML ──────────────────────────────────────────────────────────

function buildAdminHtml(order: OrderEmailData): string {
  const productLines = order.products
    .map((p) => `${p.name} × ${p.quantity} @ £${p.price.toFixed(2)}`)
    .join("<br/>");

  return `
    <h2 style="font-family:Arial,sans-serif;color:#0B0F19">New Order: #${order.orderId}</h2>
    <p style="font-family:Arial,sans-serif;color:#374151"><strong>Customer:</strong> ${order.customerName}</p>
    <p style="font-family:Arial,sans-serif;color:#374151"><strong>Email:</strong> ${order.email}</p>
    <p style="font-family:Arial,sans-serif;color:#374151"><strong>Products:</strong><br/>${productLines}</p>
    <p style="font-family:Arial,sans-serif;color:#374151"><strong>Total:</strong> £${order.totalAmount.toFixed(2)}</p>
    <p style="font-family:Arial,sans-serif;color:#374151"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString("en-GB")}</p>
    <hr/>
    <p style="font-family:Arial,sans-serif;color:#94a3b8;font-size:12px">
      SeeIt Studio — Order Management
    </p>
  `;
}

// ── Public function ───────────────────────────────────────────────────────────

export async function sendOrderEmails(order: OrderEmailData): Promise<void> {
  const FROM = process.env.EMAIL_FROM ?? "orders@seeitstudio.co.uk";
  const ADMIN = process.env.ADMIN_EMAIL ?? "";

  const [customerResult, adminResult] = await Promise.allSettled([
    resend.emails.send({
      from: `SeeIt Studio <${FROM}>`,
      to: order.email,
      subject: `Order Confirmation – #${order.orderId}`,
      html: buildInvoiceHtml(order),
    }),
    ...(ADMIN
      ? [
          resend.emails.send({
            from: `SeeIt Studio <${FROM}>`,
            to: ADMIN,
            subject: `New Order Received – #${order.orderId}`,
            html: buildAdminHtml(order),
          }),
        ]
      : []),
  ]);

  if (customerResult.status === "rejected") {
    console.error("[email] Customer email failed:", customerResult.reason);
  }
  if (adminResult && adminResult.status === "rejected") {
    console.error("[email] Admin email failed:", adminResult.reason);
  }
}
