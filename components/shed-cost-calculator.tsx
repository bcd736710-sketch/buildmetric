"use client";

import { useMemo, useState } from "react";
import { CalculatorAssumptions } from "@/components/calculator-assumptions";
import { CalculatorActions } from "@/components/calculator-actions";
import {
  calculateShedCost,
  shedFoundationOptions,
  shedFinishOptions,
  type ShedFoundationType,
  type ShedFinishLevel,
} from "@/lib/shed-cost";
import { getNumberParam, getStringParam } from "@/lib/calculator-url";
import { selectNumberOnFocus } from "@/lib/input-behavior";
import { squareFeetToSquareMeters } from "@/lib/units";

export function ShedCostCalculator() {
  const [lengthFeet, setLengthFeet] = useState(() =>
    getNumberParam("length", 10, 0, 500),
  );
  const [widthFeet, setWidthFeet] = useState(() =>
    getNumberParam("width", 12, 0, 500),
  );
  const [finishLevel, setFinishLevel] = useState<ShedFinishLevel>(() =>
    getStringParam("finish", ["basic", "standard", "premium"], "standard"),
  );
  const [foundationType, setFoundationType] =
    useState<ShedFoundationType>(() =>
      getStringParam("foundation", ["none", "gravel", "concrete"], "gravel"),
    );
  const result = useMemo(
    () => calculateShedCost(lengthFeet, widthFeet, finishLevel, foundationType),
    [lengthFeet, widthFeet, finishLevel, foundationType],
  );
  const selectedFinish =
    shedFinishOptions.find((option) => option.value === finishLevel) ??
    shedFinishOptions[1];
  const selectedFoundation =
    shedFoundationOptions.find((option) => option.value === foundationType) ??
    shedFoundationOptions[1];
  const summary = [
    "Shed cost estimate",
    `Shed size: ${lengthFeet} ft x ${widthFeet} ft`,
    `Finish level: ${selectedFinish.label}`,
    `Foundation: ${selectedFoundation.label}`,
    `Shed area: ${result.squareFeet.toFixed(0)} sq ft (${squareFeetToSquareMeters(result.squareFeet).toFixed(1)} sq m)`,
    `Build estimate: $${result.buildCost.toLocaleString()}`,
    `Foundation allowance: $${result.foundationCost.toLocaleString()}`,
    `Estimated total: $${result.estimatedCost.toLocaleString()}`,
    "Formula: shed area x finish rate, plus selected foundation allowance.",
  ].join("\n");

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        Calculator
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">
        Estimate shed project cost
      </h2>
      <p className="mt-3 leading-7 text-muted">
        Enter shed dimensions and finish level to estimate a simple DIY shed
        budget.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <NumberInput label="Length" value={lengthFeet} onChange={setLengthFeet} />
        <NumberInput label="Width" value={widthFeet} onChange={setWidthFeet} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Finish level</span>
          <select
            value={finishLevel}
            onChange={(event) =>
              setFinishLevel(event.target.value as ShedFinishLevel)
            }
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {shedFinishOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Foundation</span>
          <select
            value={foundationType}
            onChange={(event) =>
              setFoundationType(event.target.value as ShedFoundationType)
            }
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {shedFoundationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <ResultCard
          label="Shed area"
          value={result.squareFeet.toFixed(0)}
          unit="sq ft"
          secondary={`${squareFeetToSquareMeters(result.squareFeet).toFixed(1)} sq m`}
        />
        <ResultCard
          label="Build estimate"
          value={`$${result.buildCost.toLocaleString()}`}
          unit=""
        />
        <ResultCard
          label="Foundation allowance"
          value={`$${result.foundationCost.toLocaleString()}`}
          unit=""
        />
        <ResultCard
          label="Estimated total"
          value={`$${result.estimatedCost.toLocaleString()}`}
          unit=""
        />
      </div>

      <CalculatorAssumptions
        items={[
          "Shed area equals length x width.",
          "Basic finish uses $25 per sq ft.",
          "Standard finish uses $45 per sq ft.",
          "Premium finish uses $75 per sq ft.",
          "Gravel or block base adds $6 per sq ft; concrete slab adds $14 per sq ft.",
        ]}
      />

      <CalculatorActions
        summary={summary}
        shareParams={{
          length: lengthFeet,
          width: widthFeet,
          finish: finishLevel,
          foundation: foundationType,
        }}
        onReset={() => {
          setLengthFeet(10);
          setWidthFeet(12);
          setFinishLevel("standard");
          setFoundationType("gravel");
        }}
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        min={0}
        type="number"
        value={value}
        onFocus={selectNumberOnFocus}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
        className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
    </label>
  );
}

function ResultCard({
  label,
  value,
  unit,
  secondary,
}: {
  label: string;
  value: string;
  unit: string;
  secondary?: string;
}) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">
        {value}
        {unit ? <span className="text-base font-medium text-muted"> {unit}</span> : null}
      </p>
      {secondary ? (
        <p className="mt-1 text-sm font-medium text-muted">{secondary}</p>
      ) : null}
    </div>
  );
}
