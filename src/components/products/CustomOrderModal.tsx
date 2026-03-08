"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { submitCustomOrder } from "@/lib/api";
import type { Product } from "@/lib/products";

type CustomOrderModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

type Step = 1 | 2 | 3;

export function CustomOrderModal({ product, isOpen, onClose }: CustomOrderModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customization: "",
    quantity: 1,
    notes: "",
    name: "",
    email: "",
    phone: "",
    shippingCountry: "",
    message: "",
  });

  function updateField<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleClose() {
    setStep(1);
    setStatus("idle");
    setError(null);
    setFormData({
      customization: "",
      quantity: 1,
      notes: "",
      name: "",
      email: "",
      phone: "",
      shippingCountry: "",
      message: "",
    });
    onClose();
  }

  async function handleSubmit() {
    setStatus("submitting");
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    const phoneDigits = formData.phone.replace(/[^\d+]/g, "");
    if (phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      setStatus("error");
      return;
    }

    const response = await submitCustomOrder({
      productSlug: product.slug,
      productName: product.name,
      customization: formData.customization || undefined,
      quantity: formData.quantity,
      notes: formData.notes || undefined,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      shippingCountry: formData.shippingCountry || undefined,
      message: formData.message || undefined,
    });

    if (!response.ok) {
      setError(response.error);
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="custom-order-title"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
        onClick={handleClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-[var(--shadow-xl)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
          <h2 id="custom-order-title" className="font-heading text-[18px] font-medium text-neutral-900">
            Custom Order
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex border-b border-neutral-100">
          {([1, 2, 3] as const).map((s) => (
            <div
              key={s}
              className={`flex-1 py-3 text-center text-[12px] font-medium tracking-wider ${
                step >= s ? "text-neutral-900" : "text-neutral-400"
              }`}
            >
              Step {s}
            </div>
          ))}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <p className="eyebrow text-neutral-500">Product</p>
                  <p className="mt-1 font-heading text-[18px] text-neutral-900">{product.name}</p>
                  <p className="mt-1 text-[14px] text-neutral-600">{product.priceFormatted}</p>
                </div>
                <div>
                  <label className="block text-[12px] font-medium tracking-[0.12em] uppercase text-neutral-600">
                    Customization options
                  </label>
                  <textarea
                    value={formData.customization}
                    onChange={(e) => updateField("customization", e.target.value)}
                    placeholder="e.g. chain length, engraving, stone color..."
                    className="mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-[14px] placeholder:text-neutral-400 focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium tracking-[0.12em] uppercase text-neutral-600">
                    Quantity
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => updateField("quantity", parseInt(e.target.value, 10))}
                    className="mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-[14px] focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-medium tracking-[0.12em] uppercase text-neutral-600">
                    Additional notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Any special requests..."
                    className="mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-[14px] placeholder:text-neutral-400 focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                    rows={2}
                  />
                </div>
                <Button className="w-full" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <Input
                  label="Full name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  placeholder="you@example.com"
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  required
                  placeholder="+91 98765 43210"
                />
                <Input
                  label="Shipping country"
                  value={formData.shippingCountry}
                  onChange={(e) => updateField("shippingCountry", e.target.value)}
                  placeholder="India"
                />
                <Textarea
                  label="Message (optional)"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Any questions or special instructions..."
                  rows={3}
                />
                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)}>
                    Review order
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {status === "success" ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-[20px] text-neutral-900">Thank you</h3>
                    <p className="mt-2 text-[14px] text-neutral-600">
                      Your custom order has been received. Our team will contact you shortly.
                    </p>
                    <Button className="mt-6" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50/50 p-4 space-y-2">
                      <p className="font-medium text-neutral-900">{product.name}</p>
                      <p className="text-[14px] text-neutral-600">{product.priceFormatted}</p>
                      {formData.customization && (
                        <p className="text-[13px] text-neutral-800">
                          <span className="font-medium">Customization:</span> {formData.customization}
                        </p>
                      )}
                      <p className="text-[13px] text-neutral-800">
                        <span className="font-medium">Quantity:</span> {formData.quantity}
                      </p>
                      <p className="text-[13px] text-neutral-800">
                        <span className="font-medium">Contact:</span> {formData.name}, {formData.email}
                      </p>
                    </div>
                    {error && (
                      <p className="text-[13px] text-red-600" role="alert">
                        {error}
                      </p>
                    )}
                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={handleSubmit}
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Submitting..." : "Submit order"}
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
