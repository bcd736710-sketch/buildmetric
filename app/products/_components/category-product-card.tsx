import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products/types";

type CategoryProductCardProps = {
  product: Product;
  fallbackImage: string;
};

export function CategoryProductCard({ product, fallbackImage }: CategoryProductCardProps) {
  const image = product.mainImageUrl || product.images[0]?.blobUrl || fallbackImage;
  const productHref = `/products/${product.category.slug}/${product.slug}`;
  const rfqHref = `/rfq?product=${encodeURIComponent(product.name)}&intent=wholesale-price`;

  return <article className="group">
    <Link
      aria-label={`View details for ${product.name}`}
      className="group/image block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
      href={productHref}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            alt={`${product.name} TROVANE product`}
            className="h-auto w-auto max-h-[85%] max-w-[85%] object-contain object-center transition duration-300 group-hover/image:opacity-90"
            height={900}
            sizes="(min-width: 1024px) 33vw, 50vw"
            src={image}
            unoptimized
            width={1200}
          />
        </div>
      </div>
    </Link>
    <div className="flex min-h-[150px] flex-col pt-4 sm:min-h-[166px]">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-forest sm:text-xs">{product.category.name}</p>
        {product.customization.length > 0 && (
          <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold text-navy/72">
            Customizable
          </span>
        )}
      </div>
      <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-navy sm:text-2xl">
        <Link
          className="transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          href={productHref}
        >
          {product.name}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-slate">{product.shortDescription || "Customization available on request."}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-4 text-xs font-bold uppercase tracking-[0.08em] sm:text-sm">
        <Link
          className="text-navy transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          href={productHref}
        >
          View Details -&gt;
        </Link>
        <Link
          className="text-navy transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          href={rfqHref}
        >
          Request Quote -&gt;
        </Link>
      </div>
    </div>
  </article>;
}
