export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  slug: string;
  name: string;
  priceFormatted: string;
  description: string;
  images: ProductImage[];
  highlights: string[];
  category: string;
  collection: string;
  completeLookSlugs?: string[];
  materials?: string[];
  specifications?: Record<string, string>;
  craftsmanship?: string;
  inspiration?: string;
  designStory?: string;
  reviews?: ProductReview[];
};

export const products: Product[] = [
  {
    slug: "matrix-set-crystal-pearl-round-cut-white-rhodium-plated",
    name: "Matrix set",
    priceFormatted: "₹ 15,900.00",
    description:
      "A truly iconic set, this beautiful Matrix pairing includes a pendant necklace and stud earrings featuring luminous crystal pearls, framed with delicate pavé detailing for a soft, romantic statement.",
    category: "Wedding Jewelry & Accessories",
    images: [
      {
        src: "https://picsum.photos/seed/matrix-main/900/1200",
        alt: "Model wearing Matrix set necklace with crystal pearl pendant",
      },
      {
        src: "https://picsum.photos/seed/matrix-detail-1/900/1200",
        alt: "Close-up of Matrix set pendant with crystal pearl and pavé",
      },
      {
        src: "https://picsum.photos/seed/matrix-detail-2/900/1200",
        alt: "Matrix set earrings and necklace laid flat on soft background",
      },
      {
        src: "https://picsum.photos/seed/matrix-detail-3/900/1200",
        alt: "Side profile of model wearing Matrix set jewelry",
      },
    ],
    highlights: [
      "Crystal pearl, round cut, white",
      "Rhodium plated finish",
      "Necklace and stud earrings set",
      "Refined bridal-ready silhouette",
    ],
    collection: "jewelry",
    completeLookSlugs: [
      "swan-pendant-mixed-cuts-swan-white-rose-gold-tone-plated",
      "hyperbola-bangle-watch-swiss-made-metal-bracelet",
    ],
    materials: ["Crystal pearl", "Rhodium-plated metal", "Pavé-set crystals"],
    specifications: {
      "Chain length": "Adjustable 40–45 cm",
      "Earring length": "12 mm",
      "Closure": "Lobster clasp",
    },
    craftsmanship:
      "Each piece is hand-finished by our master craftsmen. The crystal pearls are precision-cut to maximize light refraction, and the pavé setting is applied using traditional techniques passed down through generations.",
    inspiration:
      "Inspired by the timeless elegance of bridal silhouettes. The Matrix collection draws from the soft geometry of Art Deco, reimagined for the modern bride who seeks subtle sophistication.",
    designStory:
      "The Matrix set was conceived in our atelier in 2020, born from a desire to create something that brides could wear from ceremony to reception. Our design team spent eighteen months perfecting the balance between the crystal pearl and the delicate pavé frame—each element must complement the other without overwhelming.",
    reviews: [
      {
        id: "r1",
        author: "Priya Sharma",
        rating: 5,
        text: "Absolutely stunning for my wedding. The quality exceeded my expectations. Received so many compliments!",
        date: "2025-02-14",
      },
      {
        id: "r2",
        author: "Ananya R.",
        rating: 5,
        text: "Elegant and timeless. The crystal pearls catch the light beautifully. Perfect for bridal wear.",
        date: "2025-01-28",
      },
      {
        id: "r3",
        author: "Meera K.",
        rating: 4,
        text: "Beautiful set. Would have liked the chain to be slightly longer, but overall very satisfied.",
        date: "2024-12-10",
      },
    ],
  },
  {
    slug: "swan-bracelet-mixed-cuts-swan-white-rose-gold-tone-plated",
    name: "Swan bracelet",
    priceFormatted: "₹ 11,900.00",
    description:
      "A graceful bracelet featuring the iconic swan motif in shimmering mixed-cut crystals on a refined chain.",
    category: "Jewelry",
    images: [
      {
        src: "https://picsum.photos/seed/swan-bracelet-main/900/1200",
        alt: "Model wearing swan bracelet with rose gold-tone chain",
      },
      {
        src: "https://picsum.photos/seed/swan-bracelet-detail-1/900/1200",
        alt: "Close-up of swan bracelet charm",
      },
    ],
    highlights: [
      "Mixed cuts, Swan motif",
      "Rose gold-tone plated",
      "Adjustable bracelet chain",
    ],
    collection: "jewelry",
    completeLookSlugs: [
      "swan-pendant-mixed-cuts-swan-white-rose-gold-tone-plated",
      "matrix-vittore-ring-round-cut-white-rose-gold-tone-plated",
    ],
    materials: ["Mixed-cut crystals", "Rose gold-tone plated metal"],
    specifications: {
      "Chain length": "Adjustable 16–18 cm",
      "Charm size": "18 mm",
    },
    craftsmanship:
      "The swan motif is hand-set with over 40 individual crystals, each cut and placed to create a lifelike silhouette. The rose gold-tone finish is applied in multiple layers for lasting brilliance.",
    inspiration:
      "The swan motif has been a symbol of grace and elegance for centuries. Our interpretation captures that poise in crystal form.",
    designStory:
      "Our swan design emerged from years of studying the graceful movement of swans. We wanted to capture that essence in a wearable piece—something that feels both classic and contemporary.",
    reviews: [
      {
        id: "r4",
        author: "Riya M.",
        rating: 5,
        text: "Gorgeous bracelet! The swan charm is so delicate and sparkly. Perfect for layering.",
        date: "2025-03-01",
      },
      {
        id: "r5",
        author: "Sneha P.",
        rating: 4,
        text: "Beautiful craftsmanship. The adjustable chain is a nice touch.",
        date: "2025-02-20",
      },
    ],
  },
  {
    slug: "swan-pendant-mixed-cuts-swan-white-rose-gold-tone-plated",
    name: "Swan pendant",
    priceFormatted: "₹ 12,900.00",
    description:
      "An elegant pendant with pavé-set crystals forming a luminous swan, suspended from a delicate chain.",
    category: "Jewelry",
    images: [
      {
        src: "https://picsum.photos/seed/swan-pendant-main/900/1200",
        alt: "Swan pendant necklace with sparkling crystals",
      },
    ],
    highlights: [
      "Mixed-cut clear crystals",
      "Rose gold-tone plated chain",
      "Adjustable chain length",
    ],
    collection: "jewelry",
    materials: ["Crystal pavé", "Rose gold-tone plated chain"],
    specifications: {
      "Chain length": "Adjustable 40–45 cm",
      "Pendant size": "22 mm",
    },
    craftsmanship:
      "The pendant features intricate pavé work where each crystal is individually set for maximum sparkle. Our artisans ensure every stone is aligned for optimal light reflection.",
    inspiration:
      "Inspired by the serene beauty of swans gliding across water—a symbol of purity and elegance.",
    designStory:
      "The Swan pendant was designed to be a versatile companion—from everyday elegance to special occasions. Its adjustable chain allows it to be worn at multiple lengths.",
    reviews: [
      {
        id: "r6",
        author: "Kavya S.",
        rating: 5,
        text: "Stunning piece. Wears beautifully with the swan bracelet. Highly recommend!",
        date: "2025-02-28",
      },
    ],
  },
  {
    slug: "hyperbola-bangle-watch-swiss-made-metal-bracelet",
    name: "Hyperbola bangle watch",
    priceFormatted: "₹ 30,000.00",
    description:
      "A sculptural bangle watch with a crystal-set bezel and sleek bracelet, designed for evening glamour.",
    category: "Watches",
    images: [
      {
        src: "https://picsum.photos/seed/hyperbola-watch-main/900/1200",
        alt: "Hyperbola bangle watch with metal bracelet",
      },
    ],
    highlights: [
      "Swiss Made movement",
      "Metal bracelet with crystal detailing",
      "Water resistant",
    ],
    collection: "watches",
    materials: ["Stainless steel", "Crystal-set bezel", "Swiss quartz movement"],
    specifications: {
      "Case diameter": "28 mm",
      "Water resistance": "3 ATM",
      "Movement": "Swiss quartz",
    },
    craftsmanship:
      "Each Hyperbola watch is assembled in Switzerland. The crystal bezel is set by hand, ensuring each stone sits perfectly in its setting.",
    inspiration:
      "The Hyperbola curve—a mathematical shape of infinite elegance—inspired the fluid lines of this timepiece.",
    designStory:
      "We wanted to blend Swiss precision with crystal artistry. The Hyperbola bangle watch emerged from that vision—a piece that tells time as beautifully as it adorns the wrist.",
    reviews: [
      {
        id: "r7",
        author: "Divya N.",
        rating: 5,
        text: "Elegant and timeless. The crystal detailing is exquisite. Worth every rupee.",
        date: "2025-01-15",
      },
    ],
  },
  {
    slug: "matrix-vittore-ring-round-cut-white-rose-gold-tone-plated",
    name: "Matrix Vittore ring",
    priceFormatted: "₹ 7,790.00",
    description:
      "A refined band ring embellished with a row of shimmering round-cut crystals for everyday brilliance.",
    category: "Jewelry",
    images: [
      {
        src: "https://picsum.photos/seed/matrix-ring-main/900/1200",
        alt: "Matrix Vittore ring with round-cut crystals",
      },
    ],
    highlights: [
      "Round-cut crystals in shared setting",
      "Rose gold-tone plated band",
      "Stackable silhouette",
    ],
    collection: "jewelry",
    materials: ["Round-cut crystals", "Rose gold-tone plated band"],
    specifications: {
      "Band width": "4 mm",
      "Ring sizes": "Available 52–62",
    },
    craftsmanship:
      "The shared setting technique allows each crystal to sit flush with its neighbor, creating a seamless band of light. Our ring specialists work to precise tolerances.",
    inspiration:
      "Inspired by the clean lines of modern architecture—simple, geometric, and effortlessly chic.",
    designStory:
      "The Matrix Vittore ring was designed for stacking. Wear it alone for understated elegance, or layer with other pieces for a personalized look.",
    reviews: [
      {
        id: "r8",
        author: "Neha T.",
        rating: 5,
        text: "Perfect stackable ring. I have three and wear them together. Love it!",
        date: "2025-02-05",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  const match = products.find((p) => p.slug === slug);
  return match ?? products[0];
}

export function getRelatedProducts(currentSlug: string): Product[] {
  const current = products.find((p) => p.slug === currentSlug);
  return products.filter(
    (p) => p.slug !== currentSlug && (!current || p.collection === current.collection),
  );
}
