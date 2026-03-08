"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

const inputBase =
  "w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-[14px] text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900/10";

export function Input({ label, id, error, className = "", ...props }: InputProps) {
  const inputId = id ?? `input-${label.replace(/\s/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-[12px] font-medium tracking-[0.12em] uppercase text-neutral-600"
      >
        {label}
        {props.required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <input
        id={inputId}
        className={`${inputBase} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-[13px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Textarea({
  label,
  id,
  error,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id ?? `textarea-${label.replace(/\s/g, "-").toLowerCase()}`;
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-[12px] font-medium tracking-[0.12em] uppercase text-neutral-600"
      >
        {label}
        {props.required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      <textarea
        id={inputId}
        className={`${inputBase} min-h-[120px] resize-y ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-[13px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
