"use client";

import { useMemo, useState } from "react";
import {
  calculateChickenFeed,
  chickenFeedOptions,
  type ChickenFeedType,
} from "@/lib/chicken-feed";

export function ChickenFeedCalculator() {
  const [chickens, setChickens] = useState(6);
  const [feedType, setFeedType] = useState<ChickenFeedType>("layer");
  const result = useMemo(
    () => calculateChickenFeed(chickens, feedType),
    [chickens, feedType],
  );

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
        Calculator
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">
        Estimate chicken feed needs
      </h2>
      <p className="mt-3 leading-7 text-muted">
        Enter your flock size and chicken stage to estimate daily, weekly, and
        monthly feed.
      </p>

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
          <span className="text-sm font-semibold text-ink">Chicken stage</span>
          <select
            value={feedType}
            onChange={(event) =>
              setFeedType(event.target.value as ChickenFeedType)
            }
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {chickenFeedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-live="polite">
        <ResultCard label="Daily feed" value={result.dailyFeed} />
        <ResultCard label="Weekly feed" value={result.weeklyFeed} />
        <ResultCard label="Monthly feed" value={result.monthlyFeed} />
      </div>
    </div>
  );
}

function ResultCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-surface p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">
        {value.toFixed(1)}
        <span className="text-base font-medium text-muted"> lb</span>
      </p>
    </div>
  );
}
