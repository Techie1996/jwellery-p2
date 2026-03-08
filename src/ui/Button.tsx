"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
};

const baseClasses =
  "inline-flex items-center justify-center px-8 py-3 text-[13px] tracking-[0.2em] uppercase border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:border-neutral-800",
  secondary:
    "bg-white/90 text-neutral-900 border-neutral-900/10 hover:bg-white hover:border-neutral-900/40",
  outline:
    "bg-transparent text-neutral-900 border-neutral-900/40 hover:bg-neutral-900 hover:text-white",
  ghost:
    "bg-transparent text-neutral-900 border-transparent hover:border-neutral-900/30 hover:bg-neutral-900/5",
};

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

