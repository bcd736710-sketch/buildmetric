import type { MetadataRoute } from "next";

const siteUrl = "https://buildmetriccalc.com";

const publicPaths = [
  "/",
  "/products",
  "/products/travel-car",
  "/products/travel-car/pet-travel-carrier",
  "/rfq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
