const fallbackSiteUrl = "https://buildmetriccalc.com";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "The Sky Remembers",
  brandName: "THE SKY REMEMBERS",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl),
  contactEmail: "bcd736710@gmail.com",
  backupContactEmail: "qg231024@outlook.com",
  googleAnalyticsId:
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-47C9NCOM3K",
  description:
    "The Sky Remembers creates personalized celestial artwork from a meaningful date, time, and place.",
  tagline: "Personalized star maps for meaningful moments.",
  audience:
    "People looking for meaningful personalized digital artwork, anniversary gifts, memorial keepsakes, and celestial prints.",
};
