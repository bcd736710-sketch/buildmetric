import Link from "next/link";
import { trovaneButton } from "@/components/trovane-button";
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

function extraSpecifications(value: unknown): Array<{ label: string; value: string }> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [];
  const hidden = new Set(["model", "product type", "moq", "color", "color / finish", "usage", "applications", "certifications"]);
  return Object.entries(value).flatMap(([label, entry]) => {
    if (hidden.has(label.trim().toLowerCase()) || entry === null || entry === undefined) return [];
    const rendered = Array.isArray(entry) ? entry.map(String).join(", ") : String(entry);
    return rendered.trim() ? [{ label, value: rendered }] : [];
  });
}

export function ProductDetailPage({ product }: { product: Product }) {
  const savedImages = product.images.map((image) => ({ src: image.blobUrl, alt: image.altText || product.name }));
  const images = product.mainImageUrl && !savedImages.some((image) => image.src === product.mainImageUrl)
    ? [{ src: product.mainImageUrl, alt: product.name }, ...savedImages]
    : savedImages.length ? savedImages : [{ src: fallbackImage, alt: `${product.name} TROVANE product` }];
  const dimensions = stringList(product.sizeSpecs).join(" · ") || null;
  const finish = text(product.finish) || "Available on request";
  const availableOptions = paragraphs(product.availableOptions);
  const wholesaleSupplyDescription = paragraphs(product.wholesaleSupplyDescription);
  const overview = text(product.fullDescription) || text(product.shortDescription) || "Contact our team for product details, sample requests and sourcing support.";
  const intro = text(product.shortDescription) || "Contact our team for product details, sample requests and sourcing support.";
  const topSpecifications = [
    { label: "Material", value: text(product.material) || "Available on request" },
    { label: "Dimensions", value: dimensions || "Available on request" },
    { label: "Finish", value: finish },
  ];
  const detailedSpecifications = [
    { label: "Material", value: text(product.material) || "Available on request" },
    { label: "Dimensions", value: dimensions || "Available on request" },
    { label: "Finish", value: finish },
    ...extraSpecifications(product.specifications),
  ];
  const rfq = `/rfq?product=${encodeURIComponent(product.name)}`;
  const relatedBuyingGuide = product.category.slug === "travel-car" && ["portable-pet-carrier-backpack", "dual-use-pet-car-seat-tether", "dog-car-window-safety-guard", "foldable-travel-cat-litter-box"].includes(product.slug);

  return <main className="bg-white text-navy">
    <section className="px-5 pb-16 pt-8 sm:px-8 lg:px-12 lg:pb-24 lg:pt-10"><div className="mx-auto max-w-[1440px]">
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-slate sm:text-sm"><Link className="transition hover:text-forest" href="/products">Products</Link><span aria-hidden="true">/</span><Link className="transition hover:text-forest" href={`/products/${product.category.slug}`}>{product.category.name}</Link><span aria-hidden="true">/</span><span className="text-navy/70">{product.name}</span></nav>
      <div className="grid items-start gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(400px,1.1fr)] md:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(460px,1.18fr)] lg:gap-16 xl:gap-24"><ProductDetailGallery images={images} /><div className="max-w-[760px] pb-2 md:pt-2 lg:pt-5">
        <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-navy sm:text-5xl lg:text-6xl">{product.name}</h1><p className="mt-6 max-w-[52ch] text-base leading-8 text-slate sm:text-lg">{intro}</p>
        {topSpecifications.length ? <dl className="mt-10 border-y border-navy/15">{topSpecifications.map((row) => <div className="grid grid-cols-[minmax(10rem,0.7fr)_minmax(0,1.3fr)] gap-6 border-b border-navy/10 py-4 last:border-b-0" key={row.label}><dt className="text-sm font-semibold text-navy">{row.label}</dt><dd className="text-sm leading-6 text-slate">{row.value}</dd></div>)}</dl> : null}
        <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5"><Link className={trovaneButton.primary} href={rfq}>Request a Quote</Link><Link className={trovaneButton.secondary} href="/catalog">Download full catalog</Link></div>
        {relatedBuyingGuide ? <p className="mt-5 text-sm leading-6 text-slate"><Link className="font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition hover:text-navy" href="/blog/pet-travel-accessories-wholesale-buying-guide">Related Buying Guide: Pet Travel Accessories Wholesale</Link></p> : null}
      </div></div>
    </div></section>
    <section className="border-t border-navy/10 px-5 py-16 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1080px]">
      <article className="max-w-[800px]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Product information</p><h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Overview</h2><div className="mt-7 space-y-5 text-base leading-8 text-slate sm:text-lg">{paragraphs(overview).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>
      {detailedSpecifications.length ? <article className="mt-20 max-w-[900px] border-t border-navy/15 pt-10 sm:mt-28 sm:pt-12"><h2 className="text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Specifications</h2><ul className="mt-9 divide-y divide-navy/10 border-y border-navy/10">{detailedSpecifications.map((item) => <li className="grid gap-2 py-4 sm:grid-cols-[minmax(12rem,0.75fr)_minmax(0,1.25fr)] sm:gap-8" key={item.label}><span className="flex gap-3 font-medium text-navy"><span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />{item.label}</span><span className="leading-7 text-slate">{item.value}</span></li>)}</ul></article> : null}
      {availableOptions.length ? <article className="mt-20 max-w-[900px] border-t border-navy/15 pt-10 sm:mt-28 sm:pt-12"><h2 className="text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Available Options</h2><ul className="mt-9 divide-y divide-navy/10 border-y border-navy/10">{availableOptions.map((option, index) => <li className="flex gap-3 py-4 leading-7 text-slate" key={`${option}-${index}`}><span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />{option}</li>)}</ul></article> : null}
      <article className="mt-20 border-t border-navy/15 pt-10 sm:mt-28 sm:pt-12"><h2 className="text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">Wholesale / OEM / Project Supply</h2>{wholesaleSupplyDescription.length ? <div className="mt-7 max-w-[800px] space-y-5 text-base leading-8 text-slate sm:text-lg">{wholesaleSupplyDescription.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> : null}<Link className={`mt-9 ${trovaneButton.primary}`} href={rfq}>Request a Quote</Link></article>
    </div></section>
  </main>;
}
