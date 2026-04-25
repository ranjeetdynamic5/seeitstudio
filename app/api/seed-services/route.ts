import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SERVICES = [
  {
    title: "Rendering Services",
    slug: "rendering-services",
    description: "Professional rendering solutions for architectural and product visualisation.",
  },
  {
    title: "3D Modelling",
    slug: "3d-modelling",
    description: "High-quality 3D modelling for design, architecture, and production.",
  },
  {
    title: "AI Consulting",
    slug: "ai-consulting",
    description: "AI-driven solutions and consulting for modern businesses.",
  },
  {
    title: "Web Development",
    slug: "web-development",
    description: "Custom, scalable web development tailored for business growth.",
  },
];

export async function POST() {
  const { error } = await supabase
    .from("services")
    .upsert(SERVICES, { onConflict: "slug", ignoreDuplicates: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, inserted: SERVICES.length });
}
