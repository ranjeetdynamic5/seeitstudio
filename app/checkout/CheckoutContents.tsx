"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";

type FormFields = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
};

type FormErrors = Partial<FormFields>;

const EMPTY_FORM: FormFields = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postcode: "",
};

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.fullName.trim()) errors.fullName = "Full name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[\d\s+\-()]{7,15}$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!fields.address.trim()) errors.address = "Address is required.";
  if (!fields.city.trim()) errors.city = "City is required.";
  if (!fields.postcode.trim()) {
    errors.postcode = "Postcode is required.";
  } else if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(fields.postcode.trim())) {
    errors.postcode = "Enter a valid UK postcode.";
  }
  return errors;
}

export default function CheckoutContents() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getShipping = useCartStore((s) => s.getShipping);
  const getTotal = useCartStore((s) => s.getTotal);

  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setOrderError(null);

    const id = `UK${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: id,
          customerName: form.fullName,
          email: form.email,
          products: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: total,
        }),
      });

      if (!res.ok) throw new Error("Order save failed");

      clearCart();
      sessionStorage.setItem("orderComplete", "1");
      router.push(`/success?orderId=${id}`);
    } catch {
      setOrderError("There was a problem placing your order. Please try again.");
      setLoading(false);
    }
  }

  const subtotal = mounted ? getSubtotal() : 0;
  const shipping = mounted ? getShipping() : 0;
  const total = mounted ? getTotal() : 0;

  return (
    <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-6">
          <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
          <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/cart" className="hover:text-[#0B0F19] transition-colors">Cart</Link>
          <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-[#0B0F19] font-medium">Checkout</span>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight text-[#0B0F19] mb-8">Checkout</h1>

        {/* Empty cart guard */}
        {mounted && items.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl px-8 py-16 flex flex-col items-center text-center max-w-md mx-auto">
            <p className="text-base font-semibold text-[#0B0F19] mb-1">Your cart is empty</p>
            <p className="text-sm text-[#64748B] mb-6">Add items to your cart before checking out.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors">
              Browse Products
            </Link>
          </div>
        )}

        {/* Main layout */}
        {mounted && items.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Left: Customer form ── */}
            <form onSubmit={handleSubmit} noValidate className="flex-1 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-base font-semibold text-[#0B0F19] mb-6">Delivery Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" name="fullName" type="text" autoComplete="name" value={form.fullName} error={errors.fullName} onChange={handleChange} className="sm:col-span-2" />
                <Field label="Email Address" name="email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={handleChange} />
                <Field label="Phone Number" name="phone" type="tel" autoComplete="tel" value={form.phone} error={errors.phone} onChange={handleChange} />
                <Field label="Address" name="address" type="text" autoComplete="street-address" value={form.address} error={errors.address} onChange={handleChange} className="sm:col-span-2" />
                <Field label="City" name="city" type="text" autoComplete="address-level2" value={form.city} error={errors.city} onChange={handleChange} />
                <Field label="Postcode" name="postcode" type="text" autoComplete="postal-code" value={form.postcode} error={errors.postcode} onChange={handleChange} />
              </div>

              {orderError && (
                <p className="mt-6 text-sm text-red-500 font-medium">{orderError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Processing&hellip;
                  </>
                ) : (
                  "Complete Secure Order →"
                )}
              </button>
            </form>

            {/* ── Right: Order summary ── */}
            <div className="lg:w-80 shrink-0 w-full">
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-5 sticky top-36">
                <h2 className="text-base font-semibold text-[#0B0F19]">Order Summary</h2>

                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm text-[#64748B]">
                      <span className="truncate pr-2">{item.name} &times;{item.quantity}</span>
                      <span className="shrink-0 font-medium text-[#0B0F19]">£{(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between text-[#64748B]">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#0B0F19]">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#64748B]">
                    <span>Shipping</span>
                    <span className="font-medium text-[#0B0F19]">
                      {shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">Free shipping applied (orders over £50)</p>
                  )}
                  <div className="flex justify-between text-base font-semibold text-[#0B0F19] pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                  <TrustBadge icon="lock">Secure checkout</TrustBadge>
                  <TrustBadge icon="shield">Trusted by UK professionals</TrustBadge>
                  <TrustBadge icon="check">Official UK reseller</TrustBadge>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────────────────────

type FieldProps = {
  label: string;
  name: keyof FormFields;
  type: string;
  autoComplete?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

function Field({ label, name, type, autoComplete, value, error, onChange, className = "" }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-[#374151] mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`w-full px-3.5 py-2.5 text-sm text-[#0B0F19] bg-white border rounded-lg outline-none transition-colors placeholder:text-slate-300
          ${error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 focus:border-[#D9534F] focus:ring-2 focus:ring-rose-50"
          }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function TrustBadge({ icon, children }: { icon: "lock" | "shield" | "check"; children: React.ReactNode }) {
  const icons = {
    lock: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };
  return (
    <div className="flex items-center gap-2 text-xs text-[#64748B]">
      <svg className="w-4 h-4 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {icons[icon]}
      </svg>
      {children}
    </div>
  );
}
