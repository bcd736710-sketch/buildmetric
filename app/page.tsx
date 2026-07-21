import type { Metadata } from "next";
import Link from "next/link";
import { ProductDetails } from "@/components/product-details";
import { ProductFAQ } from "@/components/product-faq";
import { ProductGallery } from "@/components/product-gallery";
import { ProductHero } from "@/components/product-hero";
import { ProductPreview } from "@/components/product-preview";
import { PurchaseButton } from "@/components/purchase-button";
import { chickenCoopPlan } from "@/lib/product";

export const metadata: Metadata = {
  title: "5x6 Chicken Coop Plans",
  description:
    "BuildMetric offers 5x6 chicken coop plans for DIY builders who want a clear backyard chicken coop project plan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "5x6 Chicken Coop Plans | BuildMetric",
    description:
      "A focused digital chicken coop plan for DIY backyard chicken owners.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <ProductHero product={chickenCoopPlan} />
      <ProductDetails product={chickenCoopPlan} />
      <ProductGallery product={chickenCoopPlan} />
      <ProductPreview product={chickenCoopPlan} />
      <ProductFAQ product={chickenCoopPlan} />

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7f8fa_100%)] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="text-sm font-bold uppercase text-brand">
            Ready when checkout is connected
          </p>
          <h2 className="mt-3 text-4xl font-black text-ink sm:text-5xl">
            {chickenCoopPlan.name}
          </h2>
          <p className="mt-4 text-3xl font-black text-ink">
            {chickenCoopPlan.price}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            {chickenCoopPlan.digitalLabel}. {chickenCoopPlan.deliveryNote}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PurchaseButton product={chickenCoopPlan} />
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              href="/contact"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
