"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/calculator-actions";
import { CalculatorAssumptions } from "@/components/calculator-assumptions";
import { getNumberParam, getStringParam } from "@/lib/calculator-url";
import {
  calculateFenceCost,
  fenceMaterialOptions,
  type FenceMaterial,
} from "@/lib/fence-cost";

export function FenceCostCalculator() {
  const [lengthFeet, setLengthFeet] = useState(() =>
    getNumberParam("length", 120, 0, 10000),
  );
  const [material, setMaterial] = useState<FenceMaterial>(() =>
    getStringParam("material", ["wood", "vinyl", "chainLink"], "wood"),
  );
  const [gates, setGates] = useState(() => getNumberParam("gates", 1, 0, 20));
  const result = useMemo(
    () => calculateFenceCost(lengthFeet, material, gates),
    [lengthFeet, material, gates],
  );
  const selectedMaterial =
    fenceMaterialOptions.find((option) => option.value === material) ??
    fenceMaterialOptions[0];
  const summary = [
    "Fence cost estimate",
    `Fence length: ${lengthFeet} ft`,
    `Material: ${selectedMaterial.label}`,
    `Gates: ${gates}`,
    `Material estimate: $${result.materialCost.toLocaleString()}`,
    `Gate allowance: $${result.gateCost.toLocaleString()}`,
    `Estimated total: $${result.estimatedCost.toLocaleString()}`,
    "Formula: fence length x material rate, plus gate allowance.",
  ].join("\n");

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <CalculatorHeader
        title="Estimate fence project cost"
        body="Enter fence length, material type, and gate count to estimate a simple backyard fence budget."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <NumberInput label="Fence length (ft)" value={lengthFeet} onChange={setLengthFeet} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Material</span>
          <select
            value={material}
            onChange={(event) => setMaterial(event.target.value as FenceMaterial)}
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {fenceMaterialOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <NumberInput label="Gates (count)" value={gates} onChange={setGates} />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <ResultCard label="Cost per foot" value={`$${result.costPerFoot}`} unit="/ ft" />
        <ResultCard label="Gate allowance" value={`$${result.gateCost.toLocaleString()}`} unit="" />
        <ResultCard label="Estimated total" value={`$${result.estimatedCost.toLocaleString()}`} unit="" />
      </div>
      <CalculatorAssumptions
        items={[
          "Wood fence uses $28 per linear foot.",
          "Vinyl fence uses $38 per linear foot.",
          "Chain link fence uses $18 per linear foot.",
          "Each gate adds a $250 planning allowance.",
        ]}
      />
      <CalculatorActions
        summary={summary}
        shareParams={{ length: lengthFeet, material, gates }}
        onReset={() => {
          setLengthFeet(120);
          setMaterial("wood");
          setGates(1);
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
      <input min={0} type="number" value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))} className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10" />
    </label>
  );
}

function ResultCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}{unit ? <span className="text-base font-medium text-muted"> {unit}</span> : null}</p>
    </div>
  );
}
