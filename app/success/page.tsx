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
    <div>
      <h1>Order Success</h1>
      <p>{orderId}</p>
    </div>
  );
}