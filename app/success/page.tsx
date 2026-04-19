"use client";

import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("orderId");

    if (!id) {
      window.location.href = "/";
      return;
    }

    setOrderId(`#${id}`);
  }, []);

  if (!orderId) return <p>Loading...</p>;

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
    <div className="bg-white p-10 rounded-xl shadow-md text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-2">
        ✅ Order Successful
      </h1>
      <p className="text-gray-600 mb-4">
        Thank you for your purchase!
      </p>
      <p className="font-semibold text-lg">{orderId}</p>

      <a
        href="/products"
        className="inline-block mt-6 px-6 py-3 bg-[#D9534F] text-white rounded-lg hover:bg-[#c9302c]"
      >
        Continue Shopping
      </a>
    </div>
  </div>
);
}