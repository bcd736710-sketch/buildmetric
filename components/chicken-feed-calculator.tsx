"use client";

import { useMemo, useState } from "react";
import { CalculatorAssumptions } from "@/components/calculator-assumptions";
import { CalculatorActions } from "@/components/calculator-actions";
import {
  calculateChickenFeed,
  chickenFeedOptions,
  feedWasteOptions,
  type ChickenFeedType,
  type FeedWasteLevel,
} from "@/lib/chicken-feed";
import { getNumberParam, getStringParam } from "@/lib/calculator-url";
import { selectNumberOnFocus } from "@/lib/input-behavior";
import { poundsToKilograms } from "@/lib/units";

export function ChickenFeedCalculator() {
  const [chickens, setChickens] = useState(() =>
    getNumberParam("chickens", 6, 1, 500),
  );
  const [feedType, setFeedType] = useState<ChickenFeedType>(() =>
    getStringParam("stage", ["chick", "grower", "layer"], "layer"),
  );
  const [wasteLevel, setWasteLevel] = useState<FeedWasteLevel>(() =>
    getStringParam("buffer", ["low", "standard", "high"], "standard"),
  );
  const result = useMemo(
    () => calculateChickenFeed(chickens, feedType, wasteLevel),
    [chickens, feedType, wasteLevel],
  );
  const selectedFeed =
    chickenFeedOptions.find((option) => option.value === feedType) ??
    chickenFeedOptions[2];
  const selectedWaste =
    feedWasteOptions.find((option) => option.value === wasteLevel) ??
    feedWasteOptions[1];
  const summary = [
    `Chicken feed estimate for ${chickens} chickens`,
    `Chicken stage: ${selectedFeed.label}`,
    `Feed buffer: ${selectedWaste.label}`,
    `Daily feed: ${result.dailyFeed.toFixed(1)} lb (${poundsToKilograms(result.dailyFeed).toFixed(1)} kg)`,
    `Weekly feed: ${result.weeklyFeed.toFixed(1)} lb (${poundsToKilograms(result.weeklyFeed).toFixed(1)} kg)`,
    `Monthly feed: ${result.monthlyFeed.toFixed(1)} lb (${poundsToKilograms(result.monthlyFeed).toFixed(1)} kg)`,
    "Formula: chicken stage sets daily feed per bird; feed buffer adds planning margin.",
  ].join("\n");

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
            onFocus={selectNumberOnFocus}
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
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-ink">Feed buffer</span>
          <select
            value={wasteLevel}
            onChange={(event) =>
              setWasteLevel(event.target.value as FeedWasteLevel)
            }
            className="h-12 rounded-2xl border border-line bg-white px-4 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {feedWasteOptions.map((option) => (
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

      <p className="mt-5 text-sm leading-6 text-muted">
        Feed buffer adjusts the estimate for waste, spills, open feeders, and a
        small planning margin.
      </p>

      <CalculatorAssumptions
        items={[
          "Chicks use 0.10 lb of feed per bird per day.",
          "Growing chickens use 0.18 lb of feed per bird per day.",
          "Adult laying hens use 0.25 lb of feed per bird per day.",
          "Standard buffer adds 10% for waste and planning margin.",
          "High waste buffer adds 20% for open feeders or higher spill risk.",
        ]}
      />

      <CalculatorActions
        summary={summary}
        shareParams={{
          chickens,
          stage: feedType,
          buffer: wasteLevel,
        }}
        onReset={() => {
          setChickens(6);
          setFeedType("layer");
          setWasteLevel("standard");
        }}
      />
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
      <p className="mt-1 text-sm font-medium text-muted">
        {poundsToKilograms(value).toFixed(1)} kg
      </p>
    </div>
  );
}
