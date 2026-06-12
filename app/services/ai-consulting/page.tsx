import type { Metadata } from "next";
import NavHeader from "@/components/NavHeader";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Consulting for Architects & Design Firms UK | SeeIt Studio",
  description: "AI consulting and workflow automation for architects, interior designers, and creative studios across the UK. Integrate tools like MyArchitectAI, automate repetitive tasks, and future-proof your design practice.",
  alternates: { canonical: "https://seeitstudio.com/services/ai-consulting" },
  openGraph: {
    title: "AI Consulting for UK Architecture & Design Firms | SeeIt Studio",
    description: "Expert AI consulting for design professionals. Automate workflows, integrate AI tools, and stay ahead in 2026.",
    url: "https://seeitstudio.com/services/ai-consulting",
  },
};

const services = [
  { title: "AI Readiness Assessment", description: "We audit your current workflows, tools, and team capabilities to identify exactly where AI can save time and reduce cost in your practice.", icon: "🔍" },
  { title: "Tool Selection & Integration", description: "Guidance on the right AI tools for your workflow — MyArchitectAI, generative design tools, AI rendering, and automation platforms — with hands-on setup and training.", icon: "🔧" },
  { title: "Workflow Automation", description: "Automate repetitive tasks such as document preparation, client reporting, material scheduling, and project handovers using modern AI-powered systems.", icon: "⚡" },
  { title: "AI-Assisted Design", description: "Incorporate AI-generated concept visuals, facade explorations, and spatial layouts into your early-stage design process using tools like MyArchitectAI and Stable Diffusion.", icon: "🎨" },
  { title: "Team Training & Adoption", description: "Practical, hands-on training for your team so they can use AI tools confidently in day-to-day workflows without disrupting existing processes.", icon: "👥" },
  { title: "Ongoing AI Strategy", description: "Monthly advisory sessions to keep your practice up to date with the rapidly evolving AI landscape and ensure your toolstack continues to deliver ROI.", icon: "📈" },
];

const stats = [
  { value: "45%", label: "of UK AEC firms cite AI adoption as top challenge in 2026" },
  { value: "40%", label: "reduction in admin overhead achievable with AI automation" },
  { value: "94%", label: "of AI-adopting AEC firms plan to increase investment" },
  { value: "2026", label: "the defining year for AI in UK architecture practices" },
];

const faqs = [
  { q: "We're a small practice — is AI consulting relevant for us?", a: "Absolutely. Small practices often see the biggest gains because their workflows are more flexible. Even simple automations can save 5–10 hours per week." },
  { q: "Which AI tools do you recommend for architects?", a: "It depends on your workflow. We commonly recommend MyArchitectAI for concept generation, AI rendering tools like D5 Render and Enscape, and automation platforms for document workflows. We'll recommend the right tools after understanding your practice." },
  { q: "Do we need a large budget?", a: "No. Many of the most impactful AI tools are available on affordable monthly subscriptions. We help you identify the highest-ROI options for your budget." },
  { q: "How is this different from generic IT consulting?", a: "We specialise specifically in architecture and design workflows. We understand SketchUp, Revit, rendering pipelines, and the pressures of practice — and we apply that knowledge directly to AI integration." },
];

export default function AIConsultingPage() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <section className="bg-[#092145] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="text-[#0066FF] text-sm font-semibold uppercase tracking-widest mb-4">AI Consulting</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                AI Consulting for Architects & Design Firms UK
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
                Practical AI integration for architecture and design practices. We help you identify where AI saves time, select the right tools, automate workflows, and train your team — with measurable results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
                  Book a Free AI Readiness Call
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Link>
                <Link href="/training" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/20 border border-white/20 transition-colors">
                  View AI Training Courses
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Market stats */}
        <section className="bg-[#0a1628] border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center justify-center py-6 px-4 gap-1 text-center">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
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
              <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">What We Do</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-4">AI integration built around your practice</h2>
              <p className="text-[#64748B] leading-relaxed">We don't just recommend tools — we implement them, train your team, and measure the results.</p>
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

        {/* Why SeeIt Studio */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">Why SeeIt Studio</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#092145] mb-6">We know architecture. We know AI.</h2>
                <p className="text-[#64748B] leading-relaxed mb-6">
                  Unlike generic IT or AI consultancies, we work exclusively with architects, interior designers, and creative studios. We understand SketchUp workflows, rendering pipelines, BIM processes, and the commercial pressures of running a design practice.
                </p>
                <p className="text-[#64748B] leading-relaxed mb-8">
                  That means our AI recommendations are grounded in real design workflows — not theoretical use cases. We've been supporting UK design professionals for over 10 years, and we bring that depth of knowledge to every AI engagement.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#092145] text-white text-sm font-semibold rounded-lg hover:bg-[#0a1e3a] transition-colors">
                  Book a Free Call
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Design-specific expertise", desc: "We only work with architecture and design practices." },
                  { label: "Tool-agnostic advice", desc: "We recommend what's right for you, not what we're paid to sell." },
                  { label: "Hands-on implementation", desc: "We set up and configure tools, not just advise on them." },
                  { label: "Training included", desc: "Every engagement includes team training for lasting adoption." },
                ].map((item) => (
                  <div key={item.label} className="bg-[#f8fafc] rounded-xl p-5 border border-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/10 flex items-center justify-center mb-3">
                      <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#092145] mb-1">{item.label}</p>
                    <p className="text-xs text-[#64748B]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#0066FF] text-xs font-semibold uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="text-3xl font-bold text-[#092145] mb-10">Questions we get asked</h2>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to bring AI into your practice?</h2>
            <p className="text-white/60 mb-8 leading-relaxed">Book a free 30-minute AI readiness call. We'll assess your current workflows and identify where AI can have the biggest impact.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-[#0052cc] transition-colors">
              Book Free AI Readiness Call
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