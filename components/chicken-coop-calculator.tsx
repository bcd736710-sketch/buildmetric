"use client";

import { useMemo, useState } from "react";
import {
  chickenSizeOptions,
  coopStyleOptions,
  calculateChickenCoopSpace,
  type ChickenSize,
  type CoopStyle,
} from "@/lib/chicken-coop";

export function ChickenCoopCalculator() {
  const [chickens, setChickens] = useState(6);
  const [chickenSize, setChickenSize] = useState<ChickenSize>("medium");
  const [coopStyle, setCoopStyle] = useState<CoopStyle>("standard");

  const result = useMemo(
    () => calculateChickenCoopSpace(chickens, chickenSize, coopStyle),
    [chickens, chickenSize, coopStyle],
  );

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Calculator
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">
          Estimate your coop size
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Enter your flock size and chicken type to estimate indoor coop space
          and outdoor run space.
        </p>
      </div>

      <div className="mt-8 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">
            Number of chickens
          </span>
          <input
            min={1}
            max={500}
            type="number"
            value={chickens}
            onChange={(event) =>
              setChickens(Math.max(1, Number(event.target.value) || 1))
            }
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Chicken size</span>
          <select
            value={chickenSize}
            onChange={(event) => setChickenSize(event.target.value as ChickenSize)}
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {chickenSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Coop style</span>
          <select
            value={coopStyle}
            onChange={(event) => setCoopStyle(event.target.value as CoopStyle)}
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {coopStyleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <ResultCard
          label="Recommended coop indoor space"
          value={result.coopSpace}
        />
        <ResultCard label="Recommended run space" value={result.runSpace} />
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">
        Coop style adjusts indoor space. Walk-in coops include extra planning
        room for access, cleaning, and layout flexibility.
      </p>
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">
        {value}
        <span className="text-base font-medium text-muted"> sq ft</span>
      </p>
    </div>
  );
}
