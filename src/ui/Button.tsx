"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "light";
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md px-6 py-3 text-[13px] font-medium tracking-[0.16em] uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800 hover:border-neutral-800 active:scale-[0.98]",
  secondary:
    "bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50",
  outline:
    "bg-transparent text-neutral-900 border border-neutral-400 hover:bg-neutral-900 hover:text-white hover:border-neutral-900",
  ghost:
    "bg-transparent text-neutral-900 border border-transparent hover:bg-neutral-100 hover:border-neutral-200",
  light:
    "bg-white text-neutral-900 border border-white hover:bg-neutral-100 hover:border-neutral-200",
};

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

