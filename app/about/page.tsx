import Link from "next/link";
import NavHeader from "@/app/components/NavHeader";
import Footer from "@/app/components/Footer";

// ── Data ──────────────────────────────────────────────────────────────────────

const WHAT_WE_DO = [
  {
    title: "Software Solutions",
    description:
      "We supply and support professional design software — SketchUp, V-Ray, Enscape, and more — as an authorised UK reseller.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
      </svg>
    ),
  },
  {
    title: "Training",
    description:
      "Expert-led courses in SketchUp, LayOut, rendering tools, and extensions — delivered online and in person across the UK.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: "Consulting",
    description:
      "Practical advice on software selection, workflow optimisation, and digital transformation for design and architecture practices.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    title: "Web & AI Services",
    description:
      "We build professional websites and develop AI-powered tools to help studios work smarter and present their work more effectively.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
];

const WHY_CHOOSE_US = [
  {
    title: "Trusted by UK professionals",
    description:
      "We work with architects, interior designers, and product studios across the UK who rely on us for software, training, and support.",
  },
  {
    title: "Certified training partner",
    description:
      "As an authorised SketchUp reseller and certified training provider, our courses meet industry standards and come with a certificate of completion.",
  },
  {
    title: "35+ years of industry experience",
    description:
      "Our founder brings decades of hands-on experience in CAD, BIM, and 3D design — not just theory, but real-world project knowledge.",
  },
  {
    title: "Reliable, ongoing support",
    description:
      "We don't disappear after the sale. Clients get access to continued support, whether for software issues, training follow-up, or project advice.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "About — SeeIt Studio",
  description:
    "SeeIt Studio is a UK-based design technology company offering software, training, consulting, and digital services for architecture and design professionals.",
};

export default function AboutPage() {
  return (
    <>
      <NavHeader />

      <main className="pt-20 md:pt-32 min-h-screen bg-[#f8fafc]">

        {/* ── Page header ──────────────────────────────────────────────────── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#0B0F19] transition-colors">Home</Link>
              <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <span className="text-[#0B0F19] font-medium">About</span>
            </nav>

            <div className="max-w-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0F19]">
                About SeeIt Studio
              </h1>
              <p className="mt-3 text-base text-[#64748B] leading-relaxed">
                Helping designers, architects, and businesses turn ideas into reality — through
                professional software, expert training, and practical digital services.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col gap-16">

          {/* ── Founder section ────────────────────────────────────────────── */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* Founder card */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#0F172A] px-6 py-8 flex flex-col items-start gap-3">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">James Ogston</h2>
                    <p className="text-sm text-[#D9534F] font-medium mt-0.5">
                      3D Digital Design Intelligence Coach
                    </p>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  {[
                    { label: "Experience", value: "35+ years" },
                    { label: "Specialisms", value: "CAD, BIM, SketchUp" },
                    { label: "Location", value: "United Kingdom" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-xs font-semibold text-[#64748B] uppercase tracking-widest">{item.label}</span>
                      <span className="text-sm font-medium text-[#0B0F19]">{item.value}</span>
                    </div>
                  ))}
                  <a
                    href="mailto:jamesogston@seeit3d.co.uk"
                    className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
                  >
                    Get in touch
                  </a>
                </div>
              </div>

              {/* Founder bio */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-3">
                    Our founder
                  </p>
                  <h2 className="text-2xl font-bold text-[#0B0F19] tracking-tight mb-4">
                    35 years of design technology expertise
                  </h2>
                  <div className="flex flex-col gap-4 text-sm text-[#64748B] leading-relaxed">
                    <p>
                      James Ogston founded SeeIt Studio with a clear focus: to help design and
                      architecture professionals work more effectively with the tools available to them.
                      With over 35 years of hands-on experience in CAD, BIM, and 3D design, James has
                      worked across a wide range of sectors — from residential and commercial architecture
                      to product design and construction.
                    </p>
                    <p>
                      His background spans early CAD adoption through to today&apos;s real-time rendering
                      and AI-assisted workflows. He has trained hundreds of professionals across the UK
                      and developed a reputation for clear, practical instruction that connects directly
                      to real project requirements — not just software features.
                    </p>
                    <p>
                      As a certified SketchUp trainer and authorised reseller, James brings both the
                      technical knowledge and the consulting perspective needed to help studios choose
                      the right tools, adopt them effectively, and get lasting value from their
                      investment.
                    </p>
                  </div>
                </div>

                {/* Credential badges */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    "Authorised SketchUp Reseller",
                    "Certified Trainer",
                    "BIM Experienced",
                    "UK-Based",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0F19] bg-white border border-slate-200 rounded-full"
                    >
                      <svg className="w-3.5 h-3.5 text-[#D9534F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── What we do ─────────────────────────────────────────────────── */}
          <section>
            <div className="mb-8">
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                What we do
              </p>
              <h2 className="text-2xl font-bold text-[#0B0F19] tracking-tight">
                A focused range of specialist services
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHAT_WE_DO.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-white shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#0B0F19] mb-1.5">{item.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Why choose us ──────────────────────────────────────────────── */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div>
                <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                  Why choose us
                </p>
                <h2 className="text-2xl font-bold text-[#0B0F19] tracking-tight mb-3">
                  Built on experience and trust
                </h2>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  We&apos;re not a large agency. We&apos;re a specialist studio with deep domain knowledge,
                  and that means every client gets direct access to genuine expertise.
                </p>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {WHY_CHOOSE_US.map((item) => (
                  <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-[#0B0F19]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#64748B] leading-relaxed pl-9">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* ── CTA strip ────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-[#0F172A] rounded-2xl px-6 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-2">
                Let&apos;s work together
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                Ready to start a conversation?
              </h2>
              <p className="text-sm text-slate-400 max-w-md">
                Whether you need software, training, or a new website — we&apos;re happy to talk through
                your requirements and find the right approach.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:03331212187"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white rounded-lg hover:bg-slate-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                0333 121 2187
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
