"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type RevealSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RevealSection({
  children,
  className,
  delay = 0,
}: RevealSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

