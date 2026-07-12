import Link from "next/link";
import type { CalculatorSummary } from "@/lib/calculators";

type ToolCardProps = {
  calculator: CalculatorSummary;
};

export function ToolCard({ calculator }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${calculator.slug}`}
      className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-ink hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        {calculator.category}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-ink">
        {calculator.name}
      </h3>
      <p className="mt-3 leading-7 text-muted">{calculator.description}</p>
      <span className="mt-6 inline-flex text-sm font-semibold text-ink">
        Open calculator
      </span>
    </Link>
  );
}
