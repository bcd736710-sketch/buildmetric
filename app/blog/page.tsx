import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { trovaneButton } from "@/components/trovane-button";
import { buyerProductGuides } from "@/lib/blog/buyer-product-guides";
import { petTravelBuyingGuide } from "@/lib/blog/pet-travel-accessories-wholesale";
import { siteUrl } from "@/lib/seo/site-keyword-map";

export const metadata: Metadata = {
  title: "Pet Product Sourcing Guides & Insights | TROVANE",
  description: "Explore practical sourcing guides for pet travel, outdoor and wholesale products, including OEM, private label, materials, packaging and supplier selection.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Pet Product Sourcing Guides & Insights | TROVANE",
    description: "Practical buyer guides for pet travel, outdoor, product selection, packaging and sourcing decisions.",
    images: [{ url: `${siteUrl}/trovane-hero-pets-gear-roadtrip.jpg`, alt: "Pet travel products prepared for a buyer guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pet Product Sourcing Guides & Insights | TROVANE",
    description: "Practical buyer guides for pet travel and outdoor product selection.",
    images: [`${siteUrl}/trovane-hero-pets-gear-roadtrip.jpg`],
  },
};

export default function BlogPage() {
  const articles = [petTravelBuyingGuide, ...buyerProductGuides];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Pet Product Sourcing Guides & Insights",
        url: `${siteUrl}/blog`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: articles.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: article.title,
            url: `${siteUrl}/blog/${article.slug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        ],
      },
    ],
  };
  return <main className="bg-warm text-navy">
    <script dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} type="application/ld+json" />
    <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate"><Link className="transition hover:text-forest" href="/">Home</Link><span aria-hidden="true">/</span><span className="text-navy/70">Blog</span></nav>
        <div className="mt-12 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">TROVANE Journal</p><h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Pet Outdoor &amp; Travel Insights</h1><p className="mt-6 max-w-2xl text-base leading-8 text-slate sm:text-lg">Practical sourcing notes for pet brands, retailers, distributors and buyers planning outdoor, travel, wholesale and private-label product programs.</p></div>
      </div>
    </section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <article className="grid overflow-hidden border border-navy/10 bg-white lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative aspect-[4/3] bg-mist lg:aspect-auto">
            <Image alt={petTravelBuyingGuide.imageAlt} className="h-full w-full object-cover" fill priority sizes="(min-width: 1024px) 55vw, 100vw" src={petTravelBuyingGuide.image} unoptimized />
          </div>
          <div className="flex flex-col p-6 sm:p-9 lg:p-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.14em] text-forest">
              <span>{petTravelBuyingGuide.category}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-forest/60" />
              <time dateTime={petTravelBuyingGuide.publishedAt}>{petTravelBuyingGuide.publishedLabel}</time>
            </div>
            <h2 className="mt-6 max-w-xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              <Link className="transition hover:text-forest" href={`/blog/${petTravelBuyingGuide.slug}`}>{petTravelBuyingGuide.title}</Link>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate">{petTravelBuyingGuide.description}</p>
            <Link className={`mt-8 w-fit ${trovaneButton.primary}`} href={`/blog/${petTravelBuyingGuide.slug}`}>Read Article</Link>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {buyerProductGuides.map((article) => (
            <article className="overflow-hidden border border-navy/10 bg-white" key={article.slug}>
              <Link className="group block" href={`/blog/${article.slug}`}>
                <div className="relative aspect-[16/9] bg-mist">
                  <Image alt={article.imageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" fill sizes="(min-width: 768px) 50vw, 100vw" src={article.image} unoptimized />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold uppercase tracking-[0.14em] text-forest">
                    <span>{article.category}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-forest/60" />
                    <time dateTime={article.publishedAt}>{article.publishedLabel}</time>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] transition group-hover:text-forest sm:text-3xl">{article.title}</h2>
                  <p className="mt-4 text-base leading-7 text-slate">{article.description}</p>
                  <span className="mt-6 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-forest">Read Article →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="border-t border-navy/10 bg-mist px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Planning a range?</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Bring your sourcing brief to the conversation.</h2><p className="mt-3 max-w-2xl leading-7 text-slate">Share the products, market and customization direction you are considering for a more useful wholesale response.</p></div><Link className={`${trovaneButton.primary} shrink-0`} href="/rfq?intent=blog-rfq&source=blog-list">Request a Quote</Link></div></section>
    <SiteFooter />
  </main>;
}
