import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductsPage } from "@/app/products/travel-car/page";
import { getPublishedCategoryBySlug } from "@/lib/categories/repository";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getPublishedCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.seoTitle || `${category.name} Products | TROVANE`,
    description: category.seoDescription || category.description || `Explore ${category.name} products from TROVANE.`,
    alternates: { canonical: `https://buildmetriccalc.com/products/${category.slug}` },
  };
}

export default async function DynamicCategoryPage({ params }: Props) {
  const { category } = await params;
  const publishedCategory = await getPublishedCategoryBySlug(category);
  if (!publishedCategory) notFound();
  return <CategoryProductsPage categorySlug={category} />;
}
