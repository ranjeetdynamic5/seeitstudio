// Hero Content Section — Server Component
// Sits directly below the slider

const stats = [
  { value: "500+", label: "Products & Licences" },
  { value: "2,000+", label: "Students Trained" },
  { value: "UK-Based", label: "Support Team" },
  { value: "10+ yrs", label: "Industry Experience" },
];

export default function HeroContent() {
  return (
    <section className="bg-[#0F172A] px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F] inline-block shrink-0" />
            <span className="text-xs font-medium text-slate-300 tracking-wide">
              UK-Based Digital Studio &amp; Software Marketplace
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight tracking-tight mb-5">
            Software, Training &amp;{" "}
            <span className="text-[#D9534F]">Creative Services</span>{" "}
            for Design Professionals
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
            SeeIt Studio provides SketchUp extensions, rendering tools, AI software, professional
            training programmes, and bespoke creative services — all under one roof for UK and
            international design teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-sm font-semibold text-white bg-[#D9534F] rounded-lg hover:bg-[#c9302c] transition-colors"
            >
              Browse Products
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <a
              href="/training"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 text-sm font-semibold text-slate-200 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
            >
              Explore Training
            </a>
          </div>

          {/* Trust stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-4 sm:gap-x-8 mt-10 pt-8 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-lg sm:text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
