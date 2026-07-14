import type { Metadata } from "next";
import Link from "next/link";
import { GardenBedSoilCalculator } from "@/components/garden-bed-soil-calculator";
import { Container } from "@/components/container";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { buildToolJsonLd } from "@/lib/structured-data";

const calculator = calculatorBySlug["raised-garden-bed-soil-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

const soilRows = [
  {
    bed: "4 x 4 bed",
    sixInches: "8 cu ft",
    tenInches: "13.3 cu ft",
    twelveInches: "16 cu ft",
  },
  {
    bed: "4 x 8 bed",
    sixInches: "16 cu ft",
    tenInches: "26.7 cu ft",
    twelveInches: "32 cu ft",
  },
  {
    bed: "3 x 6 bed",
    sixInches: "9 cu ft",
    tenInches: "15 cu ft",
    twelveInches: "18 cu ft",
  },
  {
    bed: "2 x 8 bed",
    sixInches: "8 cu ft",
    tenInches: "13.3 cu ft",
    twelveInches: "16 cu ft",
  },
];

const soilPlanningFactors = [
  {
    title: "Bed depth",
    description:
      "Depth has a direct impact on volume. Doubling depth doubles the amount of soil needed.",
  },
  {
    title: "Soil settling",
    description:
      "Fresh soil often settles after watering, so many gardeners buy a little extra for topping up.",
  },
  {
    title: "Bag size",
    description:
      "Bag counts change quickly between 1, 1.5, and 2 cubic foot bags, so check the label before buying.",
  },
  {
    title: "Bulk vs bagged soil",
    description:
      "Large beds may be cheaper with bulk delivery, while small beds are often easier with bagged soil.",
  },
];

const soilChecklist = [
  "Measure inside dimensions if the bed walls are thick.",
  "Convert soil depth from inches to feet before multiplying.",
  "Compare bagged soil with bulk delivery for larger projects.",
  "Leave room for compost, mulch, or amendments if you plan to add them.",
  "Water the bed and expect some settling before final planting.",
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

const jsonLd = buildToolJsonLd(calculator, pageUrl);

export default function RaisedGardenBedSoilCalculatorPage() {
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
            <GardenBedSoilCalculator />
            <aside className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Quick guide
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Buy enough soil the first time.
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Raised beds are volume projects. Measure length, width, and
                depth carefully, then plan for a little settling after watering.
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
                Soil chart
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-ink">
                Raised bed soil volume chart
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Use these common bed sizes as a quick planning reference, then
                use the calculator for your exact dimensions and bag size.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-sm">
                  <thead className="bg-surface text-ink">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Bed size</th>
                      <th className="px-5 py-4 font-semibold">6 in deep</th>
                      <th className="px-5 py-4 font-semibold">10 in deep</th>
                      <th className="px-5 py-4 font-semibold">12 in deep</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line text-muted">
                    {soilRows.map((row) => (
                      <tr key={row.bed}>
                        <th className="px-5 py-4 font-semibold text-ink">
                          {row.bed}
                        </th>
                        <td className="px-5 py-4">{row.sixInches}</td>
                        <td className="px-5 py-4">{row.tenInches}</td>
                        <td className="px-5 py-4">{row.twelveInches}</td>
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
              How raised bed soil is calculated
            </h2>
          </div>
          <div className="space-y-8 text-muted">
            <div>
              <h3 className="text-xl font-semibold text-ink">
                How the calculation works
              </h3>
              <p className="mt-3 leading-8">
                The calculator multiplies length by width by soil depth. Depth
                is converted from inches to feet before calculating cubic feet.
                It also converts cubic feet to cubic yards and estimates bag
                count using your selected bag size.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink">
                Example calculation
              </h3>
              <p className="mt-3 leading-8">
                An 8 by 4 foot raised bed filled 10 inches deep needs about
                26.7 cubic feet of soil, or roughly 18 bags at 1.5 cubic feet
                per bag. If you switch to 2 cubic foot bags, the estimate drops
                to 14 bags.
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
                What affects soil quantity?
              </h2>
              <p className="mt-4 leading-7 text-muted">
                Soil volume is simple math, but the buying decision depends on
                depth, bag size, settling, and whether bulk delivery makes
                sense.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {soilPlanningFactors.map((factor) => (
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
              Before buying raised bed soil
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Check measurements and buying options before loading bags into
              the cart.
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <ul className="space-y-4">
              {soilChecklist.map((item) => (
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
              Raised garden bed soil questions
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
