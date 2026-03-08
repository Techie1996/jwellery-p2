"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Collapsible({ title, children, defaultOpen = false }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-700">
          {title}
        </span>
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-neutral-200 text-[16px] leading-none text-neutral-600"
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
