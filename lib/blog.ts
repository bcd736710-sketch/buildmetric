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
  {
    slug: "chicken-coop-layout-ideas-for-small-backyards",
    title: "Chicken Coop Layout Ideas for Small Backyards",
    description:
      "Plan a compact chicken coop layout that fits a small yard without making cleaning or daily care harder.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
  },
  {
    slug: "chicken-run-flooring-ideas",
    title: "Chicken Run Flooring Ideas",
    description:
      "Compare practical chicken run flooring options for drainage, cleaning, comfort, and backyard maintenance.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
  },
  {
    slug: "how-much-does-it-cost-to-build-a-chicken-coop",
    title: "How Much Does It Cost to Build a Chicken Coop?",
    description:
      "Understand the main cost drivers behind a DIY chicken coop, from size and materials to predator protection.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
  },
  {
    slug: "raised-garden-bed-depth-guide",
    title: "Raised Garden Bed Depth Guide",
    description:
      "Choose a practical raised garden bed depth for herbs, greens, root crops, and mixed backyard planting.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
  },
  {
    slug: "how-much-does-it-cost-to-build-a-shed",
    title: "How Much Does It Cost to Build a Shed?",
    description:
      "Plan a realistic DIY shed budget by understanding size, finish level, foundation, and material choices.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;
