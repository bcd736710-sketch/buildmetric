import type { MetadataRoute } from "next";
import { getPublishedCategories } from "@/lib/categories/repository";
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
    ...categories.map((category) => `/products/${category.slug}`),
    ...products.map((product) => `/products/${product.category.slug}/${product.slug}`),
  ].map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
