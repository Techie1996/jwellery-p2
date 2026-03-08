import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionBySlug } from "@/lib/products";
import { CollectionClient } from "@/components/pages/CollectionClient";

type Props = { params: Promise<{ collection: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  const col = getCollectionBySlug(collection);
  if (!col) return {};
  return {
    title: col.name,
    description: `Shop ${col.name} – luxury jewelry and accessories.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;
  const col = getCollectionBySlug(collection);
  if (!col) notFound();
  return <CollectionClient collectionSlug={collection} />;
}
