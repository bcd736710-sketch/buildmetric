import type { ProductConfig } from "@/lib/product";

type ProductFAQProps = {
  product: ProductConfig;
};

export function ProductFAQ({ product }: ProductFAQProps) {
  return (
    <section className="border-b border-line bg-white py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <p className="text-sm font-bold uppercase text-brand">FAQ</p>
        <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
          Questions before you buy.
        </h2>
        <div className="mt-9 grid gap-3">
          {product.faqs.map((faq) => (
            <details
              className="rounded-lg border border-line bg-surface p-5"
              key={faq.question}
            >
              <summary className="cursor-pointer text-lg font-black text-ink">
                {faq.question}
              </summary>
              <p className="mt-4 leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
