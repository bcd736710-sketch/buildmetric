"use client";

import { useEffect, useState } from "react";

type CheckState = {
  dataLayer: boolean;
  gtag: boolean;
  googleScriptTag: boolean;
  googleScriptLoaded: boolean;
  pageViewQueued: boolean;
  analyticsCheckQueued: boolean;
  collectRequestSent: boolean;
  googleRequests: string[];
};

const initialState: CheckState = {
  dataLayer: false,
  gtag: false,
  googleScriptTag: false,
  googleScriptLoaded: false,
  pageViewQueued: false,
  analyticsCheckQueued: false,
  collectRequestSent: false,
  googleRequests: [],
};

function getGtagCommand(entry: unknown) {
  return getGtagValue(entry, 0);
}

function getGtagValue(entry: unknown, index: number) {
  if (Array.isArray(entry)) {
    return entry[index];
  }

  if (
    entry &&
    typeof entry === "object" &&
    String(index) in entry
  ) {
    return (entry as Record<string, unknown>)[String(index)];
  }

  return null;
}

export function AnalyticsChecker() {
  const [state, setState] = useState<CheckState>(initialState);

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "analytics_check", {
        event_category: "diagnostics",
        event_label: "analytics_check_page",
        send_to: "G-47C9NCOM3K",
      });
    }

    const runCheck = () => {
      const scripts = Array.from(document.scripts);
      const googleScript = scripts.find((script) =>
        script.src.includes("googletagmanager.com/gtag/js"),
      );
      const hasDataLayer = Array.isArray(window.dataLayer);
      const dataLayerEntries: unknown[] = hasDataLayer ? window.dataLayer! : [];
      const performanceEntries = performance.getEntriesByType("resource");
      const googleRequests = performanceEntries
        .map((entry) => entry.name)
        .filter((name) => name.includes("google"))
        .map((name) => {
          try {
            const url = new URL(name);

            return `${url.hostname}${url.pathname}`;
          } catch {
            return name;
          }
        });
      const collectRequestSent = googleRequests.some(
        (name) =>
          name.includes("/g/collect") ||
          name.includes("/j/collect") ||
          name.includes("/collect"),
      );

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
        analyticsCheckQueued: dataLayerEntries.some((entry) => {
          const command = getGtagCommand(entry);

          return (
            command === "event" &&
            getGtagValue(entry, 1) === "analytics_check"
          );
        }),
        collectRequestSent,
        googleRequests: Array.from(new Set(googleRequests)).slice(0, 8),
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
    const lateTimer = window.setTimeout(runCheck, 6000);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(lateTimer);
    };
  }, []);

  const checks = [
    ["Google script tag exists", state.googleScriptTag],
    ["Google script loaded", state.googleScriptLoaded],
    ["window.dataLayer exists", state.dataLayer],
    ["window.gtag exists", state.gtag],
    ["page_view/config queued", state.pageViewQueued],
    ["analytics_check event queued", state.analyticsCheckQueued],
    ["GA collect request sent", state.collectRequestSent],
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
      <div className="mt-8 rounded-lg border border-line bg-white p-5">
        <h2 className="text-lg font-black text-ink">Detected Google requests</h2>
        {state.googleRequests.length > 0 ? (
          <ul className="mt-3 space-y-2 text-sm text-stone">
            {state.googleRequests.map((request) => (
              <li className="break-all font-mono" key={request}>
                {request}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-red-700">
            No Google network requests were visible to this browser page.
          </p>
        )}
      </div>
    </div>
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
