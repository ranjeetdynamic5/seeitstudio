import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architectural Rendering Services UK | Photorealistic 3D Visualisation | SeeIt Studio",
  description: "Professional architectural rendering and 3D visualisation services for architects, developers, and interior designers across the UK. Photorealistic exterior and interior renders, walkthroughs, and VR experiences.",
  alternates: { canonical: "https://seeitstudio.com/services/rendering-services" },
  openGraph: {
    title: "Architectural Rendering Services UK | SeeIt Studio",
    description: "Photorealistic 3D architectural rendering and visualisation services for UK architects and developers.",
    url: "https://seeitstudio.com/services/rendering-services",
  },
};

const deliverables = [
  { title: "Exterior Renders", description: "Photorealistic daylight, dusk, and atmospheric renders for planning applications, marketing, and client approvals.", icon: "🏢" },
  { title: "Interior Renders", description: "Detailed interior visualisations with accurate materials, lighting, and furniture for residential and commercial spaces.", icon: "🛋️" },
  { title: "Aerial & Site Views", description: "Bird's-eye renders and site context visualisations for planning submissions and developer presentations.", icon: "🌍" },
  { title: "Animated Walkthroughs", description: "Cinematic walkthroughs and fly-through animations to bring your project to life for clients and stakeholders.", icon: "🎬" },
  { title: "VR Experiences", description: "Immersive virtual reality experiences using Enscape and D5 Render, compatible with Meta Quest headsets.", icon: "🥽" },
  { title: "360° Panoramas", description: "Interactive 360° renders for web embedding, ideal for remote client presentations and immersive reviews.", icon: "🔄" },
];

const process = [
  { step: "01", title: "Brief & Files", description: "Share your SketchUp model, drawings, or reference images. We review and confirm scope, timelines, and deliverables." },
  { step: "02", title: "Lighting & Mood", description: "We set up the scene, lighting environment, and materials based on your brief. A preview draft is shared for approval." },
  { step: "03", title: "Render & Refine", description: "High-resolution renders are produced. Two rounds of revisions are included as standard." },
  { step: "04", title: "Final Delivery", description: "Final images delivered in high resolution (300 DPI print-ready and web-optimised). Fast turnaround from 48 hours." },
];

const faqs = [
  { q: "What file formats do you accept?", a: "We work with SketchUp (.skp), Revit (.rvt), AutoCAD (.dwg), and PDF drawings. If you only have sketches or photos, we can still work with you — just get in touch." },
  { q: "How long does a render take?", a: "Standard exterior renders are typically delivered within 3–5 working days. Rush delivery within 48 hours is available for most projects." },
  { q: "How many revisions are included?", a: "Two rounds of revisions are included with every render. Additional revisions can be arranged if needed." },
  { q: "Do you work with interior designers?", a: "Yes — interior rendering is one of our most popular services. We work with interior designers, developers, and residential architects across the UK." },
  { q: "Can you help with planning applications?", a: "Absolutely. We regularly produce renders specifically for planning submissions, including accurate site context and neighbouring building studies." },
];

export default function RenderingServicesPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="bg-[#092145] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">Rendering Services</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Architectural Rendering & 3D Visualisation Services UK
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                Photorealistic 3D renders, animated walkthroughs, and VR experiences for architects, interior designers, and property developers across the UK. Trusted by studios since 2014.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
                  Get a Free Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-colors">
                  View Rendering Software
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-[#0a1628] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {[
                { value: "48hrs", label: "Rush turnaround" },
                { value: "2", label: "Revisions included" },
                { value: "300 DPI", label: "Print-ready output" },
                { value: "10+", label: "Years experience" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 gap-1">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-white/40 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">What We Deliver</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">Rendering services for every stage of your project</h2>
              <p className="text-[#64748B] leading-relaxed">From concept visuals to photorealistic final renders, we support architects and developers throughout the design and planning process.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {deliverables.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-base font-semibold text-[#092145] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">Simple, fast, revision-inclusive</h2>
              <p className="text-[#64748B] leading-relaxed">A straightforward process designed to minimise back-and-forth and get you high-quality results quickly.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item) => (
                <div key={item.step} className="relative">
                  <div className="text-5xl font-bold text-[#0066FF]/10 mb-3">{item.step}</div>
                  <h3 className="text-base font-semibold text-[#092145] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Software we use */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-6 text-center">Rendering Software We Use</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["V-Ray for SketchUp", "D5 Render", "Enscape", "SketchUp Studio", "Lumion", "Twinmotion"].map((sw) => (
                <span key={sw} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-[#092145]">{sw}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="text-3xl font-bold text-[#092145] mb-10">Frequently asked questions</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-slate-100 pb-6">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to visualise your project?</h2>
            <p className="text-white/60 mb-8 leading-relaxed">Send us your files and brief. We'll come back with a quote and timeline within one business day.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
              Request a Quote
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