import { PurchaseButton } from "@/components/purchase-button";
import type { ProductConfig } from "@/lib/product";

type ProductDetailsProps = {
  product: ProductConfig;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <>
      <section className="border-b border-line bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand">
              Product overview
            </p>
            <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
              {product.name}
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              {product.overview}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-black text-ink">
                {product.price}
              </span>
              <span className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-muted">
                {product.currency}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-muted">
              {product.digitalLabel}. {product.deliveryNote}
            </p>
            <div className="mt-7">
              <PurchaseButton product={product} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {product.glance.map((item) => (
              <div
                className="rounded-lg border border-line bg-surface p-5"
                key={item.label}
              >
                <p className="text-sm font-bold uppercase text-brand">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl font-black text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-b border-line bg-surface py-16 sm:py-20"
        id="whats-included"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-brand">
              What&apos;s included
            </p>
            <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
              The plan package is built around practical project details.
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {product.includedItems.map((item) => (
              <div className="rounded-lg border border-line bg-white p-6" key={item.title}>
                <h3 className="text-xl font-black text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase text-brand">
              Who this is for
            </p>
            <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
              A focused plan for people who want to build, not browse forever.
            </h2>
          </div>
          <div className="grid gap-4">
            {product.audience.map((item) => (
              <div className="rounded-lg border border-line bg-surface p-6" key={item.title}>
                <h3 className="text-xl font-black text-ink">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
