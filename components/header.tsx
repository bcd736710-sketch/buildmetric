import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { PurchaseButton } from "@/components/purchase-button";
import { chickenCoopPlan } from "@/lib/product";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
          aria-label="BuildMetric home"
        >
          <BrandMark />
          <span className="text-base font-semibold tracking-normal text-ink">
            BuildMetric
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-4">
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-semibold text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:inline-flex"
            href="/#the-plan"
          >
            The Plan
          </Link>
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-semibold text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 md:inline-flex"
            href="/#whats-included"
          >
            What&apos;s Included
          </Link>
          <Link
            className="hidden rounded-full px-2 py-1 text-sm font-semibold text-muted transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 sm:inline-flex"
            href="/#faq"
          >
            FAQ
          </Link>
          <PurchaseButton
            className="min-h-10 px-4 py-2"
            product={chickenCoopPlan}
          />
        </nav>
      </Container>
    </header>
  );
}
