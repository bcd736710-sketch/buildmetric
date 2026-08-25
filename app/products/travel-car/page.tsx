import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryProductCard } from "@/app/products/_components/category-product-card";
import { getPublishedCategoryBySlug } from "@/lib/categories/repository";
import { getPublishedProductsByCategory } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

const categorySlug = "travel-car";
const fallbackImage = "/trovane-product-carrier-cat.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const category = await getPublishedCategoryBySlug(categorySlug);
  return {
    title: category?.seoTitle || "Travel & Car Products | TROVANE",
    description: category?.seoDescription || category?.description || "Travel carriers, restraints, hydration and comfort products for pet travel.",
    alternates: { canonical: "https://buildmetriccalc.com/products/travel-car" },
  };
}

export async function CategoryProductsPage({ categorySlug }: { categorySlug: string }) {
  const [category, products] = await Promise.all([
    getPublishedCategoryBySlug(categorySlug),
    getPublishedProductsByCategory(categorySlug),
  ]);
  if (!category) notFound();
  const heroImage = category.imageUrl || "/images/categories/travel-car.jpg";

  return <main className="bg-warm text-navy">
    <section className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate"><Link className="font-semibold text-navy hover:text-forest" href="/products">Products</Link><span>/</span><span>{category.name}</span></div><div className="grid gap-5 border-b border-navy/10 pb-5 lg:grid-cols-[0.9fr_1fr] lg:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-forest">{category.name}</p><h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-[3.4rem]">{category.name}</h1><p className="mt-4 max-w-xl text-base leading-7 text-slate">{category.description || "Explore wholesale-ready products for pet travel and outdoor use."}</p></div><div className="relative aspect-[16/7.5] overflow-hidden bg-mist lg:aspect-[16/6.5]"><Image alt={category.imageAlt || `${category.name} TROVANE product category`} className="h-full w-full object-contain p-2" fill priority sizes="(min-width: 1024px) 53vw, 100vw" src={heroImage} unoptimized /></div></div></div></section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 lg:grid-cols-3">{products.map((product) => <CategoryProductCard fallbackImage={fallbackImage} key={product.id} product={product} />)}</div></div></section>
  </main>;
}

export default function TravelCarPage() {
  return <CategoryProductsPage categorySlug={categorySlug} />;
}
