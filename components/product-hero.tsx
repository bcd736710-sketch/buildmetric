import Link from "next/link";
import { PurchaseButton } from "@/components/purchase-button";
import type { ProductConfig } from "@/lib/product";

type ProductHeroProps = {
  product: ProductConfig;
};

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section
      className="border-b border-line bg-[linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)]"
      id="the-plan"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase text-brand">
            {product.name}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal text-ink sm:text-6xl lg:text-7xl">
            {product.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            {product.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PurchaseButton product={product} />
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              href="#whats-included"
            >
              See What&apos;s Included
            </Link>
          </div>
          <p className="mt-4 text-sm font-medium text-muted">
            {product.digitalLabel}. {product.deliveryNote}
          </p>
        </div>

        <div className="relative">
          <div className="aspect-[1.08/1] rounded-lg border border-line bg-white p-5 shadow-soft">
            <div className="flex h-full flex-col justify-between rounded-lg bg-[linear-gradient(180deg,#f4f1eb_0%,#ffffff_70%)] p-6">
              <div className="flex items-center justify-between text-sm font-bold text-brand">
                <span>Finished coop placeholder</span>
                <span>{product.price}</span>
              </div>
              <div className="mx-auto w-full max-w-lg">
                <div className="relative h-72">
                  <div className="absolute bottom-12 left-8 right-8 h-28 rounded-lg border-4 border-ink bg-white shadow-sm" />
                  <div className="absolute bottom-36 left-14 right-14 h-28 border-x-[118px] border-b-[76px] border-x-transparent border-b-ink" />
                  <div className="absolute bottom-16 left-20 h-20 w-16 rounded-t-lg border-4 border-ink bg-surface" />
                  <div className="absolute bottom-20 right-24 h-16 w-24 rounded-lg border-4 border-ink bg-surface" />
                  <div className="absolute bottom-8 left-2 right-2 h-4 rounded-full bg-ink/10" />
                  <div className="absolute bottom-0 left-20 h-12 w-4 rounded bg-ink" />
                  <div className="absolute bottom-0 right-20 h-12 w-4 rounded bg-ink" />
                </div>
              </div>
              <p className="text-center text-sm font-medium text-muted">
                Replace this with real product photography or renders when ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
