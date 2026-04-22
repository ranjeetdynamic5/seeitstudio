import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, courseTitle } = body;

    console.log("[enroll] Incoming data:", { name, email, phone, courseTitle });

    if (!name || !email || !phone || !courseTitle) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Enquiry Received",
      text: `Hi ${name},\n\nThank you for your enquiry. We will contact you shortly.`,
    });

    console.log("[enroll] Resend response:", result);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
