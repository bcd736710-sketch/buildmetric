import type { Metadata } from "next";
import { AnalyticsChecker } from "@/components/analytics-checker";

export const metadata: Metadata = {
  title: "Analytics Check",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AnalyticsCheckPage() {
  return <AnalyticsChecker />;
}
