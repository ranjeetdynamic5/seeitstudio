"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

const SLIDES = [
  { desktop: "/hero/SKP_2026.webp", mobile: "/hero/SKP_2026_mob.webp", alt: "SketchUp 2026" },
  { desktop: "/hero/D5-banner.webp", mobile: "/hero/D5-banner_mob.webp", alt: "D5 Render" },
  { desktop: "/hero/Arch-banner.webp", mobile: "/hero/Arch-banner_mob.webp", alt: "Architecture Services" },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // 🔁 autoplay
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative w-full h-[650px] overflow-hidden">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div className="min-w-full relative h-full" key={i}>
              
              {/* Desktop */}
              <div className="hidden md:block relative w-full h-full">
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>

              {/* Mobile */}
              <div className="md:hidden relative w-full h-full">
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-4">
            AI, 3D & Web Solutions for Designers
          </h1>
          <p className="mb-6 text-lg text-gray-300">
            Trusted tools and training for UK professionals
          </p>
          <a
            href="/products"
            className="inline-block bg-[#d9534f] px-6 py-3 rounded-lg font-semibold"
          >
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
}