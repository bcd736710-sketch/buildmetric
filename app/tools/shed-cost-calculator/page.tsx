import type { Metadata } from "next";
import Link from "next/link";
import { ShedCostCalculator } from "@/components/shed-cost-calculator";
import { Container } from "@/components/container";
import { RelatedTools } from "@/components/related-tools";
import { calculatorBySlug } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

const calculator = calculatorBySlug["shed-cost-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${calculator.seoTitle} | BuildMetric`,
    description: calculator.metaDescription,
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${calculator.seoTitle} | BuildMetric`,
    description: calculator.metaDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: calculator.name,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      url: `${siteConfig.url}${pageUrl}`,
      description: calculator.metaDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "FAQPage",
      mainEntity: calculator.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function ShedCostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/tools"
              className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Tools
            </Link>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {calculator.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              {calculator.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <ShedCostCalculator />
            <aside className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Quick guide
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Estimate the budget before choosing plans.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                This tool gives a simple square-foot estimate. Real costs can
                vary by materials, foundation, permits, delivery, and local
                prices.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Explanation
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              How shed cost is estimated
            </h2>
          </div>
          <div className="space-y-8 text-muted">
            <div>
              <h3 className="text-xl font-semibold text-ink">
                How the calculation works
              </h3>
              <p className="mt-3 leading-8">
                The calculator multiplies shed length by width to get square
                footage, then multiplies the area by a simple cost per square
                foot based on the selected finish level.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Example calculation
              </h3>
              <p className="mt-3 leading-8">
                A 10 by 12 foot standard shed is 120 square feet. At $45 per
                square foot, the estimated cost is $5,400.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Shed cost questions
            </h2>
          </div>
          <div className="mt-8 grid gap-4">
            {calculator.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <summary className="cursor-pointer text-lg font-semibold text-ink">
                  {faq.question}
                </summary>
                <p className="mt-3 leading-7 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <RelatedTools currentSlug={calculator.slug} />
    </>
  );
}
