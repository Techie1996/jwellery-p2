"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/common/RevealSection";
import { Button } from "@/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";

export function WeddingJewelryClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pb-24 pt-8 sm:pt-12"
    >
      <div className="page-shell space-y-20">
        <RevealSection className="grid gap-10 rounded-xl bg-white px-6 py-12 shadow-[var(--shadow-sm)] sm:px-10 lg:grid-cols-[1.3fr,1fr] lg:px-16">
          <div className="flex flex-col justify-center">
            <p className="eyebrow mb-2 text-neutral-600">
              Wedding Jewelry & Accessories
            </p>
            <h1 className="section-title mb-3 text-[36px] sm:text-[40px]">
              Radiant designs for your big day
            </h1>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Fall in love with beautiful designs infused with the brilliance of
              crystals. From subtle shimmer to all-out glamour, there&apos;s a piece to
              complement every wedding style and bridal look.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto lg:h-[360px]">
            <Image
              src="https://picsum.photos/seed/wedding-hero/1400/900"
              alt="Model wearing pink crystal wedding necklace and earrings"
              fill
              className="object-cover"
              priority
            />
          </div>
        </RevealSection>

        <RevealSection className="space-y-8">
          <h2 className="section-title">Featured Wedding Sets</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                detail={product.description}
              />
            ))}
          </div>
        </RevealSection>

        <RevealSection className="space-y-6 rounded-xl bg-cream-dark px-6 py-12 sm:px-10 lg:px-16">
          <h2 className="section-title">Styling Inspiration</h2>
          <p className="max-w-3xl text-[14px] leading-relaxed text-neutral-700">
            Explore crystal-embellished necklaces, earrings, and bracelets that add
            luminous sparkle to bridal gowns, bridesmaid dresses, and modern city-hall
            looks alike. Layer delicate chains, stack tennis bracelets, or pair classic
            pearls with contemporary silhouettes for a personalized bridal style.
          </p>
          <Link href="/jewelry">
            <Button variant="ghost" className="w-max">
              Shop all wedding jewelry
            </Button>
          </Link>
        </RevealSection>
      </div>
    </motion.div>
  );
}

