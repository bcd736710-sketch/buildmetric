"use client";

import { useMemo, useState } from "react";
import { CalculatorActions } from "@/components/calculator-actions";
import { CalculatorAssumptions } from "@/components/calculator-assumptions";
import { getNumberParam, getStringParam } from "@/lib/calculator-url";
import { calculatePaint, paintCoatOptions, type PaintCoats } from "@/lib/paint";

export function PaintCalculator() {
  const [wallArea, setWallArea] = useState(() => getNumberParam("area", 400, 0, 10000));
  const [coats, setCoats] = useState<PaintCoats>(() =>
    getStringParam("coats", ["one", "two"], "two"),
  );
  const [coverage, setCoverage] = useState(() => getNumberParam("coverage", 350, 1, 1000));
  const result = useMemo(
    () => calculatePaint(wallArea, coats, coverage),
    [wallArea, coats, coverage],
  );
  const summary = [
    "Paint estimate",
    `Wall area: ${wallArea} sq ft`,
    `Coats: ${result.coats}`,
    `Coverage: ${coverage} sq ft per gallon`,
    `Paint needed: ${result.gallons.toFixed(2)} gallons`,
    `Gallons to buy: ${result.gallonsToBuy}`,
    "Formula: wall area x coats, divided by coverage per gallon.",
  ].join("\n");

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <CalculatorHeader title="Estimate paint quantity" body="Enter paintable wall area, coats, and coverage to estimate gallons needed for a room or project." />
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <NumberInput label="Wall area" value={wallArea} onChange={setWallArea} />
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Coats</span>
          <select
            value={coats}
            onChange={(event) => setCoats(event.target.value as PaintCoats)}
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {paintCoatOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <NumberInput label="Coverage / gallon" value={coverage} onChange={setCoverage} />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <ResultCard label="Paintable area" value={result.paintableArea.toFixed(0)} unit="sq ft" />
        <ResultCard label="Paint needed" value={result.gallons.toFixed(2)} unit="gal" />
        <ResultCard label="Gallons to buy" value={String(result.gallonsToBuy)} unit="gal" />
      </div>
      <CalculatorAssumptions
        items={[
          "Paintable area equals wall area x number of coats.",
          "Default coverage is 350 square feet per gallon.",
          "Gallons to buy rounds up to the next whole gallon.",
          "Doors, windows, texture, primer, and color changes can affect real paint use.",
        ]}
      />
      <CalculatorActions
        summary={summary}
        shareParams={{ area: wallArea, coats, coverage }}
        onReset={() => {
          setWallArea(400);
          setCoats("two");
          setCoverage(350);
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
      <p className="mt-2 text-3xl font-semibold text-ink">{value}<span className="text-base font-medium text-muted"> {unit}</span></p>
    </div>
  );
}
