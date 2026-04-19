import { notFound } from "next/navigation";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import { SERVICES, getServiceBySlug } from "@/lib/services";

// ── Static generation ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} — SeeIt Studio`,
    description: service.shortDescription,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header / hero ───────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <Link href="/services" className="hover:text-[#0B0F19] transition-colors">Services</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-[#0B0F19] font-medium">{service.title}</span>
            </nav>

            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                {service.title}
              </h1>
              <p className="mt-3 text-base text-[#64748B] leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>

        {/* ── Main content ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Problems + Features */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* Problems section */}
              <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[#D9534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#0B0F19]">Common Problems We Solve</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {service.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[#D9534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                      <span className="text-sm text-[#64748B] leading-relaxed">{problem}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Features section */}
              <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-[#0B0F19]">What We Offer</h2>
                </div>
                <ul className="flex flex-col gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-[#0B0F19] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right: sticky CTA card */}
            <aside className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm sticky top-28">
                <div className="bg-[#0F172A] px-5 py-6">
                  <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-1.5">
                    Get started
                  </p>
                  <h3 className="text-base font-semibold text-white">
                    Interested in {service.title}?
                  </h3>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Tell us about your project and we&apos;ll come back to you with a clear plan and transparent pricing.
                  </p>

                  <div className="flex flex-col gap-2">
                    {[
                      "No obligation quote",
                      "Response within 1 business day",
                      "UK-based team",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-[#64748B]">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors mt-1"
                  >
                    {service.cta}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  <a
                    href="tel:03331212187"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-[#0B0F19] bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    0333 121 2187
                  </a>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-4">
                <Link
                  href="/services"
                  className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#D9534F] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  All services
                </Link>
              </div>
            </aside>

          </div>
        </div>

        {/* ── Other services ───────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-lg font-semibold text-[#0B0F19] mb-5">Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-[#D9534F] hover:shadow-sm transition-all group flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#0B0F19] group-hover:text-[#D9534F] transition-colors">
                    {s.title}
                  </p>
                  <p className="text-xs text-[#64748B] mt-0.5 line-clamp-1">{s.shortDescription}</p>
                </div>
                <svg className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-[#D9534F] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
