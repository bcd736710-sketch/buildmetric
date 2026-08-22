import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedCategories } from "@/lib/categories/repository";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products | TROVANE Pet Outdoor & Travel",
  description: "Explore TROVANE outdoor and travel product categories for dogs and cats.",
  alternates: { canonical: "https://buildmetriccalc.com/products" },
};

export default async function ProductsPage() {
  const categories = await getPublishedCategories();
  return <main className="bg-warm text-navy">
    <section className="px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-8 text-sm text-slate">Products</div><h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-6xl">Explore TROVANE Products</h1><p className="mt-5 max-w-2xl text-base leading-8 text-slate">Outdoor and travel products for dogs and cats, organized by use case.</p></div></section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5">{categories.map((category) => <Link className="group w-full border border-navy/10 bg-warm transition duration-300 hover:border-forest/35 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]" href={`/products/${category.slug}`} key={category.id}><div className="relative aspect-[4/3] overflow-hidden bg-mist"><Image alt={category.imageAlt || `${category.name} pet outdoor product category`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" fill loading="eager" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={category.slug === "travel-car" ? "/images/categories/travel-car.jpg" : category.imageUrl || "/trovane-category-travel-cat.jpg"} unoptimized /></div><div className="flex min-h-[190px] flex-col px-5 py-5 sm:px-6 sm:py-6"><h2 className="text-2xl font-semibold tracking-tight text-navy">{category.name}</h2><p className="mt-3 text-sm leading-7 text-slate">{category.description || "Explore products and customization options for your range."}</p><span className="mt-auto inline-flex pt-5 text-sm font-bold uppercase tracking-[0.08em] text-forest">View Category -&gt;</span></div></Link>)}</div></section>
  </main>;
}
