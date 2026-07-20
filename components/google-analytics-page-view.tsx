"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type GoogleAnalyticsPageViewProps = {
  measurementId: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalyticsPageView({
  measurementId,
}: GoogleAnalyticsPageViewProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
      send_to: measurementId,
    });
  }, [measurementId, pathname]);

  return null;
}
