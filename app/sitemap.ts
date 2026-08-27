import type { MetadataRoute } from "next";
import { getPublishedCategories } from "@/lib/categories/repository";
import { buyerProductGuideSlugs } from "@/lib/blog/buyer-product-guides";
import { getPublishedProducts } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

const siteUrl = "https://buildmetriccalc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getPublishedCategories(),
    getPublishedProducts(),
  ]);

  return [
    "/",
    "/products",
    "/rfq",
    "/catalog",
    "/blog",
    "/blog/pet-travel-accessories-wholesale-buying-guide",
    ...buyerProductGuideSlugs.map((slug) => `/blog/${slug}`),
    "/resources",
    "/resources/pet-carrier-oem-buying-guide",
    "/resources/pet-product-moq-samples",
    "/resources/private-label-pet-packaging",
    "/resources/pet-product-quality-shipping",
    ...categories.map((category) => `/products/${category.slug}`),
    ...products.map((product) => `/products/${product.category.slug}/${product.slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
