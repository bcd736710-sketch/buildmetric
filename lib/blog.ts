export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-much-space-does-a-chicken-need",
    title: "How Much Space Does a Chicken Need?",
    description:
      "Simple coop and run space guidelines for planning a healthier backyard chicken setup.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;
