import type { Metadata } from "next";
import Link from "next/link";
import { ChickenCoopCalculator } from "@/components/chicken-coop-calculator";
import { Container } from "@/components/container";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { buildToolJsonLd } from "@/lib/structured-data";

const calculator = calculatorBySlug["chicken-coop-size-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

const coopSizeRows = [
  {
    flock: "4 chickens",
    small: "12 sq ft",
    medium: "16 sq ft",
    large: "20 sq ft",
    run: "40 sq ft",
  },
  {
    flock: "6 chickens",
    small: "18 sq ft",
    medium: "24 sq ft",
    large: "30 sq ft",
    run: "60 sq ft",
  },
  {
    flock: "8 chickens",
    small: "24 sq ft",
    medium: "32 sq ft",
    large: "40 sq ft",
    run: "80 sq ft",
  },
  {
    flock: "10 chickens",
    small: "30 sq ft",
    medium: "40 sq ft",
    large: "50 sq ft",
    run: "100 sq ft",
  },
];

const planningFactors = [
  {
    title: "Chicken size",
    description:
      "Bantam and smaller breeds need less floor area than large dual-purpose or heavy breeds.",
  },
  {
    title: "Cleaning access",
    description:
      "Walk-in coops usually benefit from extra indoor room for a person, tools, feeders, and bedding changes.",
  },
  {
    title: "Climate and ventilation",
    description:
      "Wet or cold climates can make indoor space, dry bedding, and airflow more important.",
  },
  {
    title: "Future flock growth",
    description:
      "If you may add chickens later, size the coop for the larger flock now instead of rebuilding soon.",
  },
];

const planningChecklist = [
  "Confirm local rules, setbacks, and any permit requirements.",
  "Plan roost bars, nesting boxes, doors, ventilation, and cleaning access.",
  "Add predator protection around doors, windows, vents, and run edges.",
  "Leave room for feeders and waterers without blocking movement.",
  "Choose a run location with drainage, shade, and easy daily access.",
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

const jsonLd = buildToolJsonLd(calculator, pageUrl);

export default function ChickenCoopSizeCalculatorPage() {
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
            <ChickenCoopCalculator />

            <aside className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Quick guide
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Plan for comfort first.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                This calculator estimates minimum indoor coop space and outdoor
                run space. More room is usually better when your site and budget
                allow it.
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
                Chicken coop size chart
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Use this quick chart to compare common backyard flock sizes.
                The indoor numbers show standard coop space before any walk-in
                allowance.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead className="bg-surface text-ink">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Flock size</th>
                      <th className="px-5 py-4 font-semibold">Small birds</th>
                      <th className="px-5 py-4 font-semibold">Medium birds</th>
                      <th className="px-5 py-4 font-semibold">Large birds</th>
                      <th className="px-5 py-4 font-semibold">Run space</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-muted">
                    {coopSizeRows.map((row) => (
                      <tr key={row.flock}>
                        <th className="px-5 py-4 font-semibold text-ink">
                          {row.flock}
                        </th>
                        <td className="px-5 py-4">{row.small}</td>
                        <td className="px-5 py-4">{row.medium}</td>
                        <td className="px-5 py-4">{row.large}</td>
                        <td className="px-5 py-4">{row.run}</td>
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
              How much coop space do chickens need?
            </h2>
          </div>
          <div className="space-y-8 text-muted">
            <div>
              <h3 className="text-xl font-semibold text-ink">
                How the calculation works
              </h3>
              <p className="mt-3 leading-8">
                The calculator multiplies your flock size by the recommended
                indoor space for the selected chicken size. Small chickens use 3
                square feet each, medium chickens use 4 square feet each, and
                large chickens use 5 square feet each. Standard coops use that
                base result, while walk-in coops add a 25% indoor space
                allowance for access and cleaning. Run space is calculated at
                10 square feet per chicken.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Example calculation
              </h3>
              <p className="mt-3 leading-8">
                For 6 medium chickens in a standard coop, the recommended
                indoor coop space is 24 square feet. With a walk-in coop, the
                indoor estimate increases to 30 square feet. The recommended
                outdoor run space is 60 square feet.
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
                What affects coop size?
              </h2>
              <p className="mt-4 leading-7 text-muted">
                The calculator gives a practical starting point, but the final
                layout should also account for how the coop will be used every
                day.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {planningFactors.map((factor) => (
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
              Before you build the coop
            </h2>
            <p className="mt-4 leading-7 text-muted">
              A good size estimate is only one part of the plan. Check these
              details before buying materials or setting posts.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <ul className="space-y-4">
              {planningChecklist.map((item) => (
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
              Chicken coop size questions
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
