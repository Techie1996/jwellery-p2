export type ProductImage = {
  src: string;
  alt: string;
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

