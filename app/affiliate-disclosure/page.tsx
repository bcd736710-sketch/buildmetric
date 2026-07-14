import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Read BuildMetric's affiliate and advertising disclosure for calculator guides, product mentions, and future monetization.",
  alternates: {
    canonical: "/affiliate-disclosure",
  },
  openGraph: {
    title: "Affiliate Disclosure | BuildMetric",
    description:
      "BuildMetric may earn revenue from clearly disclosed affiliate links, sponsorships, or advertising in the future.",
    url: "/affiliate-disclosure",
    type: "website",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Disclosure
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              Affiliate Disclosure
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              Last updated: July 15, 2026
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-9 text-muted">
            <section>
              <h2 className="text-2xl font-semibold text-ink">
                How BuildMetric may earn revenue
              </h2>
              <p className="mt-3 leading-8">
                BuildMetric is currently a free DIY planning tools site. In the
                future, some pages may include affiliate links, sponsorships, or
                advertising. If a visitor clicks an affiliate link or buys from
                a partner, BuildMetric may earn a commission at no extra cost to
                the visitor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Editorial independence
              </h2>
              <p className="mt-3 leading-8">
                Calculator formulas, planning assumptions, and guide content are
                written to help homeowners make better early estimates. Business
                relationships should not override practical usefulness,
                transparency, or clear limitations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Product and material mentions
              </h2>
              <p className="mt-3 leading-8">
                Mentions of materials, suppliers, or product categories are for
                planning context. Visitors should still compare local prices,
                product labels, building rules, and supplier guidance before
                buying materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-ink">
                Questions
              </h2>
              <p className="mt-3 leading-8">
                For questions about disclosures, partnerships, or corrections,
                email{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-semibold text-ink underline decoration-line underline-offset-4 transition hover:text-brand"
                >
                  {siteConfig.contactEmail}
                </a>
                {" "}or visit the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-ink underline decoration-line underline-offset-4 transition hover:text-brand"
                >
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </Container>
      </section>
    </>
  );
}

