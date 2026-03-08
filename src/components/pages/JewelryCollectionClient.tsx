"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/common/RevealSection";
import { Button } from "@/ui/Button";
import { products } from "@/lib/products";

export function JewelryCollectionClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pb-24 pt-10"
    >
      <div className="page-shell space-y-16">
        <RevealSection className="space-y-8 bg-gradient-to-b from-[#2b0004] via-[#4c000f] to-[#f4eee3] px-10 pb-16 pt-14 text-white lg:px-16">
          <div className="max-w-5xl">
            <p className="eyebrow mb-4 text-neutral-200">Home / Jewelry</p>
            <h1 className="font-heading text-[40px] leading-snug tracking-tight">
              Jewelry: Earrings, Bracelets, Necklaces and Rings
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-200/90">
              Looking for wear-forever fashion jewelry? You&apos;ve come to the right
              place. Expect necklaces, earrings, rings, and everything in-between with
              exquisite design details that make a statement, day or night.
            </p>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-neutral-100 sm:grid-cols-[auto_auto_1fr] sm:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary">Filters</Button>
              <Button variant="ghost">Sort by</Button>
            </div>
            <p className="text-[13px] text-neutral-100/80 sm:text-right sm:col-span-2">
              {products.filter((p) => p.collection === "jewelry").length} Results
            </p>
          </div>
        </RevealSection>

        <RevealSection className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((product) => product.collection === "jewelry")
              .map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group flex flex-col bg-white"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f7f0e5]">
                  <Image
                    src={product.images[0]?.src}
                    alt={product.images[0]?.alt ?? product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="border-x border-b border-neutral-200 bg-[#f4eee3] px-5 pb-5 pt-4">
                  <p className="mb-1 text-[11px] tracking-[0.18em] uppercase text-neutral-600">
                    New
                  </p>
                  <h2 className="text-[14px] font-semibold text-neutral-900">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-[13px] text-neutral-700">
                    {product.priceFormatted}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </RevealSection>
      </div>
    </motion.div>
  );
}

