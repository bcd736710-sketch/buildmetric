import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ConcreteSlabCalculator } from "@/components/concrete-slab-calculator";
import { Container } from "@/components/container";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedTools } from "@/components/related-tools";
import { ToolNextSteps } from "@/components/tool-next-steps";
import { calculatorBySlug } from "@/lib/calculators";
import { buildToolJsonLd } from "@/lib/structured-data";

const calculator = calculatorBySlug["concrete-slab-calculator"];
const pageUrl = `/tools/${calculator.slug}`;

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: { canonical: pageUrl },
  openGraph: { title: `${calculator.seoTitle} | BuildMetric`, description: calculator.metaDescription, url: pageUrl, type: "website" },
};

const jsonLd = buildToolJsonLd(calculator, pageUrl);

export default function ConcreteSlabCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolHero calculatorName={calculator.name} description={calculator.description} />
      <ToolSection calculator={<ConcreteSlabCalculator />} guideTitle="Estimate concrete before you pour." guideBody="Concrete projects need enough material on hand. Calculate cubic yards first, then add a small waste allowance for uneven base, forms, and ordering margin." />
      <Explanation title="How concrete slab volume is calculated" body="The calculator multiplies length by width by slab thickness. Thickness is converted from inches to feet, cubic feet are divided by 27 for cubic yards, and a waste percentage can be added." example="For a 10 by 12 foot slab at 4 inches thick, the estimate is 1.48 cubic yards. With 10% waste, plan about 1.63 cubic yards." />
      <ConcretePlanningGuide />
      <FaqSection title="Concrete slab calculator questions" />
      <ToolNextSteps toolSlug={calculator.slug} />
      <RelatedGuides toolSlug={calculator.slug} />
      <RelatedTools currentSlug={calculator.slug} />
    </>
  );
}

function ToolHero({ calculatorName, description }: { calculatorName: string; description: string }) {
  return <section className="border-b border-line bg-gradient-to-b from-white to-surface py-14 sm:py-20"><Container><div className="max-w-3xl"><Link href="/tools" className="rounded-full px-2 py-1 text-sm font-semibold text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20">Tools</Link><h1 className="mt-4 text-4xl font-semibold leading-tight text-ink sm:text-5xl">{calculatorName}</h1><p className="mt-5 text-lg leading-8 text-muted">{description}</p></div></Container></section>;
}

function ToolSection({ calculator, guideTitle, guideBody }: { calculator: ReactNode; guideTitle: string; guideBody: string }) {
  return <section className="py-12 sm:py-16"><Container><div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-start">{calculator}<aside className="rounded-3xl border border-line bg-surface p-6"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Quick guide</p><h2 className="mt-3 text-2xl font-semibold text-ink">{guideTitle}</h2><p className="mt-4 leading-7 text-muted">{guideBody}</p></aside></div></Container></section>;
}

function Explanation({ title, body, example }: { title: string; body: string; example: string }) {
  return <section className="border-t border-line py-12 sm:py-16"><Container className="grid gap-12 lg:grid-cols-[0.75fr_1fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Explanation</p><h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2></div><div className="space-y-8 text-muted"><div><h3 className="text-xl font-semibold text-ink">How the calculation works</h3><p className="mt-3 leading-8">{body}</p></div><div><h3 className="text-xl font-semibold text-ink">Example calculation</h3><p className="mt-3 leading-8">{example}</p></div></div></Container></section>;
}

function ConcretePlanningGuide() {
  const guides = [
    { href: "/blog/concrete-bag-calculator-guide", title: "Convert volume into concrete bags", body: "Small slabs and pads may be easier with bagged concrete, but bag yield matters." },
    { href: "/blog/diy-concrete-slab-checklist", title: "Prepare for pour day", body: "Forms, gravel base, reinforcement, tools, finishing, and curing need a plan before concrete arrives." },
    { href: "/blog/concrete-slab-thickness-guide", title: "Choose slab thickness", body: "Thickness affects volume, cost, strength, base prep, and project suitability." },
    { href: "/blog/concrete-slab-cost-by-size", title: "Compare common slab sizes", body: "Use size examples to understand how footprint and thickness move the budget." },
  ];

  return (
    <section className="border-t border-line py-12 sm:py-16">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Pour planning</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink">Plan the slab beyond cubic yards.</h2>
          <p className="mt-4 leading-8 text-muted">Concrete quantity is only the first number. Thickness, bags versus delivery, base prep, forms, tools, and curing all affect the finished slab.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="rounded-3xl border border-line bg-surface p-6 transition hover:border-ink hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20">
              <h3 className="text-xl font-semibold text-ink">{guide.title}</h3>
              <p className="mt-3 leading-7 text-muted">{guide.body}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-ink">Read guide</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection({ title }: { title: string }) {
  return <section className="border-t border-line bg-surface py-12 sm:py-16"><Container><p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">FAQ</p><h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2><div className="mt-8 grid gap-4">{calculator.faqs.map((faq) => <details key={faq.question} className="rounded-2xl border border-line bg-white p-5"><summary className="cursor-pointer text-lg font-semibold text-ink">{faq.question}</summary><p className="mt-3 leading-7 text-muted">{faq.answer}</p></details>)}</div></Container></section>;
}
