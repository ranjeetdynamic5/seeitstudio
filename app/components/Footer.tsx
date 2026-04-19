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
    <footer className="bg-[#0F172A] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid
            Mobile:  1 column (brand, then each nav group stacked)
            sm:      2 columns (brand full-width, nav groups in 2-col grid)
            lg:      6 columns (brand spans 2, 4 nav groups take 1 each)
        */}
        <div className="py-12 lg:py-16 border-b border-white/10">
          {/* Brand row — always full width, sits above nav on mobile */}
          <div className="mb-10 lg:hidden">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                <span className="text-[#0F172A] text-sm font-bold">S</span>
              </div>
              <span className="text-white font-semibold text-base tracking-tight">SeeIt Studio</span>
            </a>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs mb-5">
              UK-based digital studio providing software, training, and creative services to design
              professionals and businesses worldwide.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="mailto:hello@seeitstudio.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
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

          {/* Nav groups — 2 cols on mobile/tablet, stays inside lg grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:hidden">
            {Object.entries(footerNav).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
                  {group}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop: 6-column grid with brand spanning 2 */}
          <div className="hidden lg:grid lg:grid-cols-6 lg:gap-10">
            {/* Brand — spans 2 cols */}
            <div className="col-span-2">
              <a href="/" className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#0F172A] text-sm font-bold">S</span>
                </div>
                <span className="text-white font-semibold text-base tracking-tight">SeeIt Studio</span>
              </a>
              <p className="text-sm leading-relaxed text-slate-400 max-w-xs mb-6">
                UK-based digital studio providing software, training, and creative services to design
                professionals and businesses worldwide.
              </p>
              <div className="flex flex-col gap-2.5 text-sm">
                <a href="mailto:hello@seeitstudio.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
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
                <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">
                  {group}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:gap-0">
            <p className="text-sm text-slate-500">
              &copy; {CURRENT_YEAR} SeeIt Studio Ltd. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">
              Registered in England &amp; Wales &middot; Company No. 12345678
            </p>
          </div>
          {/* Legal links — wrap on mobile */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {legal.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
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
