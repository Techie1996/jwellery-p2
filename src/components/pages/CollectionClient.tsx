"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/ui/Button";
import { RevealSection } from "@/components/common/RevealSection";
import {
  getCollectionBySlug,
  getProductsByCollection,
} from "@/lib/products";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

const PER_PAGE = 8;

type CollectionClientProps = {
  collectionSlug: string;
};

export function CollectionClient({ collectionSlug }: CollectionClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sort = (searchParams.get("sort") as "featured" | "price-asc" | "price-desc") || "featured";

  const collection = getCollectionBySlug(collectionSlug);
  const { products: list, total, totalPages } = useMemo(
    () =>
      getProductsByCollection(collectionSlug, {
        sort,
        page,
        perPage: PER_PAGE,
      }),
    [collectionSlug, sort, page]
  );

  const setFilters = useCallback(
    (updates: { page?: number; sort?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.page != null) params.set("page", String(updates.page));
      if (updates.sort != null) params.set("sort", updates.sort);
      router.push(`/collections/${collectionSlug}?${params.toString()}`);
    },
    [collectionSlug, router, searchParams]
  );

  if (!collection) {
    return (
      <div className="page-shell py-24 text-center">
        <p className="text-neutral-600">Collection not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/")}>
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-24 pt-8 sm:pt-12"
    >
      <div className="page-shell space-y-10">
        <RevealSection className="rounded-xl bg-neutral-900 px-6 py-12 text-white sm:px-10 lg:px-16">
          <p className="eyebrow text-neutral-300">Collections</p>
          <h1 className="mt-2 font-heading text-[32px] leading-tight sm:text-[40px]">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-300">
            {total} {total === 1 ? "product" : "products"}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <label className="text-[12px] font-medium tracking-wider text-neutral-400">
              Sort by
            </label>
            <select
              value={sort}
              onChange={(e) => setFilters({ sort: e.target.value, page: 1 })}
              className="rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 text-[14px] text-white focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </RevealSection>

        <RevealSection>
          {list.length === 0 ? (
            <p className="py-16 text-center text-neutral-600">
              No products in this collection yet.
            </p>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    detail={product.description.slice(0, 70) + (product.description.length > 70 ? "…" : "")}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-12 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Pagination"
                >
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setFilters({ page: page - 1 })}
                  >
                    Previous
                  </Button>
                  <span className="px-4 text-[14px] text-neutral-600">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => setFilters({ page: page + 1 })}
                  >
                    Next
                  </Button>
                </nav>
              )}
            </>
          )}
        </RevealSection>
      </div>
    </motion.div>
  );
}
