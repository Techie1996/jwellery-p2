"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { Button } from "@/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { CustomOrderModal } from "./CustomOrderModal";
import { RevealSection } from "@/components/common/RevealSection";

type ProductDetailClientProps = {
  product: Product;
  related: Product[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= rating ? "text-amber-400" : "text-neutral-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const reviews = product.reviews ?? [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pb-24 pt-8 sm:pt-12"
      >
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
            {/* Gallery */}
            <section aria-label="Product images" className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white shadow-[var(--shadow-md)]">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative h-full w-full"
                >
                  <Image
                    src={product.images[activeIndex]?.src ?? product.images[0]?.src ?? ""}
                    alt={product.images[activeIndex]?.alt ?? product.images[0]?.alt ?? product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </motion.div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 sm:h-24 sm:w-24 ${
                      activeIndex === index
                        ? "border-neutral-900 ring-2 ring-neutral-900/20"
                        : "border-neutral-200 hover:border-neutral-400"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Product info */}
            <section className="space-y-6">
              <header>
                <p className="eyebrow text-neutral-500">{product.category}</p>
                <h1 className="mt-2 font-heading text-[28px] leading-tight tracking-tight text-neutral-900 sm:text-[32px]">
                  {product.name}
                </h1>
                <p className="mt-3 text-[18px] font-medium text-neutral-900">{product.priceFormatted}</p>
              </header>

              <p className="text-[15px] leading-relaxed text-neutral-700">{product.description}</p>

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-700">
                    Specifications
                  </h3>
                  <div className="mt-3 space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 text-[14px]">
                        <span className="text-neutral-600">{key}</span>
                        <span className="text-neutral-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-700">
                    Materials
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-neutral-700">
                    {product.materials.join(", ")}
                  </p>
                </div>
              )}

              {/* Highlights */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-700">
                  Highlights
                </h3>
                <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-neutral-700">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-neutral-400">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Craftsmanship */}
              {product.craftsmanship && (
                <div className="border-t border-neutral-200 pt-6">
                  <h3 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-700">
                    Craftsmanship
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-neutral-700">
                    {product.craftsmanship}
                  </p>
                </div>
              )}

              {/* Start Custom Order */}
              <div className="border-t border-neutral-200 pt-6">
                <Button
                  className="w-full py-4 text-[14px]"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  Start Custom Order
                </Button>
                <p className="mt-3 text-[13px] text-neutral-600">
                  Share your requirements and our team will contact you with styling advice,
                  availability, and pricing.
                </p>
              </div>
            </section>
          </div>

          {/* Design Story / Inspiration */}
          {(product.designStory || product.inspiration) && (
            <RevealSection className="mt-24 rounded-xl bg-white px-6 py-12 shadow-[var(--shadow-sm)] sm:px-10 lg:px-16">
              <h2 className="section-title mb-6">The Story Behind the Design</h2>
              <div className="prose prose-neutral max-w-none space-y-6 text-[15px] leading-relaxed">
                {product.designStory && (
                  <p className="text-neutral-700">{product.designStory}</p>
                )}
                {product.inspiration && (
                  <div className="border-t border-neutral-100 pt-6">
                    <h3 className="text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-600">
                      Inspiration
                    </h3>
                    <p className="mt-2 text-neutral-700">{product.inspiration}</p>
                  </div>
                )}
              </div>
            </RevealSection>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <RevealSection className="mt-24">
              <h2 className="section-title mb-8">Customer Reviews</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-lg border border-neutral-200 bg-white p-6 shadow-[var(--shadow-sm)]"
                  >
                    <StarRating rating={review.rating} />
                    <p className="mt-3 text-[14px] leading-relaxed text-neutral-800">
                      {review.text}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[13px] text-neutral-500">
                      <span className="font-medium text-neutral-700">{review.author}</span>
                      <time dateTime={review.date}>
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            </RevealSection>
          )}

          {/* Related Products */}
          {related.length > 0 && (
            <RevealSection className="mt-24">
              <h2 className="section-title mb-8">Related Products</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {related.slice(0, 4).map((item) => (
                  <ProductCard
                    key={item.slug}
                    product={item}
                    detail={item.description.slice(0, 80) + (item.description.length > 80 ? "…" : "")}
                  />
                ))}
              </div>
            </RevealSection>
          )}
        </div>
      </motion.div>

      <CustomOrderModal
        product={product}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
}
