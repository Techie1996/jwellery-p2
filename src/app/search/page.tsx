"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import { searchProducts } from "@/lib/products";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState(searchProducts(q));

  useEffect(() => {
    setQuery(q);
    setResults(searchProducts(q));
  }, [q]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const term = (e.target as HTMLFormElement).querySelector("input")?.value?.trim() ?? "";
      if (term) router.push(`/search?q=${encodeURIComponent(term)}`);
    },
    [router]
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-neutral-300 bg-white py-4 pl-5 pr-12 text-[16px] text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-600/20"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {q ? (
        <>
          <p className="mb-6 text-[14px] text-neutral-600">
            {results.length} {results.length === 1 ? "result" : "results"} for &quot;{q}&quot;
          </p>
          {results.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  detail={product.description.slice(0, 70) + (product.description.length > 70 ? "…" : "")}
                />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-neutral-600">
              No products found. Try a different search term.
            </p>
          )}
        </>
      ) : (
        <p className="py-12 text-center text-neutral-500">
          Enter a search term to find products (e.g. necklace, watch, crystal).
        </p>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pb-24 pt-8 sm:pt-12"
    >
      <div className="page-shell">
        <Suspense fallback={<div className="py-12 text-center text-neutral-500">Loading search…</div>}>
          <SearchContent />
        </Suspense>
      </div>
    </motion.div>
  );
}
