import type { Metadata } from "next";
import Link from "next/link";
import { ChickenFeedCalculator } from "@/components/chicken-feed-calculator";
import { Container } from "@/components/container";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

const calculator = calculatorBySlug["chicken-feed-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

const feedRows = [
  {
    flock: "4 adult hens",
    daily: "1.1 lb",
    weekly: "7.7 lb",
    monthly: "33 lb",
  },
  {
    flock: "6 adult hens",
    daily: "1.7 lb",
    weekly: "11.6 lb",
    monthly: "49.5 lb",
  },
  {
    flock: "8 adult hens",
    daily: "2.2 lb",
    weekly: "15.4 lb",
    monthly: "66 lb",
  },
  {
    flock: "10 adult hens",
    daily: "2.8 lb",
    weekly: "19.3 lb",
    monthly: "82.5 lb",
  },
];

const feedPlanningFactors = [
  {
    title: "Chicken age",
    description:
      "Chicks, growers, and adult laying hens have different daily feed targets and feed types.",
  },
  {
    title: "Waste and feeder type",
    description:
      "Spilled feed can add up quickly, so a hanging or covered feeder may reduce waste.",
  },
  {
    title: "Forage access",
    description:
      "Free ranging can change feed use, but balanced feed should still be available for steady nutrition.",
  },
  {
    title: "Storage time",
    description:
      "Buying too much feed at once can lead to stale or damp feed if storage is not dry and sealed.",
  },
];

const feedChecklist = [
  "Match feed type to the flock stage: chick starter, grower, layer, or other specific feed.",
  "Store feed in a dry sealed container away from moisture and pests.",
  "Check feeders daily so birds do not run out unexpectedly.",
  "Track real feed use for one week and adjust future estimates.",
  "Avoid buying more feed than you can keep fresh.",
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

export default function ChickenFeedCalculatorPage() {
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
            <ChickenFeedCalculator />
            <aside className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Quick guide
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Plan feed before you run out.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Adult laying hens often eat about 0.25 pounds of feed per day.
                Chicks and growing birds usually need less, so this calculator
                adjusts the estimate by stage and feed buffer.
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
                Feed chart
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Chicken feed estimate chart
              </h2>
              <p className="mt-4 leading-7 text-muted">
                These examples use adult laying hens with the standard feed
                buffer. Use the calculator for chicks, growers, or a different
                buffer.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-surface text-ink">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Flock</th>
                      <th className="px-5 py-4 font-semibold">Daily feed</th>
                      <th className="px-5 py-4 font-semibold">Weekly feed</th>
                      <th className="px-5 py-4 font-semibold">Monthly feed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-muted">
                    {feedRows.map((row) => (
                      <tr key={row.flock}>
                        <th className="px-5 py-4 font-semibold text-ink">
                          {row.flock}
                        </th>
                        <td className="px-5 py-4">{row.daily}</td>
                        <td className="px-5 py-4">{row.weekly}</td>
                        <td className="px-5 py-4">{row.monthly}</td>
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
              How much chicken feed do you need?
            </h2>
          </div>
          <div className="space-y-8 text-muted">
            <div>
              <h3 className="text-xl font-semibold text-ink">
                How the calculation works
              </h3>
              <p className="mt-3 leading-8">
                The calculator multiplies your flock size by a daily feed
                estimate for the selected chicken stage, applies the feed buffer
                for waste or planning margin, then multiplies that amount by 7
                days and 30 days for weekly and monthly planning.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Example calculation
              </h3>
              <p className="mt-3 leading-8">
                For 6 adult laying hens with the standard buffer, the calculator
                estimates about 1.7 pounds of feed per day, 11.6 pounds per
                week, and 49.5 pounds per month.
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
                What affects feed use?
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Feed estimates are best used as a starting point. Real use can
                change with bird age, season, feeder setup, and how much feed
                gets wasted.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {feedPlanningFactors.map((factor) => (
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
              Before buying chicken feed
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Use the estimate to plan a shopping interval, then keep storage
              and flock stage in mind.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <ul className="space-y-4">
              {feedChecklist.map((item) => (
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
              Chicken feed questions
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
