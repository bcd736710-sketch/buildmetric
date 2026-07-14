import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

export function GET() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: `${siteConfig.name} Planning Guides`,
    home_page_url: siteConfig.url,
    feed_url: absoluteUrl("/feed.json"),
    description: siteConfig.description,
    language: "en",
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    items: sortedPosts.map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);

      return {
        id: url,
        url,
        title: post.title,
        summary: post.description,
        content_text: post.description,
        date_published: new Date(post.publishedAt).toISOString(),
        date_modified: new Date(post.publishedAt).toISOString(),
        tags: [post.category, ...post.relatedTools],
      };
    }),
  };

  return Response.json(feed, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
