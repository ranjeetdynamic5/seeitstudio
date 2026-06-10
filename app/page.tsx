import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TrustedPartners from "@/components/TrustedPartners";
import ProductCard from "@/components/ProductCard";
import TrainingCard from "@/components/TrainingCard";
import ServiceCard from "@/components/ServiceCard";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getFeaturedProducts, getTrainingCourses, getServices } from "../lib/supabase";
import type { Service } from "../lib/supabase";

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
      <p className="text-xs font-medium text-[#0066FF] uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
      <h2 className="font-heading text-[30px] sm:text-[38px] lg:text-[48px] leading-[1.05] font-bold tracking-tight text-[#0B0F19] mb-3 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base max-w-[620px] leading-8 text-[#64748B]">{subtitle}</p>
      )}
    </div>
  );
}

function toServiceCardProps(s: Service) {
  const highlightsMap: Record<string, string[]> = {
    "Rendering Services": ["Photorealistic visuals", "Fast turnaround", "Revision-inclusive"],
    "3D Modelling": ["BIM-compatible geometry", "Multi-format export", "Architecture-ready"],
    "AI Consulting": ["Workflow automation", "Tool integration", "End-to-end delivery"],
    "Web Development": ["Custom Next.js & React", "SEO optimised", "Scalable & secure"],
  }
  const imageMap: Record<string, string> = {
    "Rendering Services": "/hero/D5-banner.webp",
    "3D Modelling": "/hero/Arch-banner.webp",
    "AI Consulting": "/hero/open_bim.webp",
    "Web Development": "/hero/webservices.webp",
  }
  const hrefMap: Record<string, string> = {
    "Rendering Services": "/services/rendering-services",
    "3D Modelling": "/services/3d-modelling",
    "AI Consulting": "/services/ai-consulting",
    "Web Development": "/services/web-development",
  }
  return {
    title: s.title,
    category: "Service",
    description: s.description,
    href: hrefMap[s.title] ?? "/services",
    highlights: highlightsMap[s.title] ?? [],
    icon: null,
    image: imageMap[s.title],
  }
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Seeit Studio — SketchUp Software, Training & Creative Services UK",
  description:
    "UK-based digital studio offering SketchUp extensions, rendering software, AI tools, professional training, and creative services for architects and design professionals.",
  alternates: {
    canonical: "https://seeitstudio.com",
  },
  openGraph: {
    title: "Seeit Studio — SketchUp Software, Training & Creative Services UK",
    description:
      "UK-based digital studio offering SketchUp extensions, rendering software, AI tools, professional training, and creative services for architects and design professionals.",
    url: "https://seeitstudio.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default async function HomePage() {
  const [featuredProducts, allTrainings, services] = await Promise.all([
    getFeaturedProducts(),
    getTrainingCourses(),
    getServices(),
  ]);

  const featuredTrainings = allTrainings.filter(t => t.is_featured).slice(0, 5);

  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-28 bg-[#F7F9FA]">

        <HeroSection />

        <AboutSection />

        <TrustedPartners />

        {/* ── Products Preview ──────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-10 xl:px-16 lg:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto">

            <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
              <SectionHeading
                eyebrow="Software & Licences"
                title="Featured Products"
                subtitle="Extensions, rendering tools, and AI software — hand-picked for design professionals."
              />
              <a
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066FF] hover:text-[#0052cc] transition-colors shrink-0"
              >
                View all products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

          </div>
        </section>

        {/* ── Training Preview ──────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-10 xl:px-16 lg:py-32 bg-[#f5f5f7]">
          <div className="max-w-[1440px] mx-auto">

            <div className="flex flex-col gap-4 mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
              <SectionHeading
                eyebrow="Courses & Workshops"
                title="Professional Training"
                subtitle="Structured programmes designed for real-world application — online, in-person, and hybrid."
              />
              <a
                href="/training"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0066FF] hover:text-[#0052cc] transition-colors shrink-0"
              >
                View all courses
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-6 sm:mb-8">
              {featuredTrainings.map((training) => (
                <TrainingCard key={training.id} training={training} />
              ))}
            </div>

            <div className="bg-[#0B0F19] rounded-2xl p-6 sm:p-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
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
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0B0F19] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                Enquire now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────────────────── */}
        <section id="services" className="py-20 px-6 md:px-10 xl:px-16 lg:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-10 lg:mb-12">
              <SectionHeading
                eyebrow="What We Do"
                title="Creative & Technical Services"
                subtitle="End-to-end delivery from brief to final output — rendering, modelling, AI strategy, and web development."
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {services.map((s) => (
                <ServiceCard key={s.id} service={toServiceCardProps(s)} />
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        {/* ── CTA Section ───────────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-10 xl:px-16 lg:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <div className="relative overflow-hidden bg-[#0B0F19] rounded-[36px] border border-white/[0.08] shadow-[0_30px_80px_rgba(0,0,0,0.08)] px-8 py-14 md:px-14 lg:px-20 lg:py-20 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              <div className="pointer-events-none absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-[#0066FF] opacity-[0.06]" />

              <div className="max-w-[560px]">
                <p className="text-xs font-medium text-white/60 uppercase tracking-[0.25em] mb-3">
                  Get Started Today
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-[1.05] tracking-tight mb-4">
                  Ready to elevate your design workflow?
                </h2>
                <p className="text-base text-slate-300 max-w-[560px] leading-8">
                  Browse our software catalogue, book a training course, or speak with our team about
                  a bespoke project. We respond to all enquiries within one business day.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
                <a
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-[#0B0F19] bg-white rounded-full hover:-translate-y-px transition-all duration-200"
                >
                  Shop Products
                </a>
                <a
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-white/15 rounded-full hover:bg-white/5 transition-all duration-200"
                >
                  Contact Our Team
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />

      </main>
    </>
  );
}