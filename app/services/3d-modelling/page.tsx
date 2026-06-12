import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3D Modelling Services UK | SketchUp & BIM Modelling | SeeIt Studio",
  description: "Professional 3D modelling services using SketchUp for architects, interior designers, and construction firms across the UK. BIM-compatible models, concept design, and detailed construction documentation.",
  alternates: { canonical: "https://seeitstudio.com/services/3d-modelling" },
  openGraph: {
    title: "3D Modelling Services UK | SketchUp BIM | SeeIt Studio",
    description: "Expert 3D modelling services with SketchUp for UK architects and designers. BIM-ready, multi-format export, architecture-ready.",
    url: "https://seeitstudio.com/services/3d-modelling",
  },
};

const services = [
  { title: "Concept 3D Modelling", description: "Rapid concept models to explore massing, form, and spatial relationships before committing to detailed design. Ideal for client presentations and planning." },
  { title: "Detailed SketchUp Modelling", description: "Precise, geometry-accurate SketchUp models suitable for rendering, documentation, and client sign-off. Includes materials, textures, and LayOut documentation." },
  { title: "BIM-Compatible Modelling", description: "SketchUp models structured for BIM workflows, with IFC export, component organisation, and compatibility with Revit and AutoCAD pipelines." },
  { title: "Interior Space Modelling", description: "Detailed interior models for residential and commercial projects, including furniture layout, material specification, and lighting setup." },
  { title: "Point Cloud to Model", description: "Convert laser scan point cloud data into accurate SketchUp models using SketchUp Studio's Scan Essentials. Ideal for refurbishment and as-built documentation." },
  { title: "Multi-Format Export", description: "Delivery in your preferred format — .skp, .dwg, .dxf, .ifc, .obj, .fbx. We ensure compatibility with your wider project team and software stack." },
];

const useCases = [
  { label: "Architects", description: "Concept through to detailed design models, LayOut documentation, and planning submission visuals." },
  { label: "Interior Designers", description: "Detailed room models with furniture, materials, and lighting for client presentations and render-ready scenes." },
  { label: "Property Developers", description: "Massing models, site layouts, and render-ready models for marketing and planning applications." },
  { label: "Construction Firms", description: "BIM-compatible models for coordination, clash detection, and construction documentation." },
];

const faqs = [
  { q: "Can you work from 2D drawings or sketches?", a: "Yes — we regularly build 3D models from AutoCAD drawings, PDFs, and even hand sketches. Just share what you have and we'll take it from there." },
  { q: "Are your models compatible with Revit?", a: "We can export to IFC and DWG formats compatible with Revit. For SketchUp Studio projects, we also support direct Revit .rvt import workflows." },
  { q: "How long does modelling take?", a: "A standard residential model typically takes 3–7 working days depending on complexity. We'll give you an accurate timeline after reviewing your brief." },
  { q: "Do you offer ongoing modelling support?", a: "Yes — we work with a number of studios on a retained basis, providing modelling support throughout live projects. Get in touch to discuss your needs." },
];

export default function ModellingPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="bg-[#092145] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">3D Modelling</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                3D Modelling Services for UK Architects & Designers
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                Expert SketchUp modelling for concept design, detailed documentation, BIM coordination, and everything in between. Accurate, multi-format, architecture-ready.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
                  Discuss Your Project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
                <Link href="/training" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-colors">
                  View SketchUp Training
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
                { value: "SketchUp", label: "Primary software" },
                { value: "IFC / DWG", label: "BIM export formats" },
                { value: "LOD 100–400", label: "Model detail levels" },
                { value: "10+", label: "Years SketchUp expertise" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 gap-1">
                  <span className="text-xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-white/40 text-center">{stat.label}</span>
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
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">End-to-end 3D modelling support</h2>
              <p className="text-[#64748B] leading-relaxed">From early concept through to construction-ready documentation, we cover every stage of the 3D modelling process.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-[#092145] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">Who We Work With</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">Built for design professionals</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((item) => (
                <div key={item.label} className="bg-[#f8fafc] rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-base font-semibold text-[#092145] mb-2">{item.label}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Need a 3D model for your project?</h2>
            <p className="text-white/60 mb-8 leading-relaxed">Tell us about your project and we'll come back with a clear scope and price. No obligation.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
              Start a Conversation
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