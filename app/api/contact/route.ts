import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { fullName, email, phone, company, inquiryType, message, hearAboutUs } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const source = Array.isArray(hearAboutUs) ? hearAboutUs.join(", ") : "";

    const { error: dbError } = await supabase.from("leads").insert([{
      full_name: fullName,
      email,
      phone: phone || "",
      company: company || "",
      inquiry_type: inquiryType || "",
      message: message || "",
      source,
      status: "new",
    }]);

    if (dbError) {
      console.error("[Supabase] Insert failed:", dbError.message);
    }

    if (process.env.RESEND_API_KEY) {
      await Promise.allSettled([
        resend.emails.send({
          from: "SeeIt Studio <onboarding@resend.dev>",
          to: email,
          subject: "Thank you for contacting SeeIt Studio",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B0F19;">
              <h2 style="color: #0066FF;">Thank you for getting in touch, ${fullName}</h2>
              <p>We have received your enquiry and will respond within one business day.</p>
              <p>If your matter is urgent, please email us directly at
              <a href="mailto:jamesogston@seeit3d.co.uk" style="color: #0066FF;">jamesogston@seeit3d.co.uk</a>.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #64748B;">SeeIt Studio &mdash; UK&rsquo;s trusted partner for design software, training, and consulting.</p>
            </div>
          `,
        }),
        resend.emails.send({
          from: "SeeIt Studio <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL || "ranjeetdynamic5@gmail.com",
          subject: `New Lead: ${inquiryType || "General Enquiry"} from ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B0F19;">
              <h2 style="color: #0066FF;">New Contact Lead</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 160px;">Name</td><td>${fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${email}" style="color: #0066FF;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${phone || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Company</td><td>${company || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Enquiry Type</td><td>${inquiryType || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Source</td><td>${source || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td><td style="white-space: pre-wrap;">${message || "—"}</td></tr>
              </table>
            </div>
          `,
        }),
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const e = err as { message?: string };
    console.error("[API] Unhandled error:", e?.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}