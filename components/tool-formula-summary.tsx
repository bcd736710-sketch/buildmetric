import { calculatorBySlug } from "@/lib/calculators";

type ToolFormulaSummaryProps = {
  toolSlug: string;
};

export function ToolFormulaSummary({ toolSlug }: ToolFormulaSummaryProps) {
  const calculator = calculatorBySlug[toolSlug];

  if (!calculator) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        Formula and assumptions
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-ink">
        How this estimate should be used
      </h3>
      <p className="mt-4 leading-7 text-muted">{calculator.bestFor}</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl bg-surface p-5">
          <h4 className="font-semibold text-ink">Formula summary</h4>
          <ul className="mt-4 space-y-3">
            {calculator.formulaSummary.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-surface p-5">
          <h4 className="font-semibold text-ink">Planning assumptions</h4>
          <ul className="mt-4 space-y-3">
            {calculator.assumptions.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
