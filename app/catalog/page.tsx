import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CatalogDownloadForm } from "./catalog-download-form";

export const metadata: Metadata = {
  title: "2026 Product Catalog | TROVANE",
  description: "Download the TROVANE product catalog for pet outdoor, travel and OEM/ODM sourcing.",
  alternates: { canonical: "/catalog" },
};

const catalogSections = [
  "Featured Pet Travel & Outdoor Products",
  "Product Categories",
  "Materials, Sizes & Customization",
  "Direct Links to Product Pages",
];

export default function CatalogPage() {
  return <main className="bg-white text-navy">
    <section className="relative isolate flex min-h-[500px] items-center overflow-hidden bg-navy px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[540px] lg:px-12 lg:py-24">
      <Image alt="TROVANE pet travel products" className="-z-20 object-cover object-center opacity-45" fill priority sizes="100vw" src="/trovane-hero-pets-roadtrip.jpg" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/25" />
      <div className="mx-auto max-w-[1440px]"><div className="max-w-3xl text-white">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/70"><Link className="transition hover:text-white" href="/">Home</Link><span aria-hidden="true">/</span><span>Catalog</span></nav>
        <p className="mt-13 text-xs font-bold uppercase tracking-[0.18em] text-white/70">2026 Product Catalog</p>
        <h1 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-7xl">One catalog.<br />A clearer way to source<br />pet outdoor &amp; travel products.</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">Browse TROVANE’s featured categories, product specifications and OEM/ODM sourcing options in one downloadable catalog.</p>
      </div></div>
    </section>

    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-32"><div className="mx-auto grid max-w-[1240px] items-start gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.74fr)] lg:gap-24">
      <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Wholesale &amp; Projects</p><h2 className="mt-5 text-5xl font-semibold leading-[0.99] tracking-[-0.05em] text-navy sm:text-6xl">Choose faster.<br />Source with confidence.</h2><p className="mt-8 max-w-xl text-base leading-8 text-slate sm:text-lg">Made for product teams, buyers and distributors who need a practical view of our pet outdoor and travel range before starting a sourcing conversation.</p>
        <ul className="mt-12 border-y border-navy/15">{catalogSections.map((section) => <li className="flex items-center justify-between gap-6 border-b border-navy/10 py-5 last:border-b-0" key={section}><span className="font-medium text-navy">{section}</span><span aria-hidden="true" className="text-xl text-forest">→</span></li>)}</ul>
      </div>
      <aside className="bg-mist p-4 sm:p-6"><CatalogDownloadForm /></aside>
    </div></section>

    <section className="border-t border-navy/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1240px]"><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(330px,0.74fr)] lg:gap-24"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Inside the catalog</p><h2 className="mt-5 text-5xl font-semibold leading-[0.99] tracking-[-0.05em] text-navy sm:text-6xl">Designed for real buying decisions.</h2></div><p className="max-w-md self-end text-base leading-8 text-slate sm:text-lg">A practical reference for distributors, brands and project purchasing teams planning their next pet travel and outdoor product range.</p></div>
      <div className="mt-16 grid border-t border-navy/15 md:grid-cols-3">{[
        ["Featured categories", "Travel & Car, Walking & Hiking, Outdoor Feeding, Outdoor Apparel, Camping Accessories and more."],
        ["Specification reference", "Review materials, sizes, customization options and typical product details."],
        ["Direct product access", "Open related product pages directly from the PDF for faster RFQ and sourcing."],
      ].map(([title, copy]) => <article className="border-b border-navy/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0" key={title}><h3 className="text-xl font-semibold tracking-[-0.02em] text-navy">{title}</h3><p className="mt-4 leading-7 text-slate">{copy}</p></article>)}</div>
    </div></section>
  </main>;
}
