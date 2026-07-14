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

  if (slug === "mulch-calculator") {
    return (
      <svg {...common}>
        <path d="M4 17c3-4 6-6 10-6 3 0 5 2 6 5" />
        <path d="M5 18h14" />
        <path d="M8 14h.01" />
        <path d="M12 13h.01" />
        <path d="M16 14h.01" />
      </svg>
    );
  }

  if (slug === "gravel-calculator") {
    return (
      <svg {...common}>
        <path d="M4 18h16" />
        <path d="M6 18l3-7 3 7" />
        <path d="M12 18l2-5 4 5" />
        <path d="M8 8h.01" />
        <path d="M13 6h.01" />
        <path d="M17 9h.01" />
      </svg>
    );
  }

  if (slug === "fence-cost-calculator") {
    return (
      <svg {...common}>
        <path d="M4 19V8" />
        <path d="M9 19V6" />
        <path d="M15 19V6" />
        <path d="M20 19V8" />
        <path d="M4 11h16" />
        <path d="M4 16h16" />
      </svg>
    );
  }

  if (slug === "concrete-slab-calculator") {
    return (
      <svg {...common}>
        <path d="M4 15 12 9l8 6-8 6-8-6Z" />
        <path d="M4 11 12 5l8 6" />
        <path d="M12 9v12" />
      </svg>
    );
  }

  if (slug === "paint-calculator") {
    return (
      <svg {...common}>
        <path d="M5 4h11a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h1" />
        <path d="M9 16h6v5H9z" />
        <path d="M12 16v5" />
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
