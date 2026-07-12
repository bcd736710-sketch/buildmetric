const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "BuildMetric",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
  description:
    "BuildMetric helps homeowners plan DIY projects with simple, accurate, and beautiful online calculators.",
};
