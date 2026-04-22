import { NextRequest, NextResponse } from "next/server";

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

    console.log("[enroll] New enrolment:", { name, email, phone, courseTitle });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}
