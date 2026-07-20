"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/calculator-actions";
import { CalculatorAssumptions } from "@/components/calculator-assumptions";
import { getNumberParam } from "@/lib/calculator-url";
import { calculateConcreteSlab } from "@/lib/concrete-slab";
import { selectNumberOnFocus } from "@/lib/input-behavior";

export function ConcreteSlabCalculator() {
  const [lengthFeet, setLengthFeet] = useState(() => getNumberParam("length", 10, 0, 1000));
  const [widthFeet, setWidthFeet] = useState(() => getNumberParam("width", 12, 0, 1000));
  const [thicknessInches, setThicknessInches] = useState(() => getNumberParam("thickness", 4, 0, 48));
  const [wastePercent, setWastePercent] = useState(() => getNumberParam("waste", 10, 0, 100));
  const result = useMemo(
    () => calculateConcreteSlab(lengthFeet, widthFeet, thicknessInches, wastePercent),
    [lengthFeet, widthFeet, thicknessInches, wastePercent],
  );
  const summary = [
    "Concrete slab estimate",
    `Slab size: ${lengthFeet} ft x ${widthFeet} ft`,
    `Thickness: ${thicknessInches} in`,
    `Concrete: ${result.cubicYards.toFixed(2)} cu yd`,
    `With waste: ${result.cubicYardsWithWaste.toFixed(2)} cu yd`,
    `80 lb bags: ${result.eightyPoundBags}`,
    "Formula: length x width x thickness; waste is added to cubic yards.",
  ].join("\n");

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <CalculatorHeader title="Estimate concrete slab volume" body="Calculate concrete volume for a slab, patio, shed base, or small DIY pad." />
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <NumberInput label="Length (ft)" value={lengthFeet} onChange={setLengthFeet} />
        <NumberInput label="Width (ft)" value={widthFeet} onChange={setWidthFeet} />
        <NumberInput label="Thickness (in)" value={thicknessInches} onChange={setThicknessInches} />
        <NumberInput label="Waste (%)" value={wastePercent} onChange={setWastePercent} />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <ResultCard label="Concrete volume" value={result.cubicYards.toFixed(2)} unit="cu yd" />
        <ResultCard label="With waste" value={result.cubicYardsWithWaste.toFixed(2)} unit="cu yd" />
        <ResultCard label="Concrete volume" value={result.cubicFeet.toFixed(1)} unit="cu ft" />
        <ResultCard label="80 lb bags" value={String(result.eightyPoundBags)} unit="bags" />
      </div>
      <CalculatorAssumptions
        items={[
          "Slab area equals length x width.",
          "Thickness is converted from inches to feet.",
          "Cubic yards are cubic feet divided by 27.",
          "80 lb bag estimate assumes about 0.6 cubic feet per bag.",
        ]}
      />
      <CalculatorActions
        summary={summary}
        shareParams={{ length: lengthFeet, width: widthFeet, thickness: thicknessInches, waste: wastePercent }}
        onReset={() => {
          setLengthFeet(10);
          setWidthFeet(12);
          setThicknessInches(4);
          setWastePercent(10);
        }}
      />
    </div>
  );
}

function CalculatorHeader({ title, body }: { title: string; body: string }) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Calculator</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 leading-7 text-muted">{body}</p>
    </>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input min={0} type="number" value={value} onFocus={selectNumberOnFocus} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10" />
    </label>
  );
}

function ResultCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}<span className="text-base font-medium text-muted"> {unit}</span></p>
    </div>
  );
}
