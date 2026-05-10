import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const sc = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, courseTitle } = body;

    if (!name || !email || !phone || !courseTitle) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    // Save to leads table
    const { error: leadError } = await sc.from("leads").insert({
      full_name: name,
      email,
      phone,
      service: courseTitle,
      inquiry_type: "training",
      status: "new",
    });

    if (leadError) {
      console.error("[enroll] Lead insert error:", leadError);
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: `Enrolment Request — ${courseTitle}`,
      text: `Hi ${name},\n\nThank you for your enrolment request for ${courseTitle}.\n\nWe will contact you within 24 hours to confirm your place and discuss next steps.\n\nBest regards,\nSeeit Studio Team\n0333 121 2187`,
    });

    // Send notification to admin
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAILS ?? "ranjeetdynamic5@gmail.com",
      subject: `New Training Enrolment — ${courseTitle}`,
      text: `New enrolment request received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${courseTitle}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[enroll] Error:", err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}