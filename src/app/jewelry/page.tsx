import { Metadata } from "next";
import { JewelryCollectionClient } from "@/components/pages/JewelryCollectionClient";

export const metadata: Metadata = {
  title: "Jewelry: Earrings, Bracelets, Necklaces and Rings",
  description:
    "Explore our jewelry collection – earrings, bracelets, necklaces, and rings – with modern silhouettes and radiant crystal details.",
};

export default function JewelryCollectionPage() {
  return <JewelryCollectionClient />;
}

