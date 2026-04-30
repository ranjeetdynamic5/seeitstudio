"use client";

import { useState } from "react";
import type { Product } from "@/lib/supabase";

type EditForm = {
  title: string;
  price: string;
  original_price: string;
  discount_percent: string;
  is_on_sale: boolean;
  offer_text: string;
};

export default function ProductsManager({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<EditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function openEdit(product: Product) {
    setEditing(product);
    setForm({
      title: product.title,
      price: String(product.price),
      original_price: product.original_price != null ? String(product.original_price) : "",
      discount_percent: product.discount_percent != null ? String(product.discount_percent) : "",
      is_on_sale: product.is_on_sale ?? false,
      offer_text: product.offer_text ?? "",
    });
    setError(null);
  }

  function closeEdit() {
    setEditing(null);
    setForm(null);
    setError(null);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/products/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Failed to delete product.");
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  async function handleSave() {
    if (!editing || !form) return;
    setSaving(true);
    setError(null);
    try {
      const price = parseFloat(form.price);
      if (isNaN(price) || price < 0) {
        setError("Please enter a valid price.");
        return;
      }
      const res = await fetch("/api/admin/products/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editing.id,
          title: form.title.trim(),
          price,
          original_price: form.original_price ? parseFloat(form.original_price) : null,
          discount_percent: form.discount_percent ? parseInt(form.discount_percent, 10) : null,
          is_on_sale: form.is_on_sale,
          offer_text: form.offer_text.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to save changes.");
        return;
      }
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editing.id
            ? {
                ...p,
                title: form.title.trim(),
                price,
                original_price: form.original_price ? parseFloat(form.original_price) : undefined,
                discount_percent: form.discount_percent
                  ? parseInt(form.discount_percent, 10)
                  : undefined,
                is_on_sale: form.is_on_sale,
                offer_text: form.offer_text.trim() || undefined,
              }
            : p
        )
      );
      closeEdit();
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Title
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Sale
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Added
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 sm:px-6 py-3">
                      <span className="font-medium text-gray-900">
                        {product.title}
                      </span>
                      {product.offer_text && (
                        <span className="block text-xs text-gray-400 mt-0.5">
                          {product.offer_text}
                        </span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-700 whitespace-nowrap">
                      {product.is_on_sale && product.original_price ? (
                        <>
                          <span className="line-through text-gray-400 mr-1">
                            £{Number(product.original_price).toFixed(2)}
                          </span>
                          <span className="font-medium">
                            £{Number(product.price).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>£{Number(product.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3">
                      {product.is_on_sale ? (
                        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Sale
                        </span>
                      ) : (
                        <span className="text-gray-400">&mdash;</span>
                      )}
                    </td>
                    <td className="px-4 sm:px-6 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(product.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-xs font-medium px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                          className="text-xs font-medium px-3 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          {deleting === product.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-10 text-center">
          <p className="text-sm text-gray-500">No products yet.</p>
        </div>
      )}

      {editing && form && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={closeEdit}
        >
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-gray-900 mb-5">
              Edit Product
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Price (£)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Original Price (£)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.original_price}
                    onChange={(e) =>
                      setForm({ ...form, original_price: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.discount_percent}
                    onChange={(e) =>
                      setForm({ ...form, discount_percent: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_on_sale}
                      onChange={(e) =>
                        setForm({ ...form, is_on_sale: e.target.checked })
                      }
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-xs font-medium text-gray-600">
                      On sale
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Offer Text
                </label>
                <input
                  type="text"
                  value={form.offer_text}
                  onChange={(e) =>
                    setForm({ ...form, offer_text: e.target.value })
                  }
                  placeholder="e.g. Limited time offer"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>

            {error && <p className="mt-4 text-xs text-red-600">{error}</p>}

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={closeEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
