"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

const SLIDES = [
  { desktop: "/hero/SKP_2026.webp", mobile: "/hero/SKP_2026_mob.webp", alt: "SketchUp 2026" },
  { desktop: "/hero/D5-banner.webp", mobile: "/hero/D5-banner_mob.webp", alt: "D5 Render" },
  { desktop: "/hero/Arch-banner.webp", mobile: "/hero/Arch-banner_mob.webp", alt: "Architecture Services" },
  { desktop: "/hero/open_bim.webp", mobile: "/hero/open_bim_mob.webp", alt: "Open BIM" },
  { desktop: "/hero/webservices.webp", mobile: "/hero/webservicesr_mob.webp", alt: "Web Services" },
  { desktop: "/hero/zwcad2026.webp", mobile: "/hero/zwcad2026_mob.webp", alt: "ZWCAD 2026" },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // ✅ autoplay
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="w-full bg-black overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">

          {SLIDES.map((slide, i) => (
            <div className="min-w-full" key={i}>

              {/* Desktop */}
              <div className="hidden md:flex w-full aspect-[1920/650] bg-black items-center justify-center relative">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={i === 0}
                />
              </div>

              {/* Mobile */}
              <div className="flex md:hidden w-full aspect-[390/500] bg-black items-center justify-center relative">
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority={i === 0}
                />
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}