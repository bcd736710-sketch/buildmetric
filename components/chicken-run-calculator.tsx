"use client";

import { useMemo, useState } from "react";
import {
  calculateChickenRunSpace,
  runSurfaceOptions,
  type RunSurface,
} from "@/lib/chicken-run";

export function ChickenRunCalculator() {
  const [chickens, setChickens] = useState(6);
  const [surface, setSurface] = useState<RunSurface>("mixed");

  const result = useMemo(
    () => calculateChickenRunSpace(chickens, surface),
    [chickens, surface],
  );

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
          Calculator
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-ink">
          Estimate your chicken run size
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Enter your flock size to estimate minimum and comfortable outdoor run
          space for backyard chickens.
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
          <span className="text-sm font-semibold text-ink">Run surface</span>
          <select
            value={surface}
            onChange={(event) => setSurface(event.target.value as RunSurface)}
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {runSurfaceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2" aria-live="polite">
        <ResultCard
          label="Minimum recommended run space"
          value={result.minimumRunSpace}
        />
        <ResultCard
          label="More comfortable run space"
          value={result.comfortableRunSpace}
        />
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">
        Surface type adjusts the estimate because grass usually needs more room
        to reduce wear, while dirt and mixed surfaces are planned differently.
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
