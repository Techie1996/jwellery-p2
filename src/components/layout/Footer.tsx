"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CUSTOMER_SERVICE_LINKS = [
  { label: "Customer Service", href: "/" },
  { label: "Order Status", href: "/" },
  { label: "Shipping", href: "/" },
  { label: "Returns & Exchange", href: "/" },
  { label: "Contact Us", href: "/" },
  { label: "Size Guide", href: "/" },
];

const SHOP_LINKS = [
  { label: "Jewelry", href: "/collections/jewelry" },
  { label: "Wedding Jewelry", href: "/collections/wedding" },
  { label: "Watches", href: "/collections/watches" },
  { label: "Gifts", href: "/collections/gifts" },
];

const ABOUT_LINKS = [
  { label: "About Us", href: "/" },
  { label: "Careers", href: "/" },
  { label: "Sitemap", href: "/" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/" },
  { label: "Privacy Policy", href: "/" },
  { label: "Cookie Policy", href: "/" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "Pinterest", href: "https://pinterest.com", icon: "pinterest" },
];

function FooterColumn({
  title,
  links,
  className = "",
}: {
  title: string;
  links: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="mb-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[13px] leading-relaxed text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSectionCollapsible({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-700 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-left text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90"
      >
        {title}
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-neutral-700 text-[16px] leading-none text-white/80"
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-2 text-[13px] text-neutral-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-900 lg:mt-24">
      <div className="page-shell">
        {/* Desktop: compact grid */}
        <div className="hidden gap-8 border-b border-neutral-700 py-8 lg:grid lg:grid-cols-[1.5fr,1fr,1fr,1fr]">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-[20px] tracking-[0.28em] text-white">
                LUXURY CRYSTAL
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-neutral-400">
              Timeless jewelry and accessories crafted with precision and elegance.
            </p>
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-white"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Customer Service" links={CUSTOMER_SERVICE_LINKS} />
          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <div className="space-y-6">
            <FooterColumn title="About" links={ABOUT_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        {/* Mobile: collapsible sections */}
        <div className="py-6 lg:hidden">
          <FooterSectionCollapsible title="Shop" links={SHOP_LINKS} />
          <FooterSectionCollapsible title="Customer Service" links={CUSTOMER_SERVICE_LINKS} />
          <FooterSectionCollapsible title="About" links={ABOUT_LINKS} />
          <FooterSectionCollapsible title="Legal" links={LEGAL_LINKS} />
          <div className="border-b border-neutral-700 py-4">
            <Link href="/" className="font-heading text-[18px] tracking-[0.2em] text-white">
              LUXURY CRYSTAL
            </Link>
            <p className="mt-2 text-[12px] text-neutral-400">
              Timeless jewelry and accessories.
            </p>
            <div className="mt-3 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white"
                  aria-label={social.label}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact + Copyright: compact */}
        <div className="flex flex-col gap-3 border-b border-neutral-700 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[13px] text-neutral-400">
            <span className="font-medium text-white">Contact</span> support@luxurycrystal.com · +91 1800 123 4567
          </div>
          <p className="text-[12px] tracking-wider text-neutral-500">India · English</p>
        </div>
        <div className="py-4">
          <p className="text-[12px] text-neutral-500">
            © {new Date().getFullYear()} Luxury Crystal Atelier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const size = 18;
  if (name === "instagram") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (name === "pinterest") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
      </svg>
    );
  }
  return null;
}
