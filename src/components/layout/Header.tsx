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
  { key: "new-in", label: "New In", href: "/collections/new-in" },
  { key: "jewelry", label: "Jewelry", href: "/collections/jewelry" },
  {
    key: "watches",
    label: "Watches",
    href: "/collections/watches",
    mega: {
      columns: [
        {
          title: "Women's watches",
          links: [
            { label: "All women's watches", href: "/collections/watches" },
            { label: "Swiss Made watches", href: "/collections/watches?filter=swiss" },
            { label: "Watch straps", href: "/collections/watches" },
          ],
        },
        {
          title: "Shop by material",
          links: [
            { label: "Champagne gold-tone", href: "/collections/watches" },
            { label: "Rose gold-tone", href: "/collections/watches" },
            { label: "Metal bracelet", href: "/collections/watches" },
          ],
        },
        {
          title: "Shop by color",
          links: [
            { label: "Pink watches", href: "/collections/watches" },
            { label: "Silver-tone watches", href: "/collections/watches" },
            { label: "White watches", href: "/collections/watches" },
          ],
        },
        {
          title: "Shop by collection",
          links: [
            { label: "Crystalline Aura", href: "/collections/watches" },
            { label: "Matrix Bangle", href: "/collections/watches" },
            { label: "Our Picks", href: "/collections/watches" },
          ],
        },
      ],
      featured: {
        label: "Timeless Watches",
        href: "/collections/watches",
        imageSrc: "https://picsum.photos/seed/timeless-watches/520/720",
      },
    },
  },
  { key: "accessories", label: "Accessories", href: "/collections/accessories" },
  { key: "decorations", label: "Decorations", href: "/collections/decorations" },
  { key: "gifts", label: "Gifts", href: "/collections/gifts" },
  { key: "wedding", label: "Wedding", href: "/collections/wedding" },
  { key: "outlet", label: "Outlet", href: "/collections/outlet" },
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
      : pathname.startsWith("/collections/jewelry")
        ? "jewelry"
        : pathname.startsWith("/collections/wedding")
          ? "wedding"
          : pathname.startsWith("/collections/watches")
            ? "watches"
            : pathname.startsWith("/collections/")
              ? pathname.split("/")[2] ?? null
              : pathname.startsWith("/products/")
                ? "jewelry"
                : null;

  const hoveredItem: NavLink | null =
    hoveredKey !== null
      ? NAV_ITEMS.find((item) => item.key === hoveredKey && item.mega) ?? null
      : null;

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isTransparent
          ? "absolute left-0 right-0 top-0 z-30 border-b border-white/20 bg-transparent"
          : "sticky top-0 z-30 border-b border-neutral-200/60 bg-white shadow-[var(--shadow-md)]"
      }`}
    >
      {/* shipping bar - hide when transparent */}
      {!isTransparent && (
        <div className="border-b border-neutral-200/70 bg-white/60 text-center text-[11px] tracking-[0.2em] uppercase text-neutral-600">
          <div className="page-shell py-2.5">
            Free standard shipping over ₹5,990
          </div>
        </div>
      )}

      <div
        className={`page-shell flex flex-col items-stretch gap-3 ${
          isTransparent ? "py-3" : isScrolled ? "py-2" : "py-4"
        }`}
        onMouseLeave={() => setHoveredKey(null)}
      >
        {/* logo row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors lg:hidden ${
                isTransparent ? "text-white hover:bg-white/20" : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
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
              href="/collections/new-in"
              className={`hidden text-[11px] tracking-[0.28em] uppercase transition-colors lg:inline-block ${
                isTransparent ? "text-white/90 hover:text-white" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Stores
            </Link>
          </div>

          <Link href="/" className="text-center">
            <span className={`font-heading text-[26px] tracking-[0.28em] sm:text-[32px] sm:tracking-[0.32em] ${
              isTransparent ? "text-white" : "text-neutral-900"
            }`}>
              LUXURY CRYSTAL
            </span>
          </Link>

          <div className={`flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase sm:gap-4 ${
            isTransparent ? "text-white/90" : "text-neutral-600"
          }`}>
            <Link href="/collections/new-in" className={`hidden hover:opacity-90 sm:inline-block ${isTransparent ? "text-white" : "hover:text-neutral-900"}`}>
              Club
            </Link>
            <Link href="/login" className={`hidden hover:opacity-90 sm:inline-block ${isTransparent ? "text-white" : "hover:text-neutral-900"}`}>
              Login
            </Link>
            <Link
              href="/search"
              className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                isTransparent ? "hover:bg-white/20" : "hover:bg-neutral-100 hover:text-neutral-900"
              }`}
              aria-label="Search"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
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
                      isTransparent
                        ? "text-white/90 hover:text-white"
                        : "text-neutral-700 hover:text-neutral-900"
                    } ${
                      isActive || isHovered
                        ? "after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] " + (isTransparent ? "after:bg-white" : "after:bg-neutral-900")
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
            <div className="grid gap-8 lg:grid-cols-[1fr,200px] lg:items-stretch">
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
                  className="group flex min-h-[180px] flex-col items-start gap-2 self-stretch lg:min-h-0"
                >
                  <div className="relative h-full min-h-[180px] w-full flex-1 overflow-hidden rounded-lg bg-neutral-100 lg:min-h-[200px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hoveredItem.mega.featured.imageSrc}
                      alt={hoveredItem.mega.featured.label}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-neutral-500">
                    Our Picks
                  </p>
                  <p className="text-[13px] font-medium text-neutral-900">
                    {hoveredItem.mega.featured.label}
                  </p>
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
              <div className="flex flex-col gap-0 p-4 pt-14">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-[14px] font-medium tracking-wide transition-colors ${
                      item.key === activeKey
                        ? "bg-neutral-100 text-neutral-900"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-0 border-t border-neutral-200 pt-4">
                  <Link href="/search" className="block rounded-lg px-3 py-2.5 text-[13px] text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
                    Search
                  </Link>
                  <Link href="/collections/new-in" className="block rounded-lg px-3 py-2.5 text-[13px] text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
                    Club
                  </Link>
                  <Link href="/login" className="block rounded-lg px-3 py-2.5 text-[13px] text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900">
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
