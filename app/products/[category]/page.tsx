import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductsPage } from "@/app/products/travel-car/page";
import { getPublishedProductsByCategory } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const products = await getPublishedProductsByCategory(slug);
  const category = products[0]?.category;
  if (!category) return {};
  return {
    title: `${category.name} Products | TROVANE`,
    description: category.description || `Explore ${category.name} products from TROVANE.`,
    alternates: { canonical: `https://buildmetriccalc.com/products/${category.slug}` },
  };
}

export default async function DynamicCategoryPage({ params }: Props) {
  const { category } = await params;
  const products = await getPublishedProductsByCategory(category);
  if (!products.length) notFound();
  return <CategoryProductsPage categorySlug={category} />;
}
