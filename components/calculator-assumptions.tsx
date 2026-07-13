type CalculatorAssumptionsProps = {
  items: string[];
};

export function CalculatorAssumptions({ items }: CalculatorAssumptionsProps) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface p-4">
      <p className="text-sm font-semibold text-ink">Formula assumptions</p>
      <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 rounded-full bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
