import "server-only";

import { cache } from "react";
import {
  defaultBlogImage,
  defaultBlogImageAlt,
} from "@/lib/blog/blog-image-defaults";
import { getPublishedProducts } from "@/lib/products/repository";
import type { Product } from "@/lib/products/types";
import { getProductSeo } from "@/lib/seo/site-keyword-map";

type BlogImageSource = {
  image?: string | null;
  imageAlt?: string | null;
  productHref?: string | null;
};

export type ResolvedBlogArticle<T extends BlogImageSource> = T & {
  resolvedImage: string;
  resolvedImageAlt: string;
  fallbackImage: string;
};

type ProductReference = {
  categorySlug: string;
  productSlug: string;
};

function parseProductHref(productHref?: string | null): ProductReference | null {
  if (!productHref) return null;

  const match = productHref.match(/^\/products\/([^/?#]+)\/([^/?#]+)\/?$/);
  if (!match) return null;

  return { categorySlug: match[1], productSlug: match[2] };
}

function productKey(categorySlug: string, productSlug: string) {
  return `${categorySlug}/${productSlug}`;
}

function resolveArticle<T extends BlogImageSource>(
  article: T,
  productsByHref: ReadonlyMap<string, Product>,
): ResolvedBlogArticle<T> {
  const fallbackImage = article.image?.trim() || defaultBlogImage;
  const fallbackAlt = article.imageAlt?.trim() || defaultBlogImageAlt;
  const reference = parseProductHref(article.productHref);
  const product = reference
    ? productsByHref.get(productKey(reference.categorySlug, reference.productSlug))
    : null;
  const productImage = product?.mainImageUrl?.trim();
  const productSeo = product
    ? getProductSeo(product.category.slug, product.slug)
    : null;

  return {
    ...article,
    resolvedImage: productImage || fallbackImage,
    resolvedImageAlt: productImage && product
      ? productSeo?.imageAlt?.trim() ||
        `${product.name} for pet outdoor and travel use`
      : fallbackAlt,
    fallbackImage,
  };
}

export function resolveBlogImages<T extends BlogImageSource>(
  articles: readonly T[],
  publishedProducts: readonly Product[],
): ResolvedBlogArticle<T>[] {
  const productsByHref = new Map(
    publishedProducts.map((product) => [
      productKey(product.category.slug, product.slug),
      product,
    ]),
  );

  return articles.map((article) => resolveArticle(article, productsByHref));
}

const getCachedPublishedProducts = cache(getPublishedProducts);

export async function getResolvedBlogImages<T extends BlogImageSource>(
  articles: readonly T[],
): Promise<ResolvedBlogArticle<T>[]> {
  try {
    return resolveBlogImages(articles, await getCachedPublishedProducts());
  } catch {
    return resolveBlogImages(articles, []);
  }
}

export async function getResolvedBlogImage<T extends BlogImageSource>(article: T) {
  return (await getResolvedBlogImages([article]))[0];
}
