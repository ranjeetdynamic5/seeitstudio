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
    <section className="py-20 px-4 sm:px-6 lg:px-8 lg:py-28 bg-[#f5f5f7] border-t border-[#ebebeb]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <p className="text-[10px] font-medium text-[#6b7280] uppercase tracking-[0.18em] mb-4">
            Our Partners &amp; Affiliations
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
            Trusted by Leading Design &amp; Technology Brands
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] max-w-xl mx-auto leading-relaxed">
            We collaborate with industry-leading software and hardware partners to deliver
            high-quality solutions.
          </p>
        </div>

        {/* Logo grid
            Mobile:  2 columns
            sm:      3 columns
            lg:      3 columns
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {logos.map((logo) => (
            <div
              key={logo.src}
              className="group flex items-center justify-center bg-white border border-[#e8e8e8] rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_16px_rgba(0,0,0,0.07)] hover:border-[#d8d8d8] transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={56}
                className="h-14 w-auto object-contain grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Trademark note */}
        <p className="text-xs text-[#6b7280]/50 text-center mt-16">
          All brand names and logos are trademarks of their respective owners.
        </p>

      </div>
    </section>
  );
}
