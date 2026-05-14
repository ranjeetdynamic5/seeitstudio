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
    <section className="py-20 px-4 sm:px-6 lg:px-8 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-20 xl:gap-28">

          {/* ── Left: Visual Panel ── */}
          <div className="lg:w-[460px] xl:w-[500px] shrink-0">
            <div className="bg-[#f5f5f7] border border-[#e8e8e8] rounded-2xl overflow-hidden shadow-[0_1px_16px_rgba(0,0,0,0.05)]">

              <div className="p-9 sm:p-12">
                {/* Studio identifier */}
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-8 bg-[#1d1d1f] rounded-md flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold tracking-tight">S</span>
                  </div>
                  <div>
                    <p className="text-[#1d1d1f] text-sm font-semibold leading-tight">SeeIt Studio</p>
                    <p className="text-[#6e6e73] text-xs">Est. 2014 &middot; London, UK</p>
                  </div>
                </div>

                {/* Stats grid — editorial hairline style */}
                <div className="grid grid-cols-2 gap-px bg-[#e8e8e8] border border-[#e8e8e8] rounded-xl overflow-hidden mb-10">
                  {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6">
                      <p className="text-3xl font-semibold text-[#1d1d1f] mb-1.5 tracking-tight">{stat.value}</p>
                      <p className="text-xs text-[#6e6e73] leading-normal">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights list */}
                <ul className="flex flex-col gap-3.5">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-[#1d1d1f]/40 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-[#6e6e73] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 h-px bg-[#e8e8e8]" />
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div className="flex flex-col gap-7 flex-1 min-w-0">
            {/* Eyebrow */}
            <p className="text-xs font-medium text-black/35 uppercase tracking-[0.18em]">
              About SeeIt Studio
            </p>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1d1d1f] leading-tight">
              The UK&apos;s dedicated hub for design software, training &amp; creative services
            </h2>

            {/* Body copy */}
            <div className="flex flex-col gap-5 text-[#6b7280] leading-relaxed text-sm sm:text-base">
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

            {/* CTAs */}
            <div className="border-t border-[#ebebeb] pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#1d1d1f] rounded-lg hover:bg-[#3a3a3c] transition-colors"
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
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B0F19] hover:text-black/60 transition-colors"
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
