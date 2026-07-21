import Link from "next/link";
import type { ProductConfig } from "@/lib/product";

type PurchaseButtonProps = {
  product: ProductConfig;
  className?: string;
};

export function PurchaseButton({ product, className = "" }: PurchaseButtonProps) {
  const baseClass =
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20";

  if (product.checkoutUrl && product.availability === "available") {
    return (
      <Link
        className={`${baseClass} bg-ink text-white hover:bg-brand-dark ${className}`}
        href={product.checkoutUrl}
      >
        {product.purchaseButtonText}
      </Link>
    );
  }

  return (
    <span
      aria-disabled="true"
      className={`${baseClass} cursor-not-allowed bg-ink/70 text-white ${className}`}
      title={product.unavailableText}
    >
      {product.purchaseButtonText}
    </span>
  );
}
