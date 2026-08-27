import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/app/products/_components/product-detail-page";
import { getProductBySlug } from "@/lib/products/repository";
import { absoluteUrl, getProductSeo } from "@/lib/seo/site-keyword-map";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);
  if (!product) return {};
  const url = `https://buildmetriccalc.com/products/${product.category.slug}/${product.slug}`;
  const seo = getProductSeo(product.category.slug, product.slug);
  const title = seo?.title || product.seoTitle || `${product.name} for B2B Buyers | TROVANE`;
  const description = seo?.description || product.seoDescription || product.shortDescription || `Review ${product.name} details and request model-specific sourcing information from TROVANE.`;
  const image = absoluteUrl(product.mainImageUrl || product.images[0]?.blobUrl || "/trovane-product-carrier-cat.jpg");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image, alt: seo?.imageAlt || product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function DynamicProductDetailPage({ params }: Props) {
  const { category, slug } = await params;
  const product = await getProductBySlug(category, slug);
  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
