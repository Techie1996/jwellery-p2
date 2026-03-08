"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { Button } from "@/ui/Button";
import { submitProductInquiry } from "@/lib/api";

type ProductDetailClientProps = {
  product: Product;
  related: Product[];
};

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setError(null);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !phone || !message) {
      setError("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    const phoneDigits = phone.replace(/[^\d+]/g, "");
    if (phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      setStatus("error");
      return;
    }

    const response = await submitProductInquiry({
      name,
      email,
      phone,
      company: company || undefined,
      message,
    });

    if (!response.ok) {
      setError(response.error);
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pb-24 pt-10"
    >
      <div className="page-shell grid gap-16 lg:grid-cols-[1.1fr,0.9fr]">
        {/* gallery */}
        <section aria-label="Product images" className="grid gap-6 lg:grid-cols-[90px,1fr]">
          <div className="flex space-x-3 lg:flex-col lg:space-y-3 lg:space-x-0">
            {product.images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`group relative aspect-square overflow-hidden border ${
                  activeIndex === index
                    ? "border-neutral-900"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
                aria-label={`Thumbnail ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden border border-neutral-200 bg-white">
            <Image
              src={product.images[activeIndex]?.src ?? product.images[0]?.src}
              alt={product.images[activeIndex]?.alt ?? product.images[0]?.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
              priority
            />
          </div>
        </section>

        {/* detail & inquiry form */}
        <section>
          <header className="mb-6 border-b border-neutral-200 pb-4">
            <p className="eyebrow mb-1 text-neutral-600">{product.category}</p>
            <h1 className="font-heading text-[28px] leading-tight text-neutral-900">
              {product.name} set
            </h1>
            <p className="mt-3 text-[18px] font-medium text-neutral-900">
              {product.priceFormatted}
            </p>
          </header>

          <div className="space-y-6 border-b border-neutral-200 pb-6">
            <div>
              <h2 className="mb-2 text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-700">
                Delivery options
              </h2>
              <div className="space-y-2 text-[13px] text-neutral-800">
                <p>Delivery to address — Available online</p>
                <p>Find in store — Click &amp; Collect availability</p>
              </div>
            </div>
            <div>
              <h2 className="mb-2 text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-700">
                Highlights
              </h2>
              <ul className="list-disc space-y-1 pl-5 text-[13px] leading-relaxed text-neutral-800">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          <form
            action={handleSubmit}
            className="mt-6 space-y-4"
            aria-labelledby="inquiry-heading"
          >
            <h2
              id="inquiry-heading"
              className="text-[15px] font-semibold tracking-[0.16em] uppercase text-neutral-900"
            >
              Request more information
            </h2>
            <p className="text-[13px] leading-relaxed text-neutral-700">
              Share your details and requirements and our team will contact you with
              styling advice, availability, and pricing information.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" required />
              <Field label="Company (optional)" name="company" />
            </div>

            <Field
              label="Message / Requirements"
              name="message"
              required
              as="textarea"
              rows={4}
            />

            {error && (
              <p className="text-[13px] text-red-700" role="alert">
                {error}
              </p>
            )}
            {status === "success" && (
              <p className="text-[13px] text-emerald-700" role="status">
                Thank you. Your inquiry has been received.
              </p>
            )}

            <div className="pt-2">
              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Submit inquiry"}
              </Button>
            </div>
          </form>
        </section>
      </div>

      {/* Complete the Look */}
      {product.completeLookSlugs && product.completeLookSlugs.length > 0 && (
        <section className="mt-20 bg-[#f4eee3] py-16">
          <div className="page-shell">
            <h2 className="section-title mb-8 text-[24px]">Complete the Look</h2>
            <div className="grid gap-8 md:grid-cols-4">
              {related
                .filter((item) => product.completeLookSlugs?.includes(item.slug))
                .slice(0, 4)
                .map((item) => (
                  <a
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="flex flex-col bg-white transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={item.images[0]?.src ?? "/products/placeholder.jpg"}
                        alt={item.images[0]?.alt ?? item.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-[1.04]"
                      />
                    </div>
                    <div className="border-x border-b border-neutral-200 px-5 pb-6 pt-5">
                      <p className="mb-1 text-[11px] tracking-[0.18em] uppercase text-neutral-600">
                        New
                      </p>
                      <h3 className="mb-1 text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
                        {item.name}
                      </h3>
                      <p className="text-[13px] text-neutral-800">
                        {item.priceFormatted}
                      </p>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="mt-20 bg-[#f2ebdd] py-16">
          <div className="page-shell">
            <h2 className="section-title mb-8 text-[24px]">You May Also Like</h2>
            <div className="grid gap-8 md:grid-cols-4">
              {related.map((item) => (
                <a
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="flex flex-col bg-white transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={item.images[0]?.src ?? "/products/placeholder.jpg"}
                      alt={item.images[0]?.alt ?? item.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="border-x border-b border-neutral-200 px-5 pb-6 pt-5">
                    <h3 className="mb-1 text-[13px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
                      {item.name} set
                    </h3>
                    <p className="text-[13px] text-neutral-800">
                      {item.priceFormatted}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
};

function Field({ label, name, type = "text", required, as = "input", rows }: FieldProps) {
  const id = `field-${name}`;
  const Component = as === "textarea" ? "textarea" : "input";

  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-[12px] font-medium tracking-[0.16em] uppercase text-neutral-700"
      >
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      <Component
        id={id}
        name={name}
        required={required}
        rows={rows}
        className="w-full border border-neutral-300 bg-white px-3 py-2 text-[13px] leading-relaxed text-neutral-900 shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-200 focus:border-neutral-900 focus:shadow-[0_8px_24px_rgba(0,0,0,0.06)] focus:outline-none"
        aria-required={required}
        aria-label={label}
        type={as === "input" ? type : undefined}
      />
    </div>
  );
}

