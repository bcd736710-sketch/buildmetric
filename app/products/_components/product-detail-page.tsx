import Link from "next/link";
import type { Product } from "@/lib/products/types";
import {
  ProductAccordions,
  ProductDetailGallery,
} from "../travel-car/pet-travel-carrier/product-detail-gallery";

const fallbackImage = "/trovane-product-carrier-cat.jpg";

function values(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, entry]) => `${key}: ${Array.isArray(entry) ? entry.join(", ") : String(entry)}`)
      .filter(Boolean);
  }
  return value ? [String(value)] : [];
}

function contentLines(value: string | null): string[] {
  return value?.split("\n").map((line) => line.trim()).filter(Boolean) ?? [];
}

export function ProductDetailPage({ product }: { product: Product }) {
  const savedImages = product.images.map((image) => ({ src: image.blobUrl, alt: image.altText || product.name }));
  const images = product.mainImageUrl && !savedImages.some((image) => image.src === product.mainImageUrl)
    ? [{ src: product.mainImageUrl, alt: product.name }, ...savedImages]
    : savedImages.length
      ? savedImages
      : [{ src: fallbackImage, alt: `${product.name} TROVANE product` }];
  const specificationRows = [
    { label: "Material", value: product.material },
    { label: "Size Specifications", value: contentLines(product.sizeSpecs).join(" / ") || null },
    { label: "Colors", value: product.colors.length ? product.colors.join(", ") : null },
    { label: "MOQ", value: product.moq },
    { label: "Lead Time", value: product.leadTime },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
  const detailSections = [
    { title: "Product Overview", items: contentLines(product.fullDescription || product.shortDescription) },
    { title: "Key Features", items: contentLines(product.keyFeatures) },
    { title: "Specifications", items: specificationRows.map(({ label, value }) => `${label}: ${value}`) },
    { title: "Applications", items: contentLines(product.applications) },
    { title: "Customization", items: [...values(product.customization), product.packaging && `Packaging: ${product.packaging}`].filter(Boolean) as string[] },
    { title: "Certifications", items: contentLines(product.certifications) },
  ].filter((section) => section.items.length);
  const facts = [["Category", product.category.name], ["Customization", product.customization.length ? product.customization.join(" / ") : "Available on request"], ["MOQ", product.moq || "Available on request"], ["Lead Time", product.leadTime || "Confirmed after requirements"]];
  const rfq = `/rfq?product=${encodeURIComponent(product.name)}`;

  return <main className="bg-warm text-navy">
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8"><div className="mx-auto max-w-7xl">
      <div className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate"><Link className="font-semibold text-navy hover:text-forest" href="/products">Products</Link><span>/</span><Link className="font-semibold text-navy hover:text-forest" href={`/products/${product.category.slug}`}>{product.category.name}</Link><span>/</span><span>{product.name}</span></div>
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(360px,0.4fr)] lg:items-start lg:gap-12"><ProductDetailGallery images={images} /><div className="lg:pt-1"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">{product.category.name}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy sm:text-6xl lg:text-5xl">{product.name}</h1><p className="mt-4 max-w-xl text-base leading-7 text-slate">{product.shortDescription || product.fullDescription || "Contact us for product details and customization options."}</p><div className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-3"><Link className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy" href={`${rfq}&intent=wholesale-price`}>Get Wholesale Price</Link><Link className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/18 px-6 text-sm font-bold uppercase tracking-[0.08em] text-navy transition hover:border-forest hover:text-forest" href={`${rfq}&intent=custom-project`}>Start Custom Project</Link></div><dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-navy/10 pt-5">{facts.map(([label, value]) => <div key={label}><dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy/50">{label}</dt><dd className="mt-2 text-sm leading-6 text-navy">{value}</dd></div>)}</dl></div></div>
    </div></section>
    <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8"><div className="mx-auto max-w-7xl"><ProductAccordions sections={detailSections} /><div className="hidden border-t border-navy/10 pt-10 lg:grid lg:grid-cols-4 lg:gap-12">{detailSections.map((section, index) => <article className={section.title === "Product Overview" || section.title === "Specifications" ? "lg:col-span-2" : ""} key={section.title}><p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-forest">{String(index + 1).padStart(2, "0")} {section.title}</p>{section.title === "Specifications" ? <dl className="border-y border-navy/10 text-sm leading-6">{specificationRows.map((row) => <div className="grid grid-cols-[minmax(9rem,0.8fr)_minmax(0,1.2fr)] gap-5 border-b border-navy/10 py-3 last:border-b-0" key={row.label}><dt className="font-semibold text-navy">{row.label}</dt><dd className="text-slate">{row.value}</dd></div>)}</dl> : <ul className="space-y-4 text-sm leading-7 text-slate">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</article>)}</div><div className="mt-12 border-y border-navy/10 py-10 text-center lg:mt-16"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Request Quote</p><p className="mx-auto mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-navy sm:text-4xl">Ready to build this product into your pet travel line?</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link className="inline-flex min-h-12 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy" href={rfq}>Request a Quote</Link><Link className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy/18 px-6 text-sm font-bold uppercase tracking-[0.08em] text-navy transition hover:border-forest hover:text-forest" href={`${rfq}&intent=custom-project`}>Start Custom Project</Link></div></div></div></section>
  </main>;
}
