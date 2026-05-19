import Link from 'next/link'

const SERVICES = [
  {
    slug: 'architectural-rendering',
    title: 'Architectural Rendering',
    description: 'Studio-grade photorealistic renders for exterior, interior, aerial and animation projects.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    slug: '3d-modelling',
    title: '3D Modelling',
    description: 'Precision 3D models for architecture, interior design, product development and BIM.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
  {
    slug: 'ai-consulting',
    title: 'AI Consulting',
    description: 'Embed artificial intelligence into your design workflow and gain a competitive edge.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    description: 'Professional websites built for architects and design practices that win new clients.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
]

export default function ExploreServices({ currentSlug }: { currentSlug: string }) {
  return (
    <section className="bg-[#F7F9FA] border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#0088cc] uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B0F19] tracking-tight">Explore Other Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service) => {
            const isCurrent = service.slug === currentSlug
            if (isCurrent) {
              return (
                <div
                  key={service.slug}
                  className="rounded-2xl bg-[#00334e] p-6 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center mb-5 shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed flex-1">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#f0a500] uppercase tracking-widest">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Current page
                  </span>
                </div>
              )
            }
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-2xl bg-white border border-[#e2e8f0] p-6 flex flex-col hover:shadow-md hover:border-[#c7d2dc] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e0f0f8] text-[#00527d] flex items-center justify-center mb-5 shrink-0 group-hover:bg-[#00334e] group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-[#0B0F19] mb-2 group-hover:text-[#00334e] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed flex-1">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00527d] group-hover:text-[#00334e] transition-colors">
                  Learn more
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
