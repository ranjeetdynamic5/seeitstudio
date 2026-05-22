"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const SLIDES = [
  {
    desktop: "/hero/SKP_2026.webp",
    mobile: "/hero/SKP_2026_mob.webp",
    alt: "SketchUp 2026",
    title: "Professional 3D Design",
    subtitle: "SketchUp 2026 Training & Software",
  },
  {
    desktop: "/hero/D5-banner.webp",
    mobile: "/hero/D5-banner_mob.webp",
    alt: "D5 Render",
    title: "Architectural Rendering",
    subtitle: "Create stunning visuals with D5 Render",
  },
  {
    desktop: "/hero/Arch-banner.webp",
    mobile: "/hero/Arch-banner_mob.webp",
    alt: "Architecture Services",
    title: "Architecture & Visualization",
    subtitle: "Premium design services for modern projects",
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-black">
      <h1 className="sr-only">
        SeeIt Studio — UK's Leading 3D Design Software, Training & Creative Services | SketchUp, V-Ray, Enscape & Web Development for Architects and Designers
      </h1>
      {/* Carousel */}
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div className="min-w-full relative h-full" key={i}>
              {/* Desktop Image */}
              <motion.div
                initial={{ scale: 1.04, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="hidden md:block relative w-full h-full"
              >
                <Image
                  src={slide.desktop}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>

              {/* Mobile Image */}
              <motion.div
                initial={{ scale: 1.04, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                className="md:hidden relative w-full h-full"
              >
                <Image
                  src={slide.mobile}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="cursor-pointer py-1"
          >
            <motion.div
              animate={{
                width: selectedIndex === i ? 18 : 5,
                opacity: selectedIndex === i ? 1 : 0.4,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-[2px] rounded-full bg-white"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
