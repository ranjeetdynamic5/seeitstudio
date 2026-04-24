import Image from "next/image";
import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us — SeeIt Studio",
  description:
    "Get in touch with SeeIt Studio. Software licensing, training, and consulting for UK design professionals.",
};

export default function ContactPage() {
  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
        <section className="relative h-[280px] sm:h-[340px] overflow-hidden">
          <Image
            src="/hero/Arch-banner.webp"
            alt="Contact Seelt3D"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Contact
            </h1>
            <nav className="flex items-center gap-2 text-sm text-white/75">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white">Contact</span>
            </nav>
          </div>
        </section>

        {/* ── 2. INTRO SECTION ────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div className="relative h-[300px] sm:h-[420px] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/hero/webservices.webp"
                alt="Seelt3D workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                  Get in touch
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] tracking-tight mb-4">
                  Get in Touch with Seelt3D
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed mb-3">
                  Whether you have a project in mind, need advice on software licensing, or want to
                  discuss training options for your team, we&apos;re here to help. Our UK-based team
                  responds within one business day.
                </p>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  We work with architects, interior designers, product studios, and engineering
                  firms across the UK. Reach out and let&apos;s discuss how we can support your practice.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-[#0B0F19] mb-1.5">
                  Privacy Notice (GDPR Compliance)
                </p>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  Your personal data will be processed in accordance with UK GDPR. We use your
                  information solely to respond to your enquiry and will not share it with third
                  parties without your consent. You may withdraw consent at any time by contacting
                  us at{" "}
                  <a href="mailto:jamesogston@seeit3d.co.uk" className="text-[#D9534F] hover:underline">
                    jamesogston@seeit3d.co.uk
                  </a>
                  .
                </p>
              </div>

              <Link
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
              >
                Click here to OPT-IN to receive our newsletter
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. SALES SECTION ────────────────────────────────────────────────── */}
        <section className="bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                    Software &amp; Licences
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] tracking-tight mb-4">
                    Buy Software or Upgrade Licences
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    As an authorised UK reseller for SketchUp, V-Ray, Enscape, and more, we offer
                    competitive pricing on new licences and straightforward licence upgrades.
                    Purchase directly or speak with our team for volume or subscription options.
                  </p>
                </div>
                <div>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] active:bg-[#b02a29] transition-colors"
                  >
                    Order Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative h-[280px] sm:h-[360px] rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/hero/SKP_2026.webp"
                  alt="SketchUp 2026"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. CONTACT FORM (client component) ──────────────────────────────── */}
        <div id="contact-form">
          <ContactForm />
        </div>

        {/* ── 5. NEWSLETTER SECTION ───────────────────────────────────────────── */}
        <section className="bg-[#0F172A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Newsletter
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Join To Get Our Newsletter
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Stay up to date with the latest software releases, training events, and industry news.
              </p>
            </div>
            <Link
              href="#contact-form"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
            >
              Subscribe Now
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
