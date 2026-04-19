// Hero Section — Server Component

export default function Hero() {
  return (
    <section className="bg-[#0F172A] pt-36 pb-16 px-4 sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Two-column on lg+, single column below */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

          {/* ── Left: Content ── */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6 lg:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9534F] inline-block shrink-0"></span>
              <span className="text-xs font-medium text-slate-300 tracking-wide">
                UK-Based Digital Studio &amp; Software Marketplace
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight tracking-tight mb-5 lg:mb-6">
              Software, Training &amp;{" "}
              <span className="text-[#D9534F]">Creative Services</span>{" "}
              for Design Professionals
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mb-8 lg:mb-10">
              SeeIt Studio provides SketchUp extensions, rendering tools, AI software, professional
              training programmes, and bespoke creative services — all under one roof for UK and
              international design teams.
            </p>

            {/* CTA Buttons — full-width on mobile, auto on sm+ */}
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

            {/* Trust bar — 2-col grid on mobile, inline on sm+ */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-4 sm:gap-x-8 mt-10 pt-8 border-t border-white/10 lg:mt-14 lg:pt-10">
              {[
                { value: "500+", label: "Products & Licences" },
                { value: "2,000+", label: "Students Trained" },
                { value: "UK-Based", label: "Support Team" },
                { value: "10+ yrs", label: "Industry Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-lg sm:text-xl font-semibold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Decorative Panel (lg+ only) ── */}
          <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] shrink-0 flex-col gap-4">
            {/* Feature highlight cards */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-4">
                Why design studios choose us
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  "SketchUp Authorised Reseller & Training Partner",
                  "V-Ray & Enscape certified specialists",
                  "UK-based support with same-day response",
                  "CPD-accredited training programmes",
                  "Bespoke AI tools built for design workflows",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <svg
                      className="w-4 h-4 text-[#D9534F] shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini product preview */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "SketchUp Pro 2025", price: "£299.99", badge: "Best Seller" },
                { label: "V-Ray for SketchUp", price: "£449.00", badge: null },
                { label: "AI Diffusion Studio", price: "£49.99", badge: "New" },
                { label: "Enscape Renderer", price: "£379.00", badge: "Sale" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                      </svg>
                    </div>
                    {p.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-[#D9534F]/20 text-red-300 rounded-full">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-300 leading-snug">{p.label}</p>
                  <p className="text-sm font-semibold text-white">{p.price}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
