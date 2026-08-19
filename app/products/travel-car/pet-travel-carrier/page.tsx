import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ProductAccordions,
  ProductDetailGallery,
} from "./product-detail-gallery";

export const metadata: Metadata = {
  title: "Pet Travel Carrier | TROVANE Product Detail",
  description:
    "B2B pet travel carrier product detail with wholesale price, customization and sample options.",
  alternates: {
    canonical:
      "https://buildmetriccalc.com/products/travel-car/pet-travel-carrier",
  },
};

const gallery = [
  {
    src: "/trovane-product-carrier-cat.jpg",
    alt: "Cat using an outdoor pet travel carrier",
  },
  {
    src: "/trovane-category-travel-cat.jpg",
    alt: "Cat in a travel carrier during an outdoor trip",
  },
  {
    src: "/trovane-product-backpack-cat.jpg",
    alt: "Cat in a travel backpack carrier outdoors",
  },
  {
    src: "/trovane-hero-product-use.png",
    alt: "Dog and cat using travel gear at an outdoor rest stop",
  },
];

const keyFacts = [
  ["Suitable for", "Dogs & Cats"],
  ["Customization", "Logo / Color / Packaging"],
  ["MOQ", "Flexible depending on product"],
  ["Sample", "Available"],
];

const detailSections = [
  {
    title: "Product Details",
    items: [
      "Material: durable woven outer fabric with breathable mesh direction",
      "Size: multiple size planning available for different pet ranges",
      "Color Options: neutral outdoor colors and brand-led seasonal colors",
      "Packaging: retail carton, hangtag and shipping carton direction",
      "Sample and lead time confirmed after quantity and customization requirements",
    ],
  },
  {
    title: "Customization",
    items: [
      "Logo placement on label, patch or packaging",
      "Color planning for brand collections",
      "Packaging artwork direction and carton information",
      "Selected product modifications based on order requirements",
    ],
  },
  {
    title: "Ideal For",
    items: ["Brands", "Retailers", "Distributors", "Online Sellers"],
  },
  {
    title: "Packaging & MOQ",
    items: [
      "Retail packaging can be planned around your channel needs",
      "MOQ depends on product type, color, material and logo requirements",
      "Shipping carton details can be confirmed before production",
    ],
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-warm/92 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
        <Link aria-label="TROVANE home" className="flex shrink-0 items-center" href="/">
          <Image
            alt="TROVANE Pet Outdoor and Travel logo"
            className="h-auto w-[146px] sm:w-[170px]"
            height={47}
            src="/trovane-logo-horizontal-cropped.png"
            style={{ height: "auto" }}
            unoptimized
            width={170}
          />
        </Link>
        <nav className="hidden items-center gap-6 text-[13px] font-semibold text-navy/78 lg:flex">
          <Link className="text-forest" href="/products">
            Products
          </Link>
          <Link className="hover:text-forest" href="/#customization">
            Customization
          </Link>
          <Link className="hover:text-forest" href="/#service">
            Sourcing Service
          </Link>
        </nav>
        <Link
          className="hidden min-h-11 items-center justify-center rounded-full bg-forest px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy sm:min-h-12 sm:px-6 sm:text-sm lg:inline-flex"
          href="/rfq?product=Pet%20Travel%20Carrier"
        >
          Request a Quote
        </Link>
        <div className="flex items-center gap-2 lg:hidden">
          <details className="relative">
            <summary className="flex h-11 cursor-pointer list-none items-center rounded-full border border-navy/15 px-4 text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-56 border border-navy/10 bg-warm p-3">
              <Link className="block px-3 py-3 text-sm font-semibold text-navy" href="/products">
                Products
              </Link>
              <Link className="block px-3 py-3 text-sm font-semibold text-navy" href="/#customization">
                Customization
              </Link>
              <Link className="block px-3 py-3 text-sm font-semibold text-navy" href="/#service">
                Sourcing Service
              </Link>
            </div>
          </details>
          <Link
            className="inline-flex h-11 items-center rounded-full bg-forest px-3 text-[11px] font-bold uppercase tracking-normal text-white whitespace-nowrap"
            href="/rfq?product=Pet%20Travel%20Carrier"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function ProductDetailPage() {
  return (
    <main className="bg-warm text-navy">
      <Header />

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate">
            <Link className="font-semibold text-navy hover:text-forest" href="/products">
              Products
            </Link>
            <span>/</span>
            <Link className="font-semibold text-navy hover:text-forest" href="/products/travel-car">
              Travel & Car
            </Link>
            <span>/</span>
            <span>Pet Travel Carrier</span>
          </div>

          <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(360px,0.4fr)] lg:gap-12 lg:items-start">
            <ProductDetailGallery images={gallery} />

            <div className="lg:pt-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
                Travel & Car / For Dogs & Cats
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-6xl lg:text-5xl">
                Pet Travel Carrier
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate">
                A road-trip carrier direction for dog and cat travel programs,
                built for private label sourcing.
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-3">
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy"
                  href="/rfq?product=Pet%20Travel%20Carrier&intent=wholesale-price"
                >
                  Get Wholesale Price
                </Link>
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/18 px-6 text-sm font-bold uppercase tracking-[0.08em] text-navy transition hover:border-forest hover:text-forest"
                  href="/rfq?product=Pet%20Travel%20Carrier&intent=custom-project"
                >
                  Start Custom Project
                </Link>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-navy/10 pt-5">
                {keyFacts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy/50">
                      {label}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ProductAccordions sections={detailSections} />

          <div className="hidden border-t border-navy/10 pt-10 lg:grid lg:grid-cols-4 lg:gap-12">
            {detailSections.slice(0, 3).map((section, index) => (
              <article
                className={index === 0 ? "lg:col-span-2" : ""}
                key={section.title}
              >
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-forest">
                  {String(index + 1).padStart(2, "0")} {section.title}
                </p>
                <ul className="space-y-4 text-sm leading-7 text-slate">
                  {section.items.map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-12 border-y border-navy/10 py-10 text-center lg:mt-16">
            <p className="mx-auto max-w-2xl text-2xl font-semibold tracking-tight text-navy sm:text-4xl">
              Ready to build this product into your pet travel line?
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy"
                href="/rfq?product=Pet%20Travel%20Carrier"
              >
                Request a Quote
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/18 px-6 text-sm font-bold uppercase tracking-[0.08em] text-navy transition hover:border-forest hover:text-forest"
                href="/rfq?product=Pet%20Travel%20Carrier&intent=custom-project"
              >
                Start Custom Project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
