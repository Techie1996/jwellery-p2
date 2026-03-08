"use client";

import { motion } from "framer-motion";
import { RevealSection } from "@/components/common/RevealSection";
import { Button } from "@/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/products";

export function JewelryCollectionClient() {
  const jewelryProducts = products.filter((p) => p.collection === "jewelry");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pb-24 pt-8 sm:pt-12"
    >
      <div className="page-shell space-y-16">
        <RevealSection className="space-y-8 rounded-xl bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-700 px-6 py-14 text-white sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4 text-neutral-300">Home / Jewelry</p>
            <h1 className="section-title-lg text-white">
              Jewelry: Earrings, Bracelets, Necklaces and Rings
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-200/90">
              Looking for wear-forever fashion jewelry? You&apos;ve come to the right
              place. Expect necklaces, earrings, rings, and everything in-between with
              exquisite design details that make a statement, day or night.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button variant="secondary">Filters</Button>
            <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10 hover:border-white/50">
              Sort by
            </Button>
            <span className="ml-auto text-[13px] text-neutral-300">
              {jewelryProducts.length} Results
            </span>
          </div>
        </RevealSection>

        <RevealSection className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {jewelryProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                detail={product.description.slice(0, 80) + (product.description.length > 80 ? "…" : "")}
              />
            ))}
          </div>
        </RevealSection>
      </div>
    </motion.div>
  );
}

