import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { calculators } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";
import { topicHubs } from "@/lib/topic-hubs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/backyard-diy`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...topicHubs.map((hub) => ({
      url: `${siteConfig.url}/${hub.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.82,
    })),
    ...calculators.map((calculator) => ({
      url: `${siteConfig.url}/tools/${calculator.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
