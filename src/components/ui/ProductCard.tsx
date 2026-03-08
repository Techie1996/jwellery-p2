"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  detail?: string;
  className?: string;
};

export function ProductCard({ product, detail, className = "" }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group block ${className}`}
    >
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)]"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]?.src ?? "/products/placeholder.jpg"}
            alt={product.images[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        </div>
        <div className="border-t border-neutral-100 px-5 py-5">
          <p className="mb-1 text-[11px] tracking-[0.18em] uppercase text-neutral-500">
            {product.category}
          </p>
          <h3 className="font-heading text-[15px] font-medium tracking-tight text-neutral-900">
            {product.name}
          </h3>
          {detail && (
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-neutral-600">
              {detail}
            </p>
          )}
          <p className="mt-2 text-[14px] font-medium text-neutral-900">
            {product.priceFormatted}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
