import type { ProductConfig } from "@/lib/product";

type ProductGalleryProps = {
  product: ProductConfig;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <section className="border-b border-line bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-brand">
            The finished project
          </p>
          <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
            See what you can build.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Product images are placeholders until the final plan assets are
            ready. This section is built for future front, side, back, interior,
            and nesting box views.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-h-[360px] rounded-lg border border-line bg-[linear-gradient(135deg,#f7f8fa_0%,#ffffff_58%,#f4f1eb_100%)] p-6">
            <div className="flex h-full min-h-[312px] items-center justify-center rounded-lg border border-dashed border-line">
              <p className="max-w-sm text-center text-sm font-semibold leading-6 text-muted">
                Main finished coop image placeholder. Use only owned,
                licensed, or generated product assets here.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {product.gallery.slice(1, 4).map((item) => (
              <div
                className="rounded-lg border border-line bg-surface p-5"
                key={item.label}
              >
                <p className="text-lg font-black text-ink">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
