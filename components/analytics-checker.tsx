"use client";

import { useEffect, useState } from "react";

type CheckState = {
  dataLayer: boolean;
  gtag: boolean;
  googleScriptTag: boolean;
  googleScriptLoaded: boolean;
  pageViewQueued: boolean;
};

const initialState: CheckState = {
  dataLayer: false,
  gtag: false,
  googleScriptTag: false,
  googleScriptLoaded: false,
  pageViewQueued: false,
};

function getGtagCommand(entry: unknown) {
  if (Array.isArray(entry)) {
    return entry[0];
  }

  if (
    entry &&
    typeof entry === "object" &&
    "0" in entry &&
    typeof (entry as { 0?: unknown })[0] === "string"
  ) {
    return (entry as { 0: string })[0];
  }

  return null;
}

export function AnalyticsChecker() {
  const [state, setState] = useState<CheckState>(initialState);

  useEffect(() => {
    const runCheck = () => {
      const scripts = Array.from(document.scripts);
      const googleScript = scripts.find((script) =>
        script.src.includes("googletagmanager.com/gtag/js"),
      );
      const hasDataLayer = Array.isArray(window.dataLayer);
      const dataLayerEntries: unknown[] = hasDataLayer ? window.dataLayer! : [];

      setState({
        dataLayer: hasDataLayer,
        gtag: typeof window.gtag === "function",
        googleScriptTag: Boolean(googleScript),
        googleScriptLoaded: Boolean(googleScript && !googleScript.dataset.failed),
        pageViewQueued: dataLayerEntries.some(
          (entry) => {
            const command = getGtagCommand(entry);

            return command === "event" || command === "config";
          },
        ),
      });
    };

    const scripts = Array.from(document.scripts);
    const googleScript = scripts.find((script) =>
      script.src.includes("googletagmanager.com/gtag/js"),
    );

    if (googleScript) {
      googleScript.addEventListener("load", runCheck, { once: true });
      googleScript.addEventListener(
        "error",
        () => {
          googleScript.dataset.failed = "true";
          runCheck();
        },
        { once: true },
      );
    }

    runCheck();
    const timer = window.setTimeout(runCheck, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const checks = [
    ["Google script tag exists", state.googleScriptTag],
    ["Google script loaded", state.googleScriptLoaded],
    ["window.dataLayer exists", state.dataLayer],
    ["window.gtag exists", state.gtag],
    ["page_view/config queued", state.pageViewQueued],
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase text-leaf">
        Analytics self check
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-ink">
        BuildMetric tracking status
      </h1>
      <p className="mt-4 text-lg text-stone">
        Open this page in the same browser you use for Google Analytics testing.
        If any Google item shows blocked, the browser, proxy, or network is
        preventing GA from loading.
      </p>
      <div className="mt-8 divide-y divide-line rounded-lg border border-line">
        {checks.map(([label, passed]) => (
          <div
            className="flex items-center justify-between gap-4 px-5 py-4"
            key={String(label)}
          >
            <span className="font-semibold text-ink">{label}</span>
            <span
              className={
                passed
                  ? "rounded-full bg-leaf/10 px-3 py-1 text-sm font-bold text-leaf"
                  : "rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700"
              }
            >
              {passed ? "OK" : "Blocked"}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-stone">
        Measurement ID: G-47C9NCOM3K
      </p>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
