export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  relatedTools: string[];
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
    relatedTools: [
      "chicken-coop-size-calculator",
      "chicken-run-size-calculator",
    ],
  },
  {
    slug: "how-big-should-a-chicken-coop-be",
    title: "How Big Should a Chicken Coop Be?",
    description:
      "A practical guide to choosing chicken coop dimensions from flock size, breed size, and layout.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: [
      "chicken-coop-size-calculator",
      "chicken-run-size-calculator",
    ],
  },
  {
    slug: "chicken-coop-ventilation-guide",
    title: "Chicken Coop Ventilation Guide",
    description:
      "Learn the simple ventilation principles that keep a chicken coop drier, fresher, and safer.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["chicken-coop-size-calculator"],
  },
  {
    slug: "how-much-chicken-feed-per-day",
    title: "How Much Chicken Feed Per Day?",
    description:
      "Estimate daily chicken feed needs and understand what changes feed use from flock to flock.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["chicken-feed-calculator"],
  },
  {
    slug: "how-much-soil-do-i-need-for-a-raised-garden-bed",
    title: "How Much Soil Do I Need for a Raised Garden Bed?",
    description:
      "Calculate raised bed soil volume in cubic feet, cubic yards, and bag counts before you buy.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["raised-garden-bed-soil-calculator"],
  },
  {
    slug: "chicken-coop-layout-ideas-for-small-backyards",
    title: "Chicken Coop Layout Ideas for Small Backyards",
    description:
      "Plan a compact chicken coop layout that fits a small yard without making cleaning or daily care harder.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: [
      "chicken-coop-size-calculator",
      "chicken-run-size-calculator",
    ],
  },
  {
    slug: "chicken-run-flooring-ideas",
    title: "Chicken Run Flooring Ideas",
    description:
      "Compare practical chicken run flooring options for drainage, cleaning, comfort, and backyard maintenance.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["chicken-run-size-calculator"],
  },
  {
    slug: "how-much-does-it-cost-to-build-a-chicken-coop",
    title: "How Much Does It Cost to Build a Chicken Coop?",
    description:
      "Understand the main cost drivers behind a DIY chicken coop, from size and materials to predator protection.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["chicken-coop-size-calculator"],
  },
  {
    slug: "raised-garden-bed-depth-guide",
    title: "Raised Garden Bed Depth Guide",
    description:
      "Choose a practical raised garden bed depth for herbs, greens, root crops, and mixed backyard planting.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["raised-garden-bed-soil-calculator"],
  },
  {
    slug: "how-much-does-it-cost-to-build-a-shed",
    title: "How Much Does It Cost to Build a Shed?",
    description:
      "Plan a realistic DIY shed budget by understanding size, finish level, foundation, and material choices.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "diy-shed-materials-list",
    title: "DIY Shed Materials List",
    description:
      "Plan the main materials you may need for a DIY shed, from framing and siding to roofing, doors, and fasteners.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "10x12-shed-cost-guide",
    title: "10x12 Shed Cost Guide",
    description:
      "Estimate the likely cost of a 10x12 DIY shed and understand which choices change the final budget.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "shed-foundation-cost-guide",
    title: "Shed Foundation Cost Guide",
    description:
      "Compare common shed foundation options and the cost factors behind gravel pads, blocks, piers, and slabs.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "best-soil-mix-for-raised-garden-beds",
    title: "Best Soil Mix for Raised Garden Beds",
    description:
      "Understand simple raised bed soil mix options for drainage, nutrients, structure, and long-term garden health.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["raised-garden-bed-soil-calculator"],
  },
  {
    slug: "how-many-bags-of-soil-for-a-4x8-raised-bed",
    title: "How Many Bags of Soil for a 4x8 Raised Bed?",
    description:
      "Estimate how many bags of soil a 4x8 raised bed needs at common depths before you buy materials.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["raised-garden-bed-soil-calculator"],
  },
  {
    slug: "chicken-coop-materials-list",
    title: "Chicken Coop Materials List",
    description:
      "Plan the main materials for a DIY chicken coop, from framing and siding to roofing, hardware cloth, doors, and latches.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["chicken-coop-size-calculator"],
  },
  {
    slug: "chicken-coop-cleaning-schedule",
    title: "Chicken Coop Cleaning Schedule",
    description:
      "Create a simple chicken coop cleaning routine for daily care, weekly refreshes, and deeper seasonal maintenance.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["chicken-coop-size-calculator"],
  },
  {
    slug: "best-chicken-coop-bedding",
    title: "Best Chicken Coop Bedding",
    description:
      "Compare common chicken coop bedding options for comfort, odor control, moisture management, and cleaning.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["chicken-coop-size-calculator"],
  },
  {
    slug: "raised-garden-bed-size-guide",
    title: "Raised Garden Bed Size Guide",
    description:
      "Choose practical raised garden bed dimensions for backyard layouts, easy reach, soil volume, and planting goals.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["raised-garden-bed-soil-calculator"],
  },
  {
    slug: "diy-shed-permit-basics",
    title: "DIY Shed Permit Basics",
    description:
      "Understand the basic permit and setback questions homeowners should check before building a backyard shed.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "shed-roofing-cost-guide",
    title: "Shed Roofing Cost Guide",
    description:
      "Compare common shed roofing choices and understand how roof size, material, slope, and trim affect cost.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "8x10-shed-cost-guide",
    title: "8x10 Shed Cost Guide",
    description:
      "Estimate the likely cost of an 8x10 DIY shed and see which choices can raise or lower the budget.",
    category: "Backyard DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
  },
  {
    slug: "raised-garden-bed-cost-guide",
    title: "Raised Garden Bed Cost Guide",
    description:
      "Plan a realistic raised garden bed budget by estimating lumber, soil, hardware, and optional upgrades.",
    category: "Garden DIY",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["raised-garden-bed-soil-calculator"],
  },
  {
    slug: "chicken-coop-door-size-guide",
    title: "Chicken Coop Door Size Guide",
    description:
      "Choose practical chicken coop door sizes for chickens, cleaning access, ventilation, and daily care.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "5 min read",
    relatedTools: ["chicken-coop-size-calculator"],
  },
  {
    slug: "predator-proof-chicken-run-guide",
    title: "Predator Proof Chicken Run Guide",
    description:
      "Plan a safer chicken run with practical fencing, hardware cloth, apron, roof, latch, and gap-control ideas.",
    category: "Backyard Chickens",
    publishedAt: "2026-07-13",
    readingTime: "6 min read",
    relatedTools: ["chicken-run-size-calculator", "chicken-coop-size-calculator"],
  },
];

export const blogPostBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPost>;

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
);

export function getRelatedPosts(currentPost: BlogPost, limit = 3) {
  const sameToolPosts = blogPosts.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      post.relatedTools.some((toolSlug) =>
        currentPost.relatedTools.includes(toolSlug),
      ),
  );

  const sameCategoryPosts = blogPosts.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      post.category === currentPost.category &&
      !sameToolPosts.some((relatedPost) => relatedPost.slug === post.slug),
  );

  return [...sameToolPosts, ...sameCategoryPosts].slice(0, limit);
}

export function getPostsForTool(toolSlug: string, limit = 6) {
  return blogPosts
    .filter((post) => post.relatedTools.includes(toolSlug))
    .toReversed()
    .slice(0, limit);
}
