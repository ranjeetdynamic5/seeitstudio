import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: "ibaf5v0k",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

type OrderProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { orderId, products, totalAmount, customerName, email } = body as {
      orderId: string;
      products: OrderProduct[];
      totalAmount: number;
      customerName: string;
      email: string;
    };

    if (!orderId || !products?.length || !totalAmount || !customerName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanity requires a _key on every array item
    const formattedProducts = products.map((item) => ({
      _key: crypto.randomUUID(),
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const createdAt = new Date().toISOString();

    // createIfNotExists is idempotent — safe to retry
    const doc = await writeClient.createIfNotExists({
      _id: `order-${orderId}`,
      _type: "order",
      orderId,
      products: formattedProducts,
      totalAmount,
      customerName,
      email,
      status: "pending",
      createdAt,
    });

    return NextResponse.json({ success: true, id: doc._id });
  } catch (error) {
    console.error("[create-order]", error);
    return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
  }
}
