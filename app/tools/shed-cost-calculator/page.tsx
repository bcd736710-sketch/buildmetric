import type { Metadata } from "next";
import Link from "next/link";
import { ShedCostCalculator } from "@/components/shed-cost-calculator";
import { Container } from "@/components/container";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

const calculator = calculatorBySlug["shed-cost-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

const shedCostRows = [
  {
    size: "8 x 10 shed",
    basic: "$2,800",
    standard: "$3,600",
    premium: "$5,600",
  },
  {
    size: "10 x 12 shed",
    basic: "$4,200",
    standard: "$5,400",
    premium: "$8,400",
  },
  {
    size: "10 x 16 shed",
    basic: "$5,600",
    standard: "$7,200",
    premium: "$11,200",
  },
  {
    size: "12 x 16 shed",
    basic: "$6,720",
    standard: "$8,640",
    premium: "$13,440",
  },
];

const shedPlanningFactors = [
  {
    title: "Shed size",
    description:
      "Square footage affects framing, floor material, siding, roofing, trim, and foundation needs.",
  },
  {
    title: "Finish level",
    description:
      "Premium doors, windows, siding, roofing, and interior finishes can raise the budget quickly.",
  },
  {
    title: "Foundation type",
    description:
      "A concrete slab costs more than a simple gravel or block base but may suit some sites better.",
  },
  {
    title: "Local requirements",
    description:
      "Permits, setbacks, delivery fees, and site preparation can change the real project cost.",
  },
];

const shedChecklist = [
  "Check local permit, setback, and HOA rules before buying materials.",
  "Confirm the shed footprint fits your yard and access path.",
  "Choose a foundation type based on drainage, soil, and budget.",
  "Add a budget buffer for fasteners, trim, delivery, and tool rentals.",
  "Compare DIY materials with prefab kits if time is limited.",
];

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
      featureList: [
        ...calculator.formulaSummary,
        ...calculator.assumptions,
      ],
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
                vary by materials, foundation type, permits, delivery, and local
                prices.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Cost chart
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                DIY shed cost chart
              </h2>
              <p className="mt-4 leading-7 text-muted">
                These examples show shell cost estimates before foundation
                allowance. Use the calculator for your exact size and foundation
                choice.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-surface text-ink">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Shed size</th>
                      <th className="px-5 py-4 font-semibold">Basic</th>
                      <th className="px-5 py-4 font-semibold">Standard</th>
                      <th className="px-5 py-4 font-semibold">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-muted">
                    {shedCostRows.map((row) => (
                      <tr key={row.size}>
                        <th className="px-5 py-4 font-semibold text-ink">
                          {row.size}
                        </th>
                        <td className="px-5 py-4">{row.basic}</td>
                        <td className="px-5 py-4">{row.standard}</td>
                        <td className="px-5 py-4">{row.premium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                foot based on the selected finish level. It then adds a
                foundation allowance based on the selected foundation type.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Example calculation
              </h3>
              <p className="mt-3 leading-8">
                A 10 by 12 foot standard shed is 120 square feet. At $45 per
                square foot, the build estimate is $5,400. With a gravel or
                block base allowance at $6 per square foot, the estimated total
                becomes $6,120.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Planning details
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                What affects shed cost?
              </h2>
              <p className="mt-4 leading-7 text-muted">
                A shed estimate is most useful when you understand what can
                move the final budget up or down before you buy plans.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {shedPlanningFactors.map((factor) => (
                <article
                  key={factor.title}
                  className="rounded-3xl border border-line bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-ink">
                    {factor.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">
                    {factor.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Checklist
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Before building a shed
            </h2>
            <p className="mt-4 leading-7 text-muted">
              A budget estimate is only the first step. Check site constraints
              and project requirements before ordering materials.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <ul className="space-y-4">
              {shedChecklist.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-muted">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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

      <ToolNextSteps toolSlug={calculator.slug} />
      <RelatedGuides toolSlug={calculator.slug} />
      <RelatedTools currentSlug={calculator.slug} />
    </>
  );
}
