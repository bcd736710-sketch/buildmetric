const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "BuildMetric",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
  contactEmail: "qg231024@outlook.com",
  description:
    "BuildMetric helps homeowners plan DIY projects with simple, accurate, and beautiful online calculators.",
  tagline: "Smart DIY calculators for backyard projects.",
  audience:
    "English-speaking DIY homeowners in the United States, Canada, the United Kingdom, and Australia.",
};
