import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { Resend } from "resend";

const writeClient = createClient({
  projectId: "ibaf5v0k",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Incoming data:", body); // ✅ debug

    const {
      fullName,
      email,
      phone,
      company,
      inquiryType,
      message,
      hearAboutUs,
    } = body;

    // ✅ Validation
    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const source = Array.isArray(hearAboutUs)
      ? hearAboutUs.join(", ")
      : "";

    // ✅ Sanity save (safe)
    try {
      await writeClient.create({
        _type: "contactLead",
        name: fullName,
        email,
        phone: phone || "",
        company: company || "",
        inquiryType: inquiryType || "",
        message: message || "",
        source,
        createdAt: new Date().toISOString(),
      });
    } catch (sanityError) {
      console.error("Sanity Error:", sanityError);
    }

    // ✅ Email send (safe)
    try {
      await Promise.allSettled([
        resend.emails.send({
          from: "SeeIt Studio <onboarding@resend.dev>",
          to: email,
          subject: "Thank you for contacting SeeIt Studio",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B0F19;">
              <h2 style="color: #D9534F;">Thank you for getting in touch, ${fullName}</h2>
              <p>We have received your enquiry and will respond within one business day.</p>
              <p>If your matter is urgent, please email us directly at 
              <a href="mailto:jamesogston@seeit3d.co.uk" style="color: #D9534F;">
              jamesogston@seeit3d.co.uk</a>.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #64748B;">
              SeeIt Studio — UK’s trusted partner for design software, training, and consulting.
              </p>
            </div>
          `,
        }),

        resend.emails.send({
          from: "SeeIt Studio <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL || "yourgmail@gmail.com", // ✅ fallback
          subject: `New Lead: ${inquiryType || "General Enquiry"} from ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B0F19;">
              <h2 style="color: #D9534F;">New Contact Lead</h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; font-weight: bold;">Name</td><td>${fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td>${email}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td>${phone || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Company</td><td>${company || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Enquiry Type</td><td>${inquiryType || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Source</td><td>${source || "—"}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Message</td><td>${message || "—"}</td></tr>
              </table>
            </div>
          `,
        }),
      ]);
    } catch (emailError) {
      console.error("Email Error:", emailError);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("API ERROR:", error); // ✅ main debug

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}