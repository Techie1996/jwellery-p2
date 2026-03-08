"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { RevealSection } from "@/components/common/RevealSection";
import { Button } from "@/ui/Button";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="pb-24 pt-10"
    >
      <div className="page-shell space-y-24">
        <HeroSection />
        <ShopByCategoryPrimary />
        <ArianaCollaboration />
        <ShopByCategorySecondary />
        <EditorialStories />
      </div>

      <ServicesAndSignup />
    </motion.div>
  );
}

function HeroSection() {
  return (
    <RevealSection className="grid gap-10 rounded-none bg-[#f6e3e4] px-10 pb-16 pt-14 lg:grid-cols-[1.1fr,1.1fr] lg:px-16">
      <div className="flex flex-col justify-center">
        <p className="eyebrow mb-3 text-neutral-700">Charming Love</p>
        <h1 className="section-title mb-4 text-[40px]">
          Personalize every look with new Swarovski Charms
        </h1>
        <p className="max-w-lg text-[15px] leading-relaxed text-neutral-700">
          Discover radiant heart-shaped charms and crystal accents designed to be mixed,
          matched, and layered for every romantic moment.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button>Shop now</Button>
          <Button variant="secondary">Discover more</Button>
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="relative h-[420px] w-[420px] overflow-hidden rounded-full bg-[#c3203f] shadow-[0_40px_80px_rgba(0,0,0,0.25)]">
          <div className="absolute inset-8 rounded-full bg-[#b61a37]" />
          <div className="absolute inset-4 grid grid-cols-2 gap-4">
            {[1011, 1025, 1035, 1043].map((id) => (
              <div
                key={id}
                className="group relative overflow-hidden rounded-[32px] bg-[#b51c37]"
              >
                <Image
                  src={`https://picsum.photos/id/${id}/600/800`}
                  alt="Heart-shaped Swarovski charm"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

function ShopByCategoryPrimary() {
  const items = [
    { label: "Romantic Gifts" },
    { label: "Decorations" },
    { label: "Bracelets" },
    { label: "New In" },
  ];

  return (
    <RevealSection className="space-y-8">
      <h2 className="section-title text-center">Shop by Category</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.label}
            href="/wedding-jewelry"
            className="group flex flex-col bg-white"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f3ec]">
              <Image
                src="https://picsum.photos/seed/romantic/640/800"
                alt={item.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>
            <div className="border-x border-b border-neutral-200 bg-white py-4 text-center text-[13px] tracking-[0.18em] uppercase text-neutral-800">
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </RevealSection>
  );
}

function ArianaCollaboration() {
  return (
    <RevealSection className="grid gap-12 bg-white px-10 py-16 lg:grid-cols-[1.3fr,1fr] lg:px-16">
      <div className="relative h-[340px] overflow-hidden rounded-[40px] bg-gradient-to-tr from-[#80d0f5] via-[#c1f0e4] to-[#f5f2ff]">
        <Image
          src="https://picsum.photos/seed/ariana-fantasy/1200/700"
          alt="Dreamlike floral crystal illustration"
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="eyebrow mb-2">Enter the Fantasy</p>
        <h2 className="section-title mb-3">Ariana Grande x Swarovski</h2>
        <p className="mb-4 text-[15px] leading-relaxed text-neutral-700">
          Discover the new Ariana Grande x Swarovski capsule collection. Become a Club
          member to enjoy access to exclusive pieces before the collection launches.
        </p>
        <p className="mb-6 text-[12px] leading-relaxed text-neutral-600">
          *Exclusive to Club members until June 17, 2026.
        </p>
        <Button variant="outline" className="w-max">
          Sign up
        </Button>
      </div>
    </RevealSection>
  );
}

function ShopByCategorySecondary() {
  const items = ["Jewelry", "Watches", "Decorations", "Accessories"];

  return (
    <RevealSection className="space-y-8">
      <h2 className="section-title text-center">Shop by Category</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {items.map((label) => (
          <Link key={label} href="/" className="group flex flex-col bg-white">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f3ec]">
              <Image
                src={`https://picsum.photos/seed/${encodeURIComponent(label.toLowerCase())}/640/800`}
                alt={label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </div>
            <div className="border-x border-b border-neutral-200 bg-[#f4eee3] py-4 text-center text-[13px] tracking-[0.18em] uppercase text-neutral-800">
              {label}
            </div>
          </Link>
        ))}
      </div>
    </RevealSection>
  );
}

function EditorialStories() {
  const stories = [
    {
      title: "Ocean-Inspired Jewelry",
      description:
        "New jewelry families are beautiful works of artistry that capture the shimmer of crystal pearls and ocean hues.",
    },
    {
      title: "Wedding Jewelry & Accessories",
      description:
        "Fall in love with bridal designs infused with the brilliance of crystals – from subtle shimmer to all-out glamour.",
      href: "/wedding-jewelry",
    },
    {
      title: "Disney The Lion King x Swarovski",
      description:
        "Commemorate a cherished classic with radiant crystal characters that capture every expression.",
    },
  ];

  return (
    <RevealSection className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {stories.map((story) => (
          <article key={story.title} className="group flex flex-col bg-white">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://picsum.photos/seed/editorial-story/900/1100"
                alt={story.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="border-x border-b border-neutral-200 bg-white px-6 pb-8 pt-6">
              <h3 className="mb-2 font-heading text-[20px] leading-snug text-neutral-900">
                {story.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-neutral-700">
                {story.description}
              </p>
              {story.href && (
                <Link
                  href={story.href}
                  className="mt-4 inline-flex text-[12px] tracking-[0.18em] uppercase text-neutral-900 underline underline-offset-4"
                >
                  Shop wedding jewelry
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}

function ServicesAndSignup() {
  const services = [
    {
      title: "Customer Service Live Chat",
      description: "Need help? Speak to our Customer Service team via chat.",
    },
    {
      title: "Book an Appointment in Store",
      description: "Book an appointment with our Crystal Experts in your local store.",
    },
    {
      title: "Customer Service",
      description: "Explore answers to FAQs or connect with our Customer Service team.",
    },
    {
      title: "Gift Services",
      description: "Add a personalized touch to every gift.",
    },
  ];

  return (
    <section className="mt-24 bg-[#f2ebdd] pb-16 pt-14">
      <div className="page-shell space-y-14">
        <div>
          <h2 className="section-title mb-8 text-center">Swarovski Services</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="space-y-3 text-center md:text-left">
                <div className="mx-auto mb-2 h-8 w-8 rounded-full border border-neutral-700/40 md:mx-0" />
                <h3 className="text-[14px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
                  {service.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-700">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-none bg-[#9ac7f0] px-10 py-10 text-center md:px-16">
          <h2 className="mb-3 font-heading text-[24px] tracking-tight text-neutral-900">
            Sign up and get 10% off*
          </h2>
          <p className="mx-auto max-w-2xl text-[14px] leading-relaxed text-neutral-800">
            Be first to receive updates on new collections, style inspiration, gift ideas,
            and exclusive access. Sign up to the Swarovski Club today and receive 10% off*
            on your next online purchase (full-price items only).
          </p>
          <div className="mt-6 flex justify-center">
            <Button>Join the Club</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

