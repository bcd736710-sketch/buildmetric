import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { calculators } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculator Methodology",
  description:
    "Learn how BuildMetric calculators are structured, what assumptions they use, and how homeowners should interpret DIY planning estimates.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Calculator Methodology | BuildMetric",
    description:
      "A transparent explanation of BuildMetric calculator formulas, assumptions, and limitations.",
    url: "/methodology",
    type: "website",
  },
};

const principles = [
  {
    title: "Transparent formulas",
    body: "Each calculator is built around a short formula that can be read and checked by a homeowner. We avoid hidden scoring systems when a clear volume, area, cost, or space estimate is enough.",
  },
  {
    title: "Planning estimates",
    body: "BuildMetric results are intended for early planning. They help compare options, prepare shopping lists, and understand scale before calling a contractor or buying materials.",
  },
  {
    title: "Conservative guidance",
    body: "Where uncertainty exists, the calculators highlight assumptions, buffers, and project factors that may increase the final material need or budget.",
  },
  {
    title: "Readable explanations",
    body: "Tool pages include a formula summary, planning assumptions, examples, FAQs, and related guides so both people and AI systems can understand the estimate.",
  },
];

export default function MethodologyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "BuildMetric Calculator Methodology",
    description:
      "How BuildMetric creates transparent DIY calculator formulas, assumptions, and planning estimates.",
    url: `${siteConfig.url}/methodology`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Methodology
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-ink sm:text-6xl">
              How BuildMetric turns DIY questions into practical estimates.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              BuildMetric calculators are designed for homeowners who need a
              fast, understandable planning number before starting a project.
              The formulas are simple on purpose, and every tool explains the
              assumptions behind the result.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {principles.map((principle) => (
            <article
              key={principle.title}
              className="rounded-3xl border border-line bg-white p-7 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-ink">
                {principle.title}
              </h2>
              <p className="mt-4 leading-7 text-muted">{principle.body}</p>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-y border-line bg-surface py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Limitations
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              What the calculators do not replace
            </h2>
          </div>
          <div className="space-y-5 leading-8 text-muted">
            <p>
              BuildMetric does not replace local building codes, permits,
              professional engineering, contractor quotes, veterinary advice,
              utility marking, property surveys, or product label instructions.
            </p>
            <p>
              Real project needs vary by climate, soil, supplier, material
              quality, local rules, installation method, and site conditions.
              Use the calculators as a starting point, then verify important
              decisions before spending money or building.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
            >
              Send methodology feedback
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Formula index
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              Current calculator formulas
            </h2>
            <p className="mt-4 leading-7 text-muted">
              These summaries match the formula blocks shown on each tool page.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {calculators.map((calculator) => (
              <article
                key={calculator.slug}
                className="rounded-3xl border border-line bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-ink">
                      {calculator.name}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-7 text-muted">
                      {calculator.bestFor}
                    </p>
                  </div>
                  <Link
                    href={`/tools/${calculator.slug}`}
                    className="shrink-0 rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
                  >
                    Open tool
                  </Link>
                </div>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {calculator.formulaSummary.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
