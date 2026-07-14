"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/calculator-actions";
import { CalculatorAssumptions } from "@/components/calculator-assumptions";
import { getNumberParam, getStringParam } from "@/lib/calculator-url";
import {
  calculateMulch,
  mulchBagSizeOptions,
  type MulchBagSize,
} from "@/lib/mulch";

export function MulchCalculator() {
  const [lengthFeet, setLengthFeet] = useState(() =>
    getNumberParam("length", 12, 0, 1000),
  );
  const [widthFeet, setWidthFeet] = useState(() =>
    getNumberParam("width", 8, 0, 1000),
  );
  const [depthInches, setDepthInches] = useState(() =>
    getNumberParam("depth", 3, 0, 48),
  );
  const [bagSize, setBagSize] = useState<MulchBagSize>(() =>
    getStringParam("bag", ["two", "three"], "two"),
  );
  const result = useMemo(
    () => calculateMulch(lengthFeet, widthFeet, depthInches, bagSize),
    [lengthFeet, widthFeet, depthInches, bagSize],
  );
  const summary = [
    "Mulch estimate",
    `Area: ${lengthFeet} ft x ${widthFeet} ft`,
    `Depth: ${depthInches} in`,
    `Mulch volume: ${result.cubicFeet.toFixed(1)} cu ft`,
    `Mulch volume: ${result.cubicYards.toFixed(2)} cu yd`,
    `${result.bagSizeCubicFeet} cu ft bags: ${result.bagsNeeded}`,
    "Formula: length x width x depth; bag count rounds up.",
  ].join("\n");

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <CalculatorHeader title="Estimate mulch quantity" body="Enter the project area and mulch depth to estimate cubic feet, cubic yards, and bag count." />
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <NumberInput label="Length (ft)" value={lengthFeet} onChange={setLengthFeet} />
        <NumberInput label="Width (ft)" value={widthFeet} onChange={setWidthFeet} />
        <NumberInput label="Depth (in)" value={depthInches} onChange={setDepthInches} />
      </div>
      <label className="mt-5 grid gap-2">
        <span className="text-sm font-semibold text-ink">Bag size</span>
        <select
          value={bagSize}
          onChange={(event) => setBagSize(event.target.value as MulchBagSize)}
          className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
        >
          {mulchBagSizeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <ResultCard label="Volume" value={result.cubicFeet.toFixed(1)} unit="cu ft" />
        <ResultCard label="Volume" value={result.cubicYards.toFixed(2)} unit="cu yd" />
        <ResultCard label="Bags needed" value={String(result.bagsNeeded)} unit="bags" />
      </div>
      <CalculatorAssumptions
        items={[
          "Area equals length x width.",
          "Depth is converted from inches to feet.",
          "Cubic yards are cubic feet divided by 27.",
          "Bag count rounds up to avoid underbuying.",
        ]}
      />
      <CalculatorActions
        summary={summary}
        shareParams={{ length: lengthFeet, width: widthFeet, depth: depthInches, bag: bagSize }}
        onReset={() => {
          setLengthFeet(12);
          setWidthFeet(8);
          setDepthInches(3);
          setBagSize("two");
        }}
      />
    </div>
  );
}

function CalculatorHeader({ title, body }: { title: string; body: string }) {
  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        Calculator
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 leading-7 text-muted">{body}</p>
    </>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
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

function ResultCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">
        {value}
        <span className="text-base font-medium text-muted"> {unit}</span>
      </p>
    </div>
  );
}
