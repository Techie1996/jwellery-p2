import { Metadata } from "next";
import { WeddingJewelryClient } from "@/components/pages/WeddingJewelryClient";

export const metadata: Metadata = {
  title: "Wedding Jewelry & Accessories",
  description:
    "Radiant wedding jewelry and accessories infused with the brilliance of crystals – from subtle shimmer to all-out glamour.",
};

export default function WeddingJewelryPage() {
  return <WeddingJewelryClient />;
}

