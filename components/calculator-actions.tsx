"use client";

import { useState } from "react";

type CalculatorActionsProps = {
  summary: string;
  onReset: () => void;
  shareParams?: Record<string, string | number>;
};

export function CalculatorActions({
  summary,
  onReset,
  shareParams,
}: CalculatorActionsProps) {
  const [status, setStatus] = useState("");

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus("Estimate copied.");
    } catch {
      setStatus("Copy failed. Select the text and copy manually.");
    }
  }

  async function copyShareLink() {
    if (!shareParams) {
      setStatus("Share link is not available for this calculator.");
      return;
    }

    const { buildCalculatorUrl } = await import("@/lib/calculator-url");
    const shareUrl = buildCalculatorUrl(shareParams);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("Share link copied.");
    } catch {
      setStatus("Copy failed. Select the URL and copy manually.");
    }
  }

  function printPage() {
    window.print();
    setStatus("Print dialog opened.");
  }

  return (
    <div className="mt-6 rounded-2xl border border-line bg-white p-4">
      <p className="text-sm font-semibold text-ink">Planning summary</p>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted">
        {summary}
      </p>
      {shareParams ? (
        <p className="mt-3 text-xs font-medium text-muted">
          Share links keep the current inputs so you can return to this estimate
          later.
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={copySummary}
          className="inline-flex justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
        >
          Copy estimate
        </button>
        <button
          type="button"
          onClick={copyShareLink}
          className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
        >
          Copy share link
        </button>
        <button
          type="button"
          onClick={printPage}
          className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
        >
          Print
        </button>
        <button
          type="button"
          onClick={() => {
            onReset();
            setStatus("Inputs reset.");
          }}
          className="inline-flex justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
        >
          Reset inputs
        </button>
      </div>
      <p className="mt-3 min-h-5 text-sm font-medium text-brand" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
