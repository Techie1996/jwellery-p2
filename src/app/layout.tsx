import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const headingFont = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = new URL("https://luxury-crystal-demo.local");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Luxury Crystal Atelier – Timeless Jewelry & Accessories",
    template: "%s | Luxury Crystal Atelier",
  },
  description:
    "A luxury jewelry experience inspired by Swarovski – discover crystal jewelry, watches, and decorations with elegant, editorial design.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Luxury Crystal Atelier – Timeless Jewelry & Accessories",
    description:
      "A luxury jewelry experience inspired by Swarovski – editorial layouts, refined typography, and crystal-inspired visuals.",
    siteName: "Luxury Crystal Atelier",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Crystal Atelier – Timeless Jewelry & Accessories",
    description:
      "A luxury jewelry experience inspired by Swarovski – editorial layouts, refined typography, and crystal-inspired visuals.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Luxury Crystal Atelier",
  url: siteUrl.toString(),
  logo: "/logo-mark.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased bg-page-cream text-neutral-900`}
      >
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="min-h-screen bg-page-cream">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
