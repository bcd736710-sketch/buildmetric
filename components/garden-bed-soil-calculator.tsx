"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/calculator-actions";
import {
  calculateGardenBedSoil,
  soilBagSizeOptions,
  type SoilBagSize,
} from "@/lib/garden-bed-soil";
import { cubicFeetToLiters } from "@/lib/units";

export function GardenBedSoilCalculator() {
  const [lengthFeet, setLengthFeet] = useState(8);
  const [widthFeet, setWidthFeet] = useState(4);
  const [depthInches, setDepthInches] = useState(10);
  const [bagSize, setBagSize] = useState<SoilBagSize>("onePointFive");
  const result = useMemo(
    () => calculateGardenBedSoil(lengthFeet, widthFeet, depthInches, bagSize),
    [lengthFeet, widthFeet, depthInches, bagSize],
  );
  const selectedBagSize =
    soilBagSizeOptions.find((option) => option.value === bagSize) ??
    soilBagSizeOptions[1];
  const summary = [
    "Raised garden bed soil estimate",
    `Bed size: ${lengthFeet} ft x ${widthFeet} ft`,
    `Soil depth: ${depthInches} in`,
    `Soil volume: ${result.cubicFeet.toFixed(1)} cu ft (${cubicFeetToLiters(result.cubicFeet).toFixed(0)} liters)`,
    `Soil volume: ${result.cubicYards.toFixed(2)} cu yd`,
    `${selectedBagSize.label}: ${result.bagsNeeded} bags`,
  ].join("\n");

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        Calculator
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">
        Estimate raised bed soil
      </h2>
      <p className="mt-3 leading-7 text-muted">
        Enter your bed dimensions to estimate soil volume in cubic feet, cubic
        yards, and common bag counts.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <NumberInput label="Length" value={lengthFeet} onChange={setLengthFeet} />
        <NumberInput label="Width" value={widthFeet} onChange={setWidthFeet} />
        <NumberInput
          label="Soil depth"
          value={depthInches}
          onChange={setDepthInches}
        />
      </div>

      <label className="mt-5 grid gap-2">
        <span className="text-sm font-semibold text-ink">Bag size</span>
        <select
          value={bagSize}
          onChange={(event) => setBagSize(event.target.value as SoilBagSize)}
          className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
        >
          {soilBagSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <ResultCard
          label="Soil volume"
          value={result.cubicFeet.toFixed(1)}
          unit="cu ft"
          secondary={`${cubicFeetToLiters(result.cubicFeet).toFixed(0)} liters`}
        />
        <ResultCard label="Soil volume" value={result.cubicYards.toFixed(2)} unit="cu yd" />
        <ResultCard
          label={`${result.bagSizeCubicFeet} cu ft bags`}
          value={String(result.bagsNeeded)}
          unit="bags"
        />
      </div>

      <CalculatorActions
        summary={summary}
        onReset={() => {
          setLengthFeet(8);
          setWidthFeet(4);
          setDepthInches(10);
          setBagSize("onePointFive");
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
        <span className="text-base font-medium text-muted"> {unit}</span>
      </p>
      {secondary ? (
        <p className="mt-1 text-sm font-medium text-muted">{secondary}</p>
      ) : null}
    </div>
  );
}
