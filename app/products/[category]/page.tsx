import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryProductsPage } from "@/app/products/travel-car/page";
import { getPublishedCategoryBySlug } from "@/lib/categories/repository";
import { absoluteUrl, getCategorySeo } from "@/lib/seo/site-keyword-map";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getPublishedCategoryBySlug(slug);
  if (!category) return {};
  const seo = getCategorySeo(category.slug);
  const url = `https://buildmetriccalc.com/products/${category.slug}`;
  const title = seo?.title || category.seoTitle || `${category.name} Products for B2B Buyers | TROVANE`;
  const description = seo?.description || category.seoDescription || category.description || `Explore ${category.name} products and request model-specific sourcing information from TROVANE.`;
  const image = absoluteUrl(category.imageUrl || "/images/categories/travel-car.jpg");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, images: [{ url: image, alt: seo?.imageAlt || category.name }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function DynamicCategoryPage({ params }: Props) {
  const { category } = await params;
  const publishedCategory = await getPublishedCategoryBySlug(category);
  if (!publishedCategory) notFound();
  return <CategoryProductsPage categorySlug={category} />;
}
