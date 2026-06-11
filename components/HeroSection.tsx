"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const SLIDES = [
  {
    desktop: "/hero/SKP_2026.webp",
    mobile: "/hero/SKP_2026_mob.webp",
    alt: "SketchUp 2026",
  },
  {
    desktop: "/hero/D5-banner.webp",
    mobile: "/hero/D5-banner_mob.webp",
    alt: "D5 Render",
  },
  {
    desktop: "/hero/Arch-banner.webp",
    mobile: "/hero/Arch-banner_mob.webp",
    alt: "Architecture Services",
  },
];

const STATS = [
  { value: "10+", label: "Years in industry" },
  { value: "500+", label: "Products & licences" },
  { value: "2,000+", label: "Students trained" },
  { value: "98%", label: "Client satisfaction" },
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
    <section className="w-full bg-[#092145]">

      {/* ── Main Hero ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center gap-8 lg:gap-12 py-12 lg:py-16">

          {/* Left — Text + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 flex flex-col gap-6 lg:max-w-[520px]"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Authorised UK Reseller & Training Partner
              </span>
            </div>

            {/* Headline — visible h1 for SEO */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] tracking-tight">
              The UK&apos;s #1 Hub for{" "}
              <span className="text-[#0066FF]">SketchUp Software</span>,
              Training &amp; 3D Design Services
            </h1>

            {/* Subtext */}
            <p className="text-base text-white/55 leading-relaxed max-w-md">
              Authorised SketchUp reseller and certified training partner — serving architects, designers, and studios across the UK since 2014.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-semibold rounded-lg hover:bg-[#0052cc] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
                Shop Software
              </Link>
              <Link
                href="/training"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.08] text-white text-sm font-semibold rounded-lg hover:bg-white/[0.14] border border-white/[0.15] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                Explore Training
              </Link>
            </div>
          </motion.div>

          {/* Right — Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex-1 relative w-full lg:max-w-[600px]"
          >
            <div className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[280px] lg:h-[360px] bg-black">
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
                          sizes="(max-width: 1024px) 100vw, 600px"
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

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="border-t border-white/[0.15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.15]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.08 }}
                className="flex flex-col items-center justify-center py-6 px-4 gap-1"
              >
                <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-white/40 text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}