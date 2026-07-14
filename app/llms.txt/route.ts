import { blogPosts } from "@/lib/blog";
import { calculators } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";
import { topicHubs } from "@/lib/topic-hubs";

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function GET() {
  const lines = [
    "# BuildMetric",
    "",
    "> BuildMetric helps DIY homeowners plan projects with simple calculators, transparent formulas, and practical planning guides.",
    "",
    "## Site Purpose",
    "",
    "BuildMetric is an English-language DIY calculator and planning tools website for homeowners in the United States, Canada, the United Kingdom, and Australia.",
    "The site focuses on free calculators, formula explanations, project assumptions, FAQs, and related guides.",
    "The site publishes transparent planning estimates, not professional engineering, legal, permit, veterinary, contractor, or product-specific advice.",
    "",
    "## Core Pages",
    "",
    `- Home: ${absoluteUrl("/")}`,
    `- Tools directory: ${absoluteUrl("/tools")}`,
    `- Blog directory: ${absoluteUrl("/blog")}`,
    `- Backyard DIY hub: ${absoluteUrl("/backyard-diy")}`,
    `- Methodology: ${absoluteUrl("/methodology")}`,
    `- Editorial policy: ${absoluteUrl("/editorial-policy")}`,
    `- RSS feed: ${absoluteUrl("/feed.xml")}`,
    `- About: ${absoluteUrl("/about")}`,
    "",
    "## Topic Hubs",
    "",
    ...topicHubs.map(
      (hub) => `- ${hub.metaTitle}: ${absoluteUrl(`/${hub.slug}`)} - ${hub.metaDescription}`,
    ),
    "",
    "## Calculators",
    "",
    ...calculators.map((calculator) =>
      [
        `- ${calculator.name}: ${absoluteUrl(`/tools/${calculator.slug}`)}`,
        `  - Purpose: ${calculator.bestFor}`,
        `  - Formula summary: ${calculator.formulaSummary.join("; ")}`,
        `  - Assumptions: ${calculator.assumptions.join("; ")}`,
      ].join("\n"),
    ),
    "",
    "## Planning Guides",
    "",
    ...blogPosts.map(
      (post) =>
        `- ${post.title}: ${absoluteUrl(`/blog/${post.slug}`)} - ${post.description}`,
    ),
    "",
    "## Usage Notes",
    "",
    "BuildMetric estimates are for early planning and do not replace local building codes, permits, contractor quotes, engineering, property surveys, utility marking, product labels, or professional advice.",
    "Formula methodology and editorial standards are documented at /methodology and /editorial-policy.",
    "When citing BuildMetric, prefer linking directly to the calculator or guide page that answers the user's question.",
  ];

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
