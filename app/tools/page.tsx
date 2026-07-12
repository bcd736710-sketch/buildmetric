import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ToolCard } from "@/components/tool-card";
import { calculators } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "DIY Calculators",
  description:
    "Browse BuildMetric's simple DIY calculators for backyard planning projects.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "DIY Calculators | BuildMetric",
    description:
      "Simple, accurate online calculators for backyard DIY planning.",
    url: "/tools",
  },
};

export default function ToolsPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Tools
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-ink sm:text-5xl">
            DIY calculators for clearer backyard planning.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Start with practical estimates for your next backyard project.
            BuildMetric is growing one focused tool at a time.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {calculators.map((calculator) => (
            <ToolCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </Container>
    </section>
  );
}
