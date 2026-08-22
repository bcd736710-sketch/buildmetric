import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  const heroImage = category.imageUrl || "/trovane-category-travel-cat.jpg";

  return <main className="bg-warm text-navy">
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate"><Link className="font-semibold text-navy hover:text-forest" href="/products">Products</Link><span>/</span><span>{category.name}</span></div><div className="grid gap-5 border-b border-navy/10 pb-7 lg:grid-cols-[0.72fr_1fr] lg:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-forest">{category.name}</p><h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-[3.4rem]">{category.name}</h1><p className="mt-4 max-w-xl text-base leading-7 text-slate">{category.description || "Explore wholesale-ready products for pet travel and outdoor use."}</p></div><div className="relative aspect-[16/7.5] overflow-hidden bg-mist lg:aspect-[16/5.8]"><Image alt={category.imageAlt || `${category.name} TROVANE product category`} className="h-full w-full object-cover object-[56%_center]" fill priority sizes="(min-width: 1024px) 58vw, 100vw" src={heroImage} unoptimized /></div></div></div></section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 lg:grid-cols-3">{products.map((product) => { const image = product.mainImageUrl || product.images[0]?.blobUrl || fallbackImage; return <Link className="group" href={`/products/${product.category.slug}/${product.slug}`} key={product.id}><div className="relative aspect-[4/5] overflow-hidden bg-mist"><Image alt={`${product.name} TROVANE product`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" fill sizes="(min-width: 1024px) 33vw, 50vw" src={image} unoptimized /></div><div className="flex min-h-[150px] flex-col pt-4 sm:min-h-[166px]"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-forest sm:text-xs">{product.category.name}</p><h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-navy sm:text-2xl">{product.name}</h2><p className="mt-2 text-sm text-slate">{product.shortDescription || "Customization available on request."}</p><span className="mt-auto inline-flex pt-4 text-xs font-bold uppercase tracking-[0.08em] text-navy transition group-hover:text-forest sm:text-sm">View Product -&gt;</span></div></Link>; })}</div></div></section>
  </main>;
}

export default function TravelCarPage() {
  return <CategoryProductsPage categorySlug={categorySlug} />;
}
