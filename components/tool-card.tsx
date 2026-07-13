import Link from "next/link";
import { ToolIcon } from "@/components/tool-icon";
import type { CalculatorSummary } from "@/lib/calculators";

type ToolCardProps = {
  calculator: CalculatorSummary;
};

export function ToolCard({ calculator }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${calculator.slug}`}
      className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-ink hover:shadow-soft focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface text-brand transition group-hover:bg-brand group-hover:text-white">
        <ToolIcon slug={calculator.slug} />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        {calculator.category}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-ink">
        {calculator.name}
      </h3>
      <p className="mt-3 leading-7 text-muted">{calculator.description}</p>
      <span className="mt-6 inline-flex text-sm font-semibold text-ink transition group-hover:text-brand">
        Open calculator
      </span>
    </Link>
  );
}
