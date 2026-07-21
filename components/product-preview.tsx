import type { ProductConfig } from "@/lib/product";

type ProductPreviewProps = {
  product: ProductConfig;
};

export function ProductPreview({ product }: ProductPreviewProps) {
  return (
    <section className="border-b border-line bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase text-brand">
              Product preview
            </p>
            <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
              Preview structure ready for real plan samples.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted">
              This area is intentionally placeholder-only until verified product
              pages, diagrams, and material samples are available.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {product.previews.map((preview) => (
              <div
                className="rounded-lg border border-line bg-white p-5"
                key={preview.title}
              >
                <div className="mb-5 aspect-[4/3] rounded-lg border border-dashed border-line bg-surface" />
                <h3 className="text-xl font-black text-ink">
                  {preview.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {preview.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
