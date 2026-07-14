import type { Metadata } from "next";
import Link from "next/link";
import { ChickenRunCalculator } from "@/components/chicken-run-calculator";
import { Container } from "@/components/container";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

const calculator = calculatorBySlug["chicken-run-size-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

const runSizeRows = [
  {
    flock: "4 chickens",
    dirt: "40-60 sq ft",
    mixed: "44-64 sq ft",
    grass: "48-72 sq ft",
  },
  {
    flock: "6 chickens",
    dirt: "60-90 sq ft",
    mixed: "66-96 sq ft",
    grass: "72-108 sq ft",
  },
  {
    flock: "8 chickens",
    dirt: "80-120 sq ft",
    mixed: "88-128 sq ft",
    grass: "96-144 sq ft",
  },
  {
    flock: "10 chickens",
    dirt: "100-150 sq ft",
    mixed: "110-160 sq ft",
    grass: "120-180 sq ft",
  },
];

const runPlanningFactors = [
  {
    title: "Ground surface",
    description:
      "Grass usually needs more space than dirt because chickens can wear down living ground cover quickly.",
  },
  {
    title: "Drainage",
    description:
      "Wet areas may need extra space, gravel zones, roof cover, or a raised section to reduce mud.",
  },
  {
    title: "Shade and cover",
    description:
      "A more usable run includes shade, wind protection, and safe places for chickens to move around.",
  },
  {
    title: "Predator pressure",
    description:
      "Hardware cloth, apron edges, roof netting, and secure latches can matter as much as total square footage.",
  },
];

const runChecklist = [
  "Choose a run location with drainage and easy daily access.",
  "Plan a predator apron or buried edge around the run perimeter.",
  "Add shade or partial roof cover for hot sun and heavy rain.",
  "Keep feeders and waterers away from the muddiest section.",
  "Leave enough gate width for cleaning tools, bedding, and repairs.",
];

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: {
    canonical: pageUrl,
  },
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
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: calculator.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function ChickenRunSizeCalculatorPage() {
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
            <ChickenRunCalculator />

            <aside className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Quick guide
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Give the flock room to move.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                This calculator adjusts the run estimate by surface type. Dirt,
                mixed ground, and grass have different planning targets because
                they wear and drain differently.
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
                Size chart
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Chicken run size chart
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Compare minimum and comfortable run targets for common flock
                sizes. The range shows a practical lower target and a roomier
                planning target.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-surface text-ink">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Flock size</th>
                      <th className="px-5 py-4 font-semibold">Dirt run</th>
                      <th className="px-5 py-4 font-semibold">Mixed ground</th>
                      <th className="px-5 py-4 font-semibold">Grass run</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-muted">
                    {runSizeRows.map((row) => (
                      <tr key={row.flock}>
                        <th className="px-5 py-4 font-semibold text-ink">
                          {row.flock}
                        </th>
                        <td className="px-5 py-4">{row.dirt}</td>
                        <td className="px-5 py-4">{row.mixed}</td>
                        <td className="px-5 py-4">{row.grass}</td>
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
              How much run space do chickens need?
            </h2>
          </div>
          <div className="space-y-8 text-muted">
            <div>
              <h3 className="text-xl font-semibold text-ink">
                How the calculation works
              </h3>
              <p className="mt-3 leading-8">
                The calculator multiplies your flock size by the selected
                surface target. Dirt uses 10 square feet per chicken as a
                practical minimum and 15 square feet as a more comfortable
                target. Mixed ground uses 11 and 16 square feet. Grass uses 12
                and 18 square feet because it usually needs more room to reduce
                wear.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Example calculation
              </h3>
              <p className="mt-3 leading-8">
                For 6 chickens on dirt, the minimum recommended run space is 60
                square feet and a more comfortable target is 90 square feet. On
                grass, the same flock increases to 72 square feet minimum and
                108 square feet comfortable.
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
                What affects chicken run size?
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Outdoor run space depends on more than the number of chickens.
                A run that stays dry, shaded, and secure is usually easier to
                manage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {runPlanningFactors.map((factor) => (
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
              Before you build the run
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Use the estimate to choose a footprint, then check the practical
              details that keep the run useful through daily care and weather.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <ul className="space-y-4">
              {runChecklist.map((item) => (
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
              Chicken run size questions
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
