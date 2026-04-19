// Testimonials — Server Component

const testimonials = [
  {
    quote:
      "SeeIt Studio's SketchUp extensions have genuinely transformed our workflow. The team knew exactly what design professionals need, and the support has been outstanding.",
    name: "Andrew Fielding",
    role: "Senior Architect",
    company: "Fielding & Associates, London",
    initials: "AF",
    rating: 5,
  },
  {
    quote:
      "We enrolled our entire visualisation team in the rendering training. The quality was exceptional — structured, practical, and immediately applicable to live projects.",
    name: "Claire Donovan",
    role: "Head of Visualisation",
    company: "Blueprint Studios, Manchester",
    initials: "CD",
    rating: 5,
  },
  {
    quote:
      "Their AI consulting engagement helped us identify exactly where automation could save time. We reduced manual output by 40% within six weeks of implementation.",
    name: "Raj Patel",
    role: "Operations Director",
    company: "Vertex Design Group, Birmingham",
    initials: "RP",
    rating: 5,
  },
];

const trustedBy = [
  "Foster + Partners",
  "Arup",
  "BDP",
  "Gensler UK",
  "Atkins",
  "Jacobs",
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 lg:py-24 bg-[#f0f5fa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-xl mb-10 lg:mb-14">
          <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-3">
            Client Testimonials
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0B0F19] mb-4">
            Trusted by UK design professionals
          </h2>
          <p className="text-[#64748B] leading-relaxed text-sm sm:text-base">
            From independent architects to enterprise design teams, our customers rely on SeeIt Studio
            for software, training, and specialist services.
          </p>
        </div>

        {/* Testimonial Cards — 1 col → 2 col sm → 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 lg:mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#0B0F19] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center text-xs font-semibold text-white shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B0F19]">{t.name}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {t.role} &middot; {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By */}
        <div className="border-t border-slate-200 pt-10">
          <p className="text-xs font-semibold text-[#64748B] uppercase tracking-widest text-center mb-7">
            Trusted by teams at
          </p>
          {/* Grid on mobile for clean alignment, flex on md+ */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap sm:justify-center gap-y-4 sm:gap-x-10 sm:gap-y-4">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="text-sm font-medium text-slate-400 hover:text-[#64748B] transition-colors text-center"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
