// Footer — Server Component

const CURRENT_YEAR = new Date().getFullYear();

const footerNav = {
  Products: [
    { label: "SketchUp Extensions", href: "/products/sketchup-extensions" },
    { label: "Rendering Software", href: "/products/rendering-software" },
    { label: "AI Tools", href: "/products/ai-tools" },
    { label: "Other Software", href: "/products/other-software" },
  ],
  Training: [
    { label: "SketchUp Training", href: "/training/sketchup" },
    { label: "Rendering Training", href: "/training/rendering" },
    { label: "AI Training", href: "/training/ai" },
    { label: "Events & Workshops", href: "/training/events" },
  ],
  Services: [
    { label: "Rendering Services", href: "/services/rendering" },
    { label: "3D Modelling", href: "/services/3d-modelling" },
    { label: "AI Consulting", href: "/services/ai-consulting" },
    { label: "Web Development", href: "/services/web-development" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
};

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "GDPR", href: "/gdpr" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Grid ── */}
        <div className="py-14 lg:py-20 border-b border-white/[0.07]">

          {/* Mobile / tablet brand block */}
          <div className="mb-10 lg:hidden">
            <a href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#111111] text-sm font-bold">S</span>
              </div>
              <span className="text-white font-medium text-base tracking-tight">SeeIt Studio</span>
            </a>
            <p className="text-sm leading-relaxed text-white/35 max-w-xs mb-6">
              UK-based digital studio providing software, training, and creative services to design
              professionals and businesses worldwide.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/40">
              <a href="mailto:hello@seeitstudio.co.uk" className="flex items-center gap-2 hover:text-white/70 transition-colors">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                hello@seeitstudio.co.uk
              </a>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                London &amp; Manchester, UK
              </span>
            </div>
          </div>

          {/* Mobile / tablet nav grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:hidden">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-white/50 text-[10px] font-medium uppercase tracking-[0.18em] mb-5">
                  {group}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop 6-column grid */}
          <div className="hidden lg:grid lg:grid-cols-6 lg:gap-12">
            {/* Brand — spans 2 cols */}
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-[#111111] text-sm font-bold">S</span>
                </div>
                <span className="text-white font-medium text-base tracking-tight">SeeIt Studio</span>
              </a>
              <p className="text-sm leading-relaxed text-white/35 max-w-xs mb-7">
                UK-based digital studio providing software, training, and creative services to design
                professionals and businesses worldwide.
              </p>
              <div className="flex flex-col gap-3 text-sm text-white/40">
                <a href="mailto:hello@seeitstudio.co.uk" className="flex items-center gap-2 hover:text-white/70 transition-colors">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  hello@seeitstudio.co.uk
                </a>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  London &amp; Manchester, UK
                </span>
              </div>
            </div>

            {/* Nav columns */}
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-white/50 text-[10px] font-medium uppercase tracking-[0.18em] mb-5">
                  {group}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-white/30">
              &copy; {CURRENT_YEAR} SeeIt Studio Ltd. All rights reserved.
            </p>
            <p className="text-xs text-white/20">
              Registered in England &amp; Wales &middot; Company No. 12345678
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
