import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedCategories } from "@/lib/categories/repository";
import { getCategorySeo, siteUrl } from "@/lib/seo/site-keyword-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pet Outdoor & Travel Product Categories | TROVANE",
  description: "Browse TROVANE pet outdoor and travel product categories for B2B buyers, including travel, car, walking, hiking and portable feeding ranges.",
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/products`,
    title: "Pet Outdoor & Travel Product Categories | TROVANE",
    description: "Browse pet outdoor and travel product categories for brands, retailers, distributors and importers.",
    images: [{ url: `${siteUrl}/trovane-hero-product-use.png`, alt: "Pet outdoor and travel product categories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Outdoor & Travel Product Categories | TROVANE",
    description: "Browse pet outdoor and travel product categories for B2B buyers.",
    images: [`${siteUrl}/trovane-hero-product-use.png`],
  },
};

export default async function ProductsPage() {
  const categories = await getPublishedCategories();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Pet Outdoor & Travel Product Categories",
        description: metadata.description,
        url: `${siteUrl}/products`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: categories.map((category, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: getCategorySeo(category.slug)?.h1 || category.name,
            url: `${siteUrl}/products/${category.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}/products` },
        ],
      },
    ],
  };
  return <main className="bg-warm text-navy">
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" />
    <section className="px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-8 text-sm text-slate">Products</div><h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-navy sm:text-6xl">Pet Outdoor &amp; Travel Product Categories</h1><p className="mt-5 max-w-2xl text-base leading-8 text-slate">Browse product categories by travel, car, walking, hiking and outdoor feeding use. Each category leads to currently published products with model-specific specifications and RFQ options.</p></div></section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-5">{categories.map((category) => { const seo = getCategorySeo(category.slug); return <Link className="group w-full border border-navy/10 bg-warm transition duration-300 hover:border-forest/35 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]" href={`/products/${category.slug}`} key={category.id}><div className="relative aspect-square overflow-hidden bg-mist"><Image alt={seo?.imageAlt || category.imageAlt || `${category.name} product category`} className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.025]" fill loading="eager" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={category.imageUrl || (category.slug === "travel-car" ? "/images/categories/travel-car.jpg" : "/trovane-category-travel-cat.jpg")} unoptimized /></div><div className="flex min-h-[190px] flex-col px-5 py-5 sm:px-6 sm:py-6"><h2 className="text-2xl font-semibold tracking-tight text-navy">{seo?.h1 || category.name}</h2><p className="mt-3 text-sm leading-7 text-slate">{seo?.cardDescription || category.description || "Explore currently published products and model-specific sourcing details."}</p><span className="mt-auto inline-flex pt-5 text-sm font-bold uppercase tracking-[0.08em] text-forest">View Category -&gt;</span></div></Link>; })}</div></section>
  </main>;
}
