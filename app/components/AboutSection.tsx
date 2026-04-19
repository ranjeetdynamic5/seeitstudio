// About Us Section — Server Component

const stats = [
  { value: "10+", label: "Years in industry" },
  { value: "500+", label: "Products & licences" },
  { value: "2,000+", label: "Students trained" },
  { value: "98%", label: "Client satisfaction" },
];

const highlights = [
  "Authorised SketchUp Reseller & Training Partner",
  "V-Ray, Enscape and D5 Render certified specialists",
  "CPD-accredited training across all skill levels",
  "UK-based team with same-day support response",
  "Bespoke AI tools built for design workflows",
];

export default function AboutSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 xl:gap-24">

          {/* ── Left: Visual Panel ── */}
          <div className="lg:w-[480px] xl:w-[520px] shrink-0">
            <div className="bg-[#0F172A] rounded-2xl overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1.5 bg-[#D9534F]" />

              <div className="p-8 sm:p-10">
                {/* Studio identifier */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-[#0F172A] text-sm font-bold">S</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">SeeIt Studio</p>
                    <p className="text-slate-400 text-xs">Est. 2014 &middot; London, UK</p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
                      <p className="text-xs text-slate-400 leading-snug">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights list */}
                <ul className="flex flex-col gap-3">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 text-[#D9534F] shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-slate-300 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="flex flex-col gap-6 flex-1 min-w-0">
            {/* Eyebrow */}
            <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest">
              About SeeIt Studio
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0B0F19] leading-tight">
              The UK&apos;s dedicated hub for design software, training &amp; creative services
            </h2>

            {/* Body copy */}
            <div className="flex flex-col gap-4 text-[#64748B] leading-relaxed text-sm sm:text-base">
              <p>
                Founded in London, SeeIt Studio has spent over a decade working exclusively with
                architects, designers, and creative studios to improve the way they work. We are
                more than a software reseller — we are a hands-on partner in your digital
                transformation.
              </p>
              <p>
                From SketchUp extensions and professional rendering licences to AI tools and
                bespoke 3D services, everything we offer is chosen or built with one goal: making
                the work of design professionals faster, better, and more enjoyable.
              </p>
              <p>
                Our training programmes are trusted by studios across the UK, from independent
                practitioners to multi-disciplinary agencies. Every course is CPD-accredited and
                delivered by practitioners who work in the industry every day.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
              >
                Contact Us
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B0F19] hover:text-[#D9534F] transition-colors"
              >
                Our story
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
