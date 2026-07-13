import type { CalculatorSummary } from "@/lib/calculators";

type ToolIconProps = {
  slug: CalculatorSummary["slug"];
};

export function ToolIcon({ slug }: ToolIconProps) {
  const common = {
    className: "h-7 w-7",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (slug === "chicken-run-size-calculator") {
    return (
      <svg {...common}>
        <path d="M4 17V7l8-4 8 4v10" />
        <path d="M4 17h16" />
        <path d="M8 17V9" />
        <path d="M12 17V7" />
        <path d="M16 17V9" />
      </svg>
    );
  }

  if (slug === "chicken-feed-calculator") {
    return (
      <svg {...common}>
        <path d="M7 7h10l1 13H6L7 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
        <path d="M9 12h6" />
        <path d="M10 16h4" />
      </svg>
    );
  }

  if (slug === "raised-garden-bed-soil-calculator") {
    return (
      <svg {...common}>
        <path d="M4 10h16v8H4z" />
        <path d="M6 10V7h12v3" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    );
  }

  if (slug === "shed-cost-calculator") {
    return (
      <svg {...common}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M9 20v-6h6v6" />
        <path d="M16.5 5.5v3" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 20V9l7-5 7 5v11" />
      <path d="M9 20v-7h6v7" />
      <path d="M7 11h10" />
    </svg>
  );
}
