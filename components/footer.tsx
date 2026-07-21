import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { PurchaseButton } from "@/components/purchase-button";
import { chickenCoopPlan } from "@/lib/product";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <BrandMark />
            <p className="text-lg font-semibold text-ink">BuildMetric</p>
          </div>
          <p className="mt-4 leading-7 text-muted">
            A focused independent site for {chickenCoopPlan.name}.
          </p>
          <div className="mt-6">
            <PurchaseButton product={chickenCoopPlan} />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-sm font-bold uppercase text-brand">Product</p>
            <div className="mt-4 grid gap-3">
              {[
                ["The Plan", "/#the-plan"],
                ["What's Included", "/#whats-included"],
                ["FAQ", "/#faq"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  className="text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase text-brand">Content</p>
            <div className="mt-4 grid gap-3">
              {[
                ["Blog", "/blog"],
                ["Backyard Chickens", "/backyard-chickens"],
                ["Editorial Policy", "/editorial-policy"],
              ].map(([label, href]) => (
                <Link
                  className="text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase text-brand">Site</p>
            <div className="mt-4 grid gap-3">
              {[
                ["Privacy", "/privacy-policy"],
                ["Affiliate Disclosure", "/affiliate-disclosure"],
                ["RSS Feed", "/feed.xml"],
              ].map(([label, href]) => (
                <Link
                  className="text-sm font-medium text-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-10 border-t border-line pt-6">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} BuildMetric. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
