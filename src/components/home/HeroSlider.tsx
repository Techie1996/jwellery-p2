"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/ui/Button";

const SLIDES = [
  {
    id: "charming",
    eyebrow: "Charming Love",
    title: "Personalize every look with new Swarovski Charms",
    description:
      "Discover radiant heart-shaped charms and crystal accents designed to be mixed, matched, and layered for every romantic moment.",
    ctaPrimary: { label: "Shop now", href: "/collections/jewelry" },
    ctaSecondary: { label: "Discover more", href: "/collections/new-in" },
    image: "https://picsum.photos/seed/hero-charming/1200/800",
    bgClass: "from-rose-50 to-cream-warm",
  },
  {
    id: "wedding",
    eyebrow: "Wedding",
    title: "Radiant designs for your big day",
    description:
      "Fall in love with bridal designs infused with the brilliance of crystals—from subtle shimmer to all-out glamour.",
    ctaPrimary: { label: "Shop wedding", href: "/collections/wedding" },
    ctaSecondary: { label: "View all", href: "/collections/jewelry" },
    image: "https://picsum.photos/seed/hero-wedding/1200/800",
    bgClass: "from-neutral-100 to-cream-warm",
  },
  {
    id: "new-in",
    eyebrow: "New In",
    title: "Latest crystal jewelry & accessories",
    description:
      "Explore our newest arrivals—timeless pieces crafted with precision and elegance.",
    ctaPrimary: { label: "Shop new in", href: "/collections/new-in" },
    ctaSecondary: { label: "Watches", href: "/collections/watches" },
    image: "https://picsum.photos/seed/hero-new/1200/800",
    bgClass: "from-amber-50/80 to-cream-warm",
  },
];

const DURATION_MS = 6000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index]!;

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, DURATION_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden sm:min-h-[75vh] lg:min-h-[85vh]">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgClass} mix-blend-overlay opacity-70`} aria-hidden />
            <div className="absolute inset-0 bg-neutral-900/20" aria-hidden />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="page-shell relative z-10 flex min-h-[70vh] flex-col justify-center py-24 sm:min-h-[75vh] sm:py-28 lg:min-h-[85vh] lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <p className="eyebrow mb-3 text-neutral-700">{slide.eyebrow}</p>
              <h1 className="section-title mb-4 text-white drop-shadow-md sm:text-[36px] lg:text-[40px]">
                {slide.title}
              </h1>
              <p className="mb-6 max-w-lg text-[15px] leading-relaxed text-neutral-200 drop-shadow-sm">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href={slide.ctaPrimary.href}>
                  <Button>{slide.ctaPrimary.label}</Button>
                </Link>
                <Link href={slide.ctaSecondary.href}>
                  <Button variant="secondary" className="border-white/40 bg-white/20 text-white hover:bg-white/30">
                    {slide.ctaSecondary.label}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "w-6 bg-white" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
