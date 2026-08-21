import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/app/products/_components/product-detail-page";
import { getProductBySlug } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);
  if (!product) return {};
  const url = `https://buildmetriccalc.com/products/${product.category.slug}/${product.slug}`;
  return {
    title: product.seoTitle || `${product.name} | TROVANE`,
    description: product.seoDescription || product.shortDescription || product.fullDescription || undefined,
    alternates: { canonical: url },
  };
}

export default async function DynamicProductDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
