import Link from "next/link";
import type { Product } from "@/lib/products/types";
import { ProductDetailGallery } from "../travel-car/pet-travel-carrier/product-detail-gallery";

const fallbackImage = "/trovane-product-carrier-cat.jpg";

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(stringList);
  if (typeof value === "string") return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean);
  return [];
}

function paragraphs(value: unknown): string[] {
  if (typeof value === "string") return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
  return stringList(value);
}

function text(value: unknown): string | null {
  return stringList(value).join(", ") || null;
}

function specificationValue(specifications: unknown, names: string[]): string | null {
  if (!specifications || typeof specifications !== "object" || Array.isArray(specifications)) return null;
  for (const [key, value] of Object.entries(specifications)) {
    if (names.includes(key.toLowerCase()) && value !== null && value !== undefined) {
      return Array.isArray(value) ? value.map(String).join(", ") : String(value);
    }
  }
  return null;
}

export function ProductDetailPage({ product }: { product: Product }) {
  const savedImages = product.images.map((image) => ({ src: image.blobUrl, alt: image.altText || product.name }));
  const images = product.mainImageUrl && !savedImages.some((image) => image.src === product.mainImageUrl)
    ? [{ src: product.mainImageUrl, alt: product.name }, ...savedImages]
    : savedImages.length ? savedImages : [{ src: fallbackImage, alt: `${product.name} TROVANE product` }];
  const dimensions = stringList(product.sizeSpecs).join(" · ") || null;
  const colors = stringList(product.colors);
  const colorFinish = colors.join(", ") || null;
  const customization = stringList(product.customization);
  const model = specificationValue(product.specifications, ["sku", "model", "product code"]);
  const overview = text(product.fullDescription) || text(product.shortDescription) || "Contact our team for product details, sample requests and sourcing support.";
  const intro = text(product.shortDescription) || text(product.fullDescription) || "Built for dependable wholesale, project and OEM sourcing programs.";
  const topSpecifications = [
    { label: "Material", value: text(product.material) }, { label: "Size / Dimensions", value: dimensions },
    { label: "Color / Finish", value: colorFinish }, { label: "MOQ", value: text(product.moq) },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
  const detailedSpecifications = [
    { label: "Model / Product Type", value: model || product.category.name }, { label: "Material", value: text(product.material) },
    { label: "Available Size", value: dimensions }, { label: "Color / Finish", value: colorFinish },
    { label: "Usage / Application", value: text(product.applications) }, { label: "MOQ", value: text(product.moq) },
    { label: "Customization", value: customization.join(", ") || null }, { label: "Lead Time", value: text(product.leadTime) },
    { label: "Packaging", value: text(product.packaging) }, { label: "Certifications", value: text(product.certifications) },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));
  const rfq = `/rfq?product=${encodeURIComponent(product.name)}`;

  return <main className="bg-white text-navy">
    <section className="px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24 lg:pt-10"><div className="mx-auto max-w-[1440px]">
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate sm:text-sm"><Link className="transition hover:text-forest" href="/products">Products</Link><span aria-hidden="true">/</span><Link className="transition hover:text-forest" href={`/products/${product.category.slug}`}>{product.category.name}</Link><span aria-hidden="true">/</span><span className="text-navy/70">{product.name}</span></nav>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(380px,0.88fr)] lg:gap-20 xl:gap-28"><ProductDetailGallery images={images} /><div className="max-w-[560px] pb-2 lg:pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/45">{model ? `Model / SKU · ${model}` : `TROVANE · ${product.category.name}`}</p>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-navy sm:text-5xl lg:text-6xl">{product.name}</h1><p className="mt-6 max-w-[52ch] text-base leading-8 text-slate sm:text-lg">{intro}</p>
        {topSpecifications.length ? <dl className="mt-10 border-y border-navy/15">{topSpecifications.map((row) => <div className="grid grid-cols-[minmax(8.5rem,0.72fr)_minmax(0,1.28fr)] gap-5 border-b border-navy/10 py-4 last:border-b-0" key={row.label}><dt className="text-sm font-medium text-navy">{row.label}</dt><dd className="text-sm leading-6 text-slate">{row.value}</dd></div>)}</dl> : null}
        <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"><Link className="inline-flex min-h-13 items-center justify-center bg-navy px-7 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-forest" href={rfq}>Request a Quote</Link><Link className="inline-flex min-h-13 items-center justify-center border border-navy/30 px-7 text-sm font-bold uppercase tracking-[0.1em] text-navy transition-colors hover:border-forest hover:text-forest" href="/catalog">Download full catalog</Link></div>
      </div></div>
    </div></section>
    <section className="border-t border-navy/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1080px]">
      <article className="max-w-[800px]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Product information</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Overview</h2><div className="mt-7 space-y-5 text-base leading-8 text-slate sm:text-lg">{paragraphs(overview).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>
      {detailedSpecifications.length ? <article className="mt-20 max-w-[900px] border-t border-navy/15 pt-10 sm:mt-28 sm:pt-12"><h2 className="text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Specifications</h2><ul className="mt-9 divide-y divide-navy/10 border-y border-navy/10">{detailedSpecifications.map((item) => <li className="grid gap-2 py-4 sm:grid-cols-[minmax(12rem,0.75fr)_minmax(0,1.25fr)] sm:gap-8" key={item.label}><span className="flex gap-3 font-medium text-navy"><span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />{item.label}</span><span className="leading-7 text-slate">{item.value}</span></li>)}</ul></article> : null}
      <article className="mt-20 border-t border-navy/15 pt-10 sm:mt-28 sm:pt-12"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Built for B2B sourcing</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Wholesale / OEM / Project Supply</h2><p className="mt-7 max-w-[760px] text-base leading-8 text-slate sm:text-lg">Work with TROVANE on wholesale programs, product development and tailored sourcing for pet brands, retailers and project teams. Share your requirements to discuss samples, customization and delivery planning.</p><Link className="mt-9 inline-flex min-h-13 items-center justify-center bg-forest px-7 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-navy" href={rfq}>Request a Quote</Link></article>
    </div></section>
  </main>;
}
