import Link from "next/link";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/ServicesHero";
import ServicesShowcase from "@/components/ServicesShowcase";

export const metadata = {
  title: "Services — SeeIt Studio",
  description:
    "Professional rendering, 3D modelling, AI consulting, and web development services for design studios.",
};

export default function ServicesPage() {
  return (
    <>
      <NavHeader />

      <main className="pt-16 min-h-screen bg-[#f8fafc]">

        <ServicesHero />

        <ServicesShowcase />

        {/* ── Bottom CTA ── */}
        <div className="bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="bg-[#00334e] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-2">
                  Not sure where to start?
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Talk to us about your project
                </h2>
                <p className="text-sm text-slate-400 max-w-md">
                  We&apos;ll help you figure out the right service, scope, and approach — no obligation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="tel:03331212187"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#00334e] bg-white rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  0333 121 2187
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0066FF] rounded-xl hover:bg-[#0052cc] transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
