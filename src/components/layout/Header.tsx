"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  {
    key: "created-diamonds",
    label: "Swarovski Created Diamonds",
    href: "/",
  },
  { key: "world-of-swarovski", label: "World of Swarovski", href: "/" },
  { key: "outlet", label: "Outlet", href: "/" },
];

export function Header() {
  const pathname = usePathname();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeKey =
    pathname === "/"
      ? "new-in"
      : pathname.startsWith("/jewelry") ||
        pathname.startsWith("/wedding-jewelry") ||
        pathname.startsWith("/products/")
      ? "jewelry"
      : null;

  const hoveredItem: NavLink | null =
    hoveredKey !== null
      ? NAV_ITEMS.find((item) => item.key === hoveredKey && item.mega) ?? null
      : null;

  return (
    <header
      className={`w-full border-b border-neutral-200/60 bg-[#f9f3e7] transition-all duration-300 ${
        isScrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      {/* shipping bar */}
      {!isScrolled && (
        <div className="border-b border-neutral-200/70 bg-white/60 text-center text-[11px] tracking-[0.2em] uppercase text-neutral-700">
          <div className="page-shell py-2">
            Free standard shipping over INR 5,990.00
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
          <Link
            href="/"
            className="text-[11px] tracking-[0.28em] uppercase text-neutral-700"
          >
            Stores
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <span className="font-heading text-[32px] tracking-[0.32em] text-neutral-900">
              SWAROVSKI
            </span>
          </motion.div>
          <div className="flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-neutral-700">
            <button className="hover:text-neutral-900">Swarovski Club</button>
            <button className="hover:text-neutral-900">Login</button>
            <div className="flex items-center gap-3">
              <button aria-label="Search" className="hover:text-neutral-900">
                <span className="inline-block h-4 w-4 rounded-full border border-neutral-800" />
              </button>
              <button aria-label="Cart" className="hover:text-neutral-900">
                <span className="inline-block h-3 w-5 border border-neutral-800" />
              </button>
            </div>
          </div>
        </div>

        {/* nav row */}
        <nav className="flex items-center justify-center pb-1 pt-1">
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

        {hoveredItem?.mega && (
          <div className="mt-3 border-t border-neutral-200 bg-[#fdf7ec] px-10 pb-10 pt-8">
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
                          <Link href={link.href} className="hover:text-neutral-900">
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
                  <div className="relative aspect-[3/5] w-full overflow-hidden bg-[#f9e3ec]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hoveredItem.mega.featured.imageSrc}
                      alt={hoveredItem.mega.featured.label}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-neutral-600">
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
    </header>
  );
}

