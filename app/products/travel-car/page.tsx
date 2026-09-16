import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryProductCard } from "@/app/products/_components/category-product-card";
import { getPublishedCategoryBySlug } from "@/lib/categories/repository";
import { getPublishedProductsByCategory } from "@/lib/products/repository";
import { absoluteUrl, getCategorySeo, getProductSeo, siteUrl } from "@/lib/seo/site-keyword-map";

export const dynamic = "force-dynamic";

const categorySlug = "travel-car";
const fallbackImage = "/trovane-product-carrier-cat.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const category = await getPublishedCategoryBySlug(categorySlug);
  const seo = getCategorySeo(categorySlug);
  const url = `${siteUrl}/products/${categorySlug}`;
  const title = seo?.title || category?.seoTitle || "Pet Travel & Car Products for B2B Buyers | TROVANE";
  const description = seo?.description || category?.seoDescription || category?.description || "Explore pet travel and car products and request model-specific sourcing information from TROVANE.";
  const image = absoluteUrl(category?.imageUrl || "/images/categories/travel-car.jpg");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title, description, images: [{ url: image, alt: seo?.imageAlt || "Pet travel and car products" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export async function CategoryProductsPage({ categorySlug }: { categorySlug: string }) {
  const [category, products] = await Promise.all([
    getPublishedCategoryBySlug(categorySlug),
    getPublishedProductsByCategory(categorySlug),
  ]);
  if (!category) notFound();
  const seo = getCategorySeo(category.slug);
  const heroImage = category.imageUrl || "/images/categories/travel-car.jpg";
  const categoryUrl = `${siteUrl}/products/${category.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: seo?.h1 || category.name,
        description: seo?.description || category.description || undefined,
        url: categoryUrl,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: products.map((product, index) => {
            const productSeo = getProductSeo(product.category.slug, product.slug);
            return {
              "@type": "ListItem",
              position: index + 1,
              name: productSeo?.h1 || product.name,
              url: `${siteUrl}/products/${product.category.slug}/${product.slug}`,
            };
          }),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Products", item: `${siteUrl}/products` },
          { "@type": "ListItem", position: 2, name: seo?.h1 || category.name, item: categoryUrl },
        ],
      },
    ],
  };

  return <main className="bg-warm text-navy">
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" />
    <section className="px-4 py-4 sm:px-6 sm:py-5 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate"><Link className="font-semibold text-navy hover:text-forest" href="/products">Products</Link><span>/</span><span>{seo?.h1 || category.name}</span></div><div className="grid gap-5 border-b border-navy/10 pb-5 lg:grid-cols-[0.9fr_1fr] lg:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-forest">{category.name}</p><h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-[3.4rem]">{seo?.h1 || category.name}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate">{seo?.introduction || category.description || "Explore products for pet travel and outdoor use."}</p>{seo?.relatedGuide ? <p className="mt-4 text-sm leading-6 text-slate">For selection criteria, read the <Link className="font-semibold text-forest underline decoration-forest/35 underline-offset-4 hover:text-navy" href={seo.relatedGuide.href}>{seo.relatedGuide.label}</Link>.</p> : null}</div><div className="relative aspect-[16/7.5] overflow-hidden bg-mist lg:aspect-[16/6.5]"><Image alt={seo?.imageAlt || category.imageAlt || `${category.name} product category`} className="h-full w-full object-contain p-2" fill priority sizes="(min-width: 1024px) 53vw, 100vw" src={heroImage} unoptimized /></div></div></div></section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 lg:grid-cols-3">{products.map((product) => <CategoryProductCard fallbackImage={fallbackImage} key={product.id} product={product} />)}</div>{seo?.comparison ? <section className="mt-16 border-t border-navy/15 pt-10 sm:mt-24 sm:pt-12"><div className="max-w-5xl"><h2 className="text-3xl font-semibold tracking-[-0.035em] text-navy sm:text-4xl">{seo.comparison.title}</h2><p className="mt-5 max-w-4xl text-base leading-8 text-slate sm:text-lg">{seo.comparison.introduction}</p><div className="mt-9 border-y border-navy/10"><div className="hidden grid-cols-[minmax(10rem,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] gap-6 border-b border-navy/10 py-4 text-sm font-semibold text-navy md:grid"><span>Buyer Consideration</span>{seo.comparison.products.map((product) => <Link className="transition hover:text-forest" href={product.href} key={product.href}>{product.name}</Link>)}</div>{seo.comparison.rows.map((row) => <div className="grid gap-3 border-b border-navy/10 py-5 last:border-b-0 md:grid-cols-[minmax(10rem,0.7fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-6" key={row.consideration}><span className="font-semibold text-navy">{row.consideration}</span>{row.values.map((value, index) => <span className="leading-7 text-slate" key={`${row.consideration}-${seo.comparison?.products[index]?.href}`}><span className="mr-1 font-medium text-navy md:hidden">{seo.comparison?.products[index]?.name}:</span>{value}</span>)}</div>)}</div><section className="mt-10 border-t border-navy/10 pt-8"><h3 className="text-xl font-semibold tracking-tight text-navy">Confirm Before Sampling</h3><ul className="mt-5 grid gap-x-8 gap-y-3 text-slate sm:grid-cols-2">{seo.comparison.confirmBeforeSampling.map((item) => <li className="flex gap-3 leading-7" key={item}><span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />{item}</li>)}</ul><p className="mt-5 max-w-4xl leading-7 text-slate">{seo.comparison.confirmationNote}</p></section><p className="mt-8 max-w-4xl text-sm leading-6 text-slate">For a deeper sample review, read the <Link className="font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition hover:text-navy" href={seo.comparison.resource.href}>{seo.comparison.resource.label}</Link>. {seo.comparison.resource.description}</p></div></section> : null}</div></section>
  </main>;
}

export default function TravelCarPage() {
  return <CategoryProductsPage categorySlug={categorySlug} />;
}
