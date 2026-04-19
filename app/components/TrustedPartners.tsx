// Trusted Partners — Server Component

import Image from "next/image";

const logos = [
  { src: "/logos/Skp_trimble.png", alt: "SketchUp by Trimble" },
  { src: "/logos/skp_silver.png", alt: "SketchUp Silver Partner" },
  { src: "/logos/skp_authorised.png", alt: "SketchUp Authorised Reseller" },
  { src: "/logos/extensions.png", alt: "SketchUp Extensions" },
  { src: "/logos/mind-site.png", alt: "MindSite" },
  { src: "/logos/flextools.png", alt: "FlexTools" },
  { src: "/logos/skalp.png", alt: "Skalp" },
  { src: "/logos/simlab.png", alt: "SimLab" },
  { src: "/logos/moment_of_inspiration.png", alt: "Moment of Inspiration" },
  { src: "/logos/zwcad.png", alt: "ZWCAD" },
  { src: "/logos/My_arch.png", alt: "MyArch" },
  { src: "/logos/chaos.png", alt: "Chaos (V-Ray)" },
  { src: "/logos/d5_render.png", alt: "D5 Render" },
  { src: "/logos/twinmotion.png", alt: "Twinmotion" },
  { src: "/logos/thea_render.png", alt: "Thea Render" },
  { src: "/logos/supodium.png", alt: "SU Podium" },
  { src: "/logos/3d_connexion.png", alt: "3Dconnexion" },
  { src: "/logos/Dell.png", alt: "Dell" },
   { src: "/logos/HP.png", alt: "HP" },
   { src: "/logos/Lenovo.png", alt: "Lenovo" },
   { src: "/logos/PNY.png", alt: "PNY" },
  { src: "/logos/Nvidia.png", alt: "NVIDIA" },
  { src: "/logos/Radeon.png", alt: "AMD Radeon" },
  { src: "/logos/3skng.png", alt: "3Skeng" },
];

export default function TrustedPartners() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 lg:py-24 bg-[#f0f5fa] border-t border-slate-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs font-semibold text-[#D9534F] uppercase tracking-widest mb-3">
            Our Partners &amp; Affiliations
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#0B0F19] mb-4">
            Trusted by Leading Design &amp; Technology Brands
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            We collaborate with industry-leading software and hardware partners to deliver
            high-quality solutions.
          </p>
        </div>

        {/* Logo grid — no boxes, no borders, logos only
            Mobile:  2 columns
            sm:      3 columns
            lg:      4 columns (strict)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-10 sm:gap-x-12 sm:gap-y-12 lg:gap-x-16 lg:gap-y-14 items-center justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="group flex items-center justify-center w-full"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={230}
                height={70}
                className="h-[67px] w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Trademark note */}
        <p className="text-xs text-slate-400 text-center mt-14">
          All brand names and logos are trademarks of their respective owners.
        </p>

      </div>
    </section>
  );
}
