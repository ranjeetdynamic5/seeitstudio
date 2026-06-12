import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design & Development for Architects UK | Next.js & React | SeeIt Studio",
  description: "Bespoke website design and development for architecture firms, interior designers, and creative studios across the UK. Fast, SEO-optimised sites built with Next.js and React.",
  alternates: { canonical: "https://seeitstudio.com/services/web-development" },
  openGraph: {
    title: "Web Design & Development for UK Architecture Firms | SeeIt Studio",
    description: "Bespoke, conversion-focused websites for architects and design professionals. Built with Next.js for speed and SEO.",
    url: "https://seeitstudio.com/services/web-development",
  },
};

const services = [
  { title: "Architecture Portfolio Websites", description: "Visually stunning portfolio sites that showcase your projects in the best light. Designed to convert visitors into enquiries.", icon: "🏛️" },
  { title: "Interior Design Websites", description: "Elegant, image-led websites for interior design studios. Optimised for mobile, fast-loading, and built to rank on Google.", icon: "🛋️" },
  { title: "E-commerce for Design Professionals", description: "Online stores for selling software licences, digital products, training courses, and services. Secure, scalable, and easy to manage.", icon: "🛒" },
  { title: "SEO-Optimised Landing Pages", description: "Targeted landing pages built to rank for specific keywords and convert traffic from architects, developers, and design firms.", icon: "🔍" },
  { title: "Custom Web Applications", description: "Bespoke web apps built with Next.js and React — from client portals to booking systems, project management tools, and more.", icon: "⚙️" },
  { title: "Website Maintenance & Support", description: "Ongoing support, updates, performance monitoring, and security patches to keep your site fast, secure, and up to date.", icon: "🔧" },
];

const techStack = [
  { name: "Next.js 14", category: "Framework" },
  { name: "React", category: "UI Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Supabase", category: "Database" },
  { name: "Vercel", category: "Hosting" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Stripe", category: "Payments" },
];

const faqs = [
  { q: "How long does a website take to build?", a: "A standard portfolio or brochure website typically takes 4–8 weeks. Complex web applications with custom functionality may take 10–16 weeks. We'll give you a clear timeline upfront." },
  { q: "Will my site be optimised for Google?", a: "Yes — SEO is built into every site we deliver. This includes technical SEO, semantic HTML structure, fast page speeds, Core Web Vitals optimisation, and on-page keyword strategy." },
  { q: "Can I update the site myself?", a: "Yes — we build an admin panel tailored to your needs so you can manage content, add projects, update pricing, and publish blog posts without needing a developer." },
  { q: "Do you work with architecture firms outside the UK?", a: "Yes — we work with clients globally. Our core market is the UK, but we've delivered projects for studios in Europe, the Middle East, and North America." },
  { q: "What makes you different from a general web agency?", a: "We build exclusively for design and architecture professionals. We understand the visual standards expected in this industry and we build accordingly. We also bring in-house 3D and AI expertise that a standard agency can't offer." },
];

export default function WebDevelopmentPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="bg-[#092145] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">Web Development</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Website Design & Development for UK Architects & Designers
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                Bespoke, fast, SEO-optimised websites built with Next.js and React. Designed specifically for architecture firms, interior designers, and creative studios who need more than a template.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
                  Discuss Your Website
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#0a1628] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {[
                { value: "Next.js", label: "Built with the best framework" },
                { value: "< 1s", label: "Target page load time" },
                { value: "SEO-first", label: "Built to rank on Google" },
                { value: "Scalable", label: "Grows with your business" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 gap-1 text-center">
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">Services</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">Everything you need to win online</h2>
              <p className="text-[#64748B] leading-relaxed">From portfolio sites to complex web applications, we deliver digital products that work hard for your business.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-base font-semibold text-[#092145] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">Technology</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">Built with modern, scalable technology</h2>
              <p className="text-[#64748B] leading-relaxed">We use the same stack as the world's best digital products — fast, secure, and built to scale.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {techStack.map((tech) => (
                <div key={tech.name} className="bg-[#f8fafc] rounded-xl p-4 border border-slate-200 text-center">
                  <p className="text-sm font-semibold text-[#092145]">{tech.name}</p>
                  <p className="text-xs text-[#64748B] mt-1">{tech.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="text-3xl font-bold text-[#092145] mb-10">Common questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-slate-200 pb-6">
                  <h3 className="text-base font-semibold text-[#092145] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#092145]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to build something great?</h2>
            <p className="text-white/60 mb-8 leading-relaxed">Tell us about your project. We'll come back with ideas, a scope, and a fixed price. No obligation.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
              Start Your Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}