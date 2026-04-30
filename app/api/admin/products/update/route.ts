import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "ranjeetdynamic5@gmail.com")
  .split(",")
  .map((e) => e.trim());

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options);
            } catch {}
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!ADMIN_EMAILS.includes(user.email ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { id, title, price, original_price, discount_percent, is_on_sale, offer_text } = body;

  if (!id) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }
  if (!title || typeof price !== "number") {
    return NextResponse.json({ error: "Title and price are required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("products")
    .update({
      title,
      price,
      original_price: original_price ?? null,
      discount_percent: discount_percent ?? null,
      is_on_sale: is_on_sale ?? false,
      offer_text: offer_text ?? null,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
