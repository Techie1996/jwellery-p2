"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/common/RevealSection";
import { Button } from "@/ui/Button";
import { products } from "@/lib/products";

export function WeddingJewelryClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pb-24 pt-10"
    >
      <div className="page-shell space-y-20">
        <RevealSection className="grid gap-10 bg-white px-10 pb-16 pt-12 lg:grid-cols-[1.3fr,1fr] lg:px-16">
          <div className="flex flex-col justify-center">
            <p className="eyebrow mb-2 text-neutral-700">
              Wedding Jewelry & Accessories
            </p>
            <h1 className="section-title mb-3 text-[40px]">
              Radiant designs for your big day
            </h1>
            <p className="text-[15px] leading-relaxed text-neutral-700">
              Fall in love with beautiful designs infused with the brilliance of
              crystals. From subtle shimmer to all-out glamour, there&apos;s a piece to
              complement every wedding style and bridal look.
            </p>
          </div>
          <div className="relative h-[360px] overflow-hidden">
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
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col bg-white"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f3ec]">
                  <Image
                    src={product.images[0]?.src}
                    alt={product.images[0]?.alt ?? product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="border-x border-b border-neutral-200 bg-white px-5 pb-6 pt-5">
                  <h3 className="mb-1 text-[14px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
                    {product.name} set
                  </h3>
                  <p className="mb-2 text-[13px] text-neutral-700">
                    {product.description}
                  </p>
                  <p className="text-[13px] font-medium text-neutral-900">
                    {product.priceFormatted}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="space-y-6 bg-[#f2ebdd] px-10 py-10 lg:px-16">
          <h2 className="section-title">Styling Inspiration</h2>
          <p className="max-w-3xl text-[14px] leading-relaxed text-neutral-700">
            Explore crystal-embellished necklaces, earrings, and bracelets that add
            luminous sparkle to bridal gowns, bridesmaid dresses, and modern city-hall
            looks alike. Layer delicate chains, stack tennis bracelets, or pair classic
            pearls with contemporary silhouettes for a personalized bridal style.
          </p>
          <Button variant="ghost" className="w-max">
            Shop all wedding jewelry
          </Button>
        </RevealSection>
      </div>
    </motion.div>
  );
}

