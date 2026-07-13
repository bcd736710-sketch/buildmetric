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
  {
    slug: "how-big-should-a-chicken-coop-be",
    title: "How Big Should a Chicken Coop Be?",
    description:
      "A practical guide to choosing chicken coop dimensions from flock size, breed size, and layout.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
  },
  {
    slug: "chicken-coop-ventilation-guide",
    title: "Chicken Coop Ventilation Guide",
    description:
      "Learn the simple ventilation principles that keep a chicken coop drier, fresher, and safer.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
  },
  {
    slug: "how-much-chicken-feed-per-day",
    title: "How Much Chicken Feed Per Day?",
    description:
      "Estimate daily chicken feed needs and understand what changes feed use from flock to flock.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
  },
  {
    slug: "how-much-soil-do-i-need-for-a-raised-garden-bed",
    title: "How Much Soil Do I Need for a Raised Garden Bed?",
    description:
      "Calculate raised bed soil volume in cubic feet, cubic yards, and bag counts before you buy.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;
