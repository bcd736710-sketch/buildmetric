import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const latestPostDate = sortedPosts[0]?.publishedAt ?? new Date().toISOString();

  const items = sortedPosts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(url)}</link>`,
        `<guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        `<category>${escapeXml(post.category)}</category>`,
        `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "<channel>",
    `<title>${escapeXml(siteConfig.name)} Planning Guides</title>`,
    `<link>${escapeXml(absoluteUrl("/blog"))}</link>`,
    `<description>${escapeXml(siteConfig.description)}</description>`,
    "<language>en</language>",
    `<lastBuildDate>${new Date(latestPostDate).toUTCString()}</lastBuildDate>`,
    `<ttl>1440</ttl>`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
