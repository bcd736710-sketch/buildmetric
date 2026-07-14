import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "/* TEAM */",
    `Site: ${siteConfig.name}`,
    `Contact: ${siteConfig.contactEmail}`,
    "",
    "/* SITE */",
    `URL: ${siteConfig.url}`,
    "Purpose: Free DIY calculators and planning guides for homeowners.",
    "Audience: English-speaking homeowners planning backyard, garden, shed, chicken, and home improvement projects.",
    "Standards: Transparent formulas, visible assumptions, static-first pages, and practical planning guidance.",
    "",
    "/* IMPORTANT */",
    "BuildMetric estimates are for early planning and do not replace local codes, permits, contractor quotes, engineering, property surveys, utility marking, product labels, or professional advice.",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
