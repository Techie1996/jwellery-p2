"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type NavLink = {
  key: string;
  label: string;
  href: string;
  mega?: {
    columns: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    featured?: {
      label: string;
      href: string;
      imageSrc: string;
    };
  };
};

const NAV_ITEMS: NavLink[] = [
  { key: "new-in", label: "New In", href: "/" },
  { key: "jewelry", label: "Jewelry", href: "/jewelry" },
  {
    key: "watches",
    label: "Watches",
    href: "/",
    mega: {
      columns: [
        {
          title: "Women's watches",
          links: [
            { label: "All women's watches", href: "/" },
            { label: "Swiss Made watches", href: "/" },
            { label: "Watch straps", href: "/" },
          ],
        },
        {
          title: "Shop by material",
          links: [
            { label: "Champagne gold-tone", href: "/" },
            { label: "Rose gold-tone", href: "/" },
            { label: "Metal bracelet", href: "/" },
          ],
        },
        {
          title: "Shop by color",
          links: [
            { label: "Pink watches", href: "/" },
            { label: "Silver-tone watches", href: "/" },
            { label: "White watches", href: "/" },
          ],
        },
        {
          title: "Shop by collection",
          links: [
            { label: "Crystalline Aura", href: "/" },
            { label: "Matrix Bangle", href: "/" },
            { label: "Our Picks", href: "/" },
          ],
        },
      ],
      featured: {
        label: "Timeless Watches",
        href: "/",
        imageSrc: "https://picsum.photos/seed/timeless-watches/520/720",
      },
    },
  },
  { key: "accessories", label: "Accessories", href: "/" },
  { key: "decorations", label: "Decorations", href: "/" },
  { key: "gifts", label: "Gifts", href: "/" },
  { key: "wedding", label: "Wedding", href: "/wedding-jewelry" },
  { key: "outlet", label: "Outlet", href: "/" },
];

export function Header() {
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const activeKey =
    pathname === "/"
      ? "new-in"
      : pathname.startsWith("/jewelry")
        ? "jewelry"
        : pathname.startsWith("/wedding-jewelry")
          ? "wedding"
          : pathname.startsWith("/products/")
            ? "jewelry"
            : null;

  const hoveredItem: NavLink | null =
    hoveredKey !== null
      ? NAV_ITEMS.find((item) => item.key === hoveredKey && item.mega) ?? null
      : null;

  return (
    <header
      className={`w-full border-b border-neutral-200/60 bg-cream-warm transition-all duration-300 ${
        isScrolled ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      {/* shipping bar */}
      {!isScrolled && (
        <div className="border-b border-neutral-200/70 bg-white/60 text-center text-[11px] tracking-[0.2em] uppercase text-neutral-600">
          <div className="page-shell py-2.5">
            Free standard shipping over ₹5,990
          </div>
        </div>
      )}

      <div
        className={`page-shell flex flex-col items-stretch gap-3 ${
          isScrolled ? "py-2" : "py-4"
        }`}
        onMouseLeave={() => setHoveredKey(null)}
      >
        {/* logo row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <Link
              href="/"
              className="hidden text-[11px] tracking-[0.28em] uppercase text-neutral-600 transition-colors hover:text-neutral-900 lg:inline-block"
            >
              Stores
            </Link>
          </div>

          <Link href="/" className="text-center">
            <span className="font-heading text-[26px] tracking-[0.28em] text-neutral-900 sm:text-[32px] sm:tracking-[0.32em]">
              LUXURY CRYSTAL
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] tracking-[0.2em] uppercase text-neutral-600">
            <Link href="/" className="hidden hover:text-neutral-900 sm:inline-block">
              Club
            </Link>
            <Link href="/" className="hidden hover:text-neutral-900 sm:inline-block">
              Login
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label="Search"
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center justify-center pb-1 pt-1 lg:flex">
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = item.key === activeKey;
              const isHovered = item.key === hoveredKey;
              return (
                <li
                  key={item.key}
                  onMouseEnter={() => setHoveredKey(item.key)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`nav-link pb-1 ${
                      isActive || isHovered
                        ? "text-neutral-900 after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-neutral-900"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mega menu */}
        {hoveredItem?.mega && (
          <div className="mt-3 hidden border-t border-neutral-200 bg-white/95 px-10 pb-10 pt-8 lg:block">
            <div className="grid gap-10 lg:grid-cols-[3fr,1.4fr]">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {hoveredItem.mega.columns.map((column) => (
                  <div key={column.title} className="space-y-3">
                    <h3 className="text-[12px] font-semibold tracking-[0.18em] uppercase text-neutral-900">
                      {column.title}
                    </h3>
                    <ul className="space-y-1 text-[13px] text-neutral-700">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.href} className="transition-colors hover:text-neutral-900">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {hoveredItem.mega.featured && (
                <Link
                  href={hoveredItem.mega.featured.href}
                  className="group flex flex-col items-start gap-3"
                >
                  <div className="relative aspect-[3/5] w-full overflow-hidden rounded-lg bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hoveredItem.mega.featured.imageSrc}
                      alt={hoveredItem.mega.featured.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                      Our Picks
                    </p>
                    <p className="text-[14px] font-medium text-neutral-900">
                      {hoveredItem.mega.featured.label}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-neutral-900/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-sm overflow-y-auto bg-white shadow-[var(--shadow-xl)] lg:hidden"
              role="dialog"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-1 p-6 pt-16">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 text-[14px] font-medium tracking-wide transition-colors ${
                      item.key === activeKey
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <Link
                    href="/"
                    className="block rounded-lg px-4 py-3 text-[13px] text-neutral-600 hover:bg-neutral-50"
                  >
                    Club
                  </Link>
                  <Link
                    href="/"
                    className="block rounded-lg px-4 py-3 text-[13px] text-neutral-600 hover:bg-neutral-50"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
