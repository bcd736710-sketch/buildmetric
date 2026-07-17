const fallbackSiteUrl = "https://buildmetriccalc.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "BuildMetric",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
  contactEmail: "bcd736710@gmail.com",
  backupContactEmail: "qg231024@outlook.com",
  description:
    "BuildMetric helps homeowners plan backyard DIY projects with simple calculators, material estimates, and practical planning guides.",
  tagline: "Smart DIY calculators and material checklists for backyard projects.",
  audience:
    "English-speaking DIY homeowners in the United States, Canada, the United Kingdom, and Australia.",
};
