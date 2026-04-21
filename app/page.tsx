import NavHeader from "./components/NavHeader";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TrustedPartners from "./components/TrustedPartners";
import ProductCard from "./components/ProductCard";
import { getFeaturedProducts, getFeaturedTrainings } from "../lib/sanity/queries";
import TrainingCard from "./components/TrainingCard";
import ServiceCard, { type Service } from "./components/ServiceCard";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

// ─── Reusable Section Heading ─────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const base = align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-xl";
  return (
    <div className={base}>
      <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
      <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0B0F19] mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}


const SERVICES: Service[] = [
  {
    title: "Professional Rendering Services",
    category: "Rendering Services",
    description:
      "Studio-quality architectural visualisations delivered to your brief. We handle lighting, materials, post-production, and final output for print or digital.",
    href: "/services/rendering",
    highlights: [
      "Interior & exterior renders",
      "CGI stills and walkthrough animations",
      "Rapid 5-day turnaround available",
      "Revisions included as standard",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: "3D Modelling & BIM",
    category: "3D Modelling",
    description:
      "Precision 3D modelling for architecture, product design, retail fit-out, and manufacturing. Delivered in SketchUp, Revit, or any required format.",
    href: "/services/3d-modelling",
    highlights: [
      "Architectural & product modelling",
      "BIM-ready Revit families",
      "SketchUp & Rhino specialists",
      "Millimetre-accurate geometry",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: "AI Strategy & Consulting",
    category: "AI Consulting",
    description:
      "From workflow analysis to full AI implementation, we help design firms and businesses identify where AI delivers the highest ROI — and then build it.",
    href: "/services/ai-consulting",
    highlights: [
      "AI readiness assessment",
      "Process automation strategy",
      "Custom tool development",
      "Team enablement & training",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: "Web Development",
    category: "Web Development",
    description:
      "Clean, performant websites and web applications built with modern frameworks. Portfolio sites, e-commerce, booking systems, and bespoke SaaS products.",
    href: "/services/web-development",
    highlights: [
      "Next.js & React applications",
      "E-commerce & booking systems",
      "CMS integration (Sanity, Contentful)",
      "Ongoing maintenance & support",
    ],
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [featuredProducts, featuredTrainings] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedTrainings(),
  ]);

  return (
    <>
      {/* 1. Header — fixed, sits above everything */}
      <NavHeader />

      {/*
        Offset wrapper — pushes all page content below the fixed header.
        Mobile  : nav only  = h-20  → pt-20  (80px)
        Desktop : top bar h-12 + nav h-20 = 128px → pt-32 (128px)
      */}
      <main className="pt-20 md:pt-32">

      {/* 2. Hero Section */}
      <HeroSection />

      {/* ── 3. About Us ──────────────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── 4. Trusted Partners ──────────────────────────────────────────────── */}
      <TrustedPartners />

      {/* ── 5. Products Preview ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* Header row — stacks on mobile, inline on sm+ */}
          <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
            <SectionHeading
              eyebrow="Software & Licences"
              title="Featured Products"
              subtitle="Extensions, rendering tools, and AI software — hand-picked for design professionals."
            />
            <a
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9534F] hover:text-[#c9302c] transition-colors shrink-0 sm:pb-0 pb-0"
            >
              View all products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Cards: 1 col → 2 col sm → 4 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. Training Preview ──────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 lg:py-24 bg-[#f0f5fa]">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
            <SectionHeading
              eyebrow="Courses & Workshops"
              title="Professional Training"
              subtitle="Structured programmes designed for real-world application — online, in-person, and hybrid."
            />
            <a
              href="/training"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D9534F] hover:text-[#c9302c] transition-colors shrink-0"
            >
              View all courses
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Cards: 1 col → 2 col sm → 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
            {featuredTrainings.map((training) => (
              <TrainingCard key={training._id} training={training} />
            ))}
          </div>

          {/* Bespoke Training Banner */}
          <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                Looking for bespoke team training?
              </h3>
              <p className="text-sm text-slate-400">
                We offer tailored in-house programmes for studios and agencies of any size.
              </p>
            </div>
            <a
              href="/contact"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
            >
              Enquire now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 7. Services ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-14 px-4 sm:px-6 lg:px-8 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 lg:mb-12">
            <SectionHeading
              eyebrow="What We Do"
              title="Creative & Technical Services"
              subtitle="End-to-end delivery from brief to final output — rendering, modelling, AI strategy, and web development."
            />
          </div>
          {/* Services: 1 col → 2 col sm → 4 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Testimonials ──────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── 9. CTA Section ───────────────────────────────────────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Copy */}
            <div className="max-w-lg">
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-3">
                Get Started Today
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-4">
                Ready to elevate your design workflow?
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Browse our software catalogue, book a training course, or speak with our team about
                a bespoke project. We respond to all enquiries within one business day.
              </p>
            </div>

            {/* Buttons — stacked on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
              <a
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                Shop Products
              </a>
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Footer ───────────────────────────────────────────────────────── */}
      <Footer />

      </main>{/* /offset wrapper */}
    </>
  );
}
