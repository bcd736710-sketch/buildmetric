import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products/types";

type CategoryProductCardProps = {
  product: Product;
  fallbackImage: string;
};

export function CategoryProductCard({ product, fallbackImage }: CategoryProductCardProps) {
  const image = product.mainImageUrl || product.images[0]?.blobUrl || fallbackImage;

  return <Link className="group" href={`/products/${product.category.slug}/${product.slug}`}>
    <div className="relative aspect-[4/5] overflow-hidden bg-mist">
      <Image
        alt={`${product.name} TROVANE product`}
        className="h-full w-full object-contain p-3 transition duration-300 group-hover:opacity-90 sm:p-4"
        fill
        sizes="(min-width: 1024px) 33vw, 50vw"
        src={image}
        unoptimized
      />
    </div>
    <div className="flex min-h-[150px] flex-col pt-4 sm:min-h-[166px]">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-forest sm:text-xs">{product.category.name}</p>
      <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-navy sm:text-2xl">{product.name}</h2>
      <p className="mt-2 text-sm text-slate">{product.shortDescription || "Customization available on request."}</p>
      <span className="mt-auto inline-flex pt-4 text-xs font-bold uppercase tracking-[0.08em] text-navy transition group-hover:text-forest sm:text-sm">View Product -&gt;</span>
    </div>
  </Link>;
}
