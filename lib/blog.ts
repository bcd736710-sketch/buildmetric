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
  {
    slug: "how-much-mulch-do-i-need",
    title: "How Much Mulch Do I Need?",
    description:
      "Estimate mulch volume for landscape beds and understand how depth, area, bags, and cubic yards work together.",
    category: "Garden DIY",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["mulch-calculator", "raised-garden-bed-soil-calculator"],
  },
  {
    slug: "mulch-depth-guide",
    title: "Mulch Depth Guide",
    description:
      "Choose a practical mulch depth for garden beds, trees, shrubs, and landscape refresh projects.",
    category: "Garden DIY",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["mulch-calculator"],
  },
  {
    slug: "how-much-gravel-do-i-need",
    title: "How Much Gravel Do I Need?",
    description:
      "Calculate gravel volume and tons for paths, pads, shed bases, and simple backyard projects.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["gravel-calculator"],
  },
  {
    slug: "gravel-depth-guide",
    title: "Gravel Depth Guide",
    description:
      "Choose gravel depth for paths, landscape areas, shed bases, and compacted backyard pads.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["gravel-calculator"],
  },
  {
    slug: "how-much-does-a-fence-cost",
    title: "How Much Does a Fence Cost?",
    description:
      "Plan a fence budget by understanding linear feet, materials, gates, terrain, and local project factors.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    relatedTools: ["fence-cost-calculator"],
  },
  {
    slug: "wood-vs-vinyl-vs-chain-link-fence-cost",
    title: "Wood vs Vinyl vs Chain Link Fence Cost",
    description:
      "Compare common fence material choices by budget, maintenance, privacy, and backyard use case.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    relatedTools: ["fence-cost-calculator"],
  },
  {
    slug: "how-much-concrete-do-i-need-for-a-slab",
    title: "How Much Concrete Do I Need for a Slab?",
    description:
      "Estimate concrete slab volume in cubic yards from length, width, thickness, and waste allowance.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["concrete-slab-calculator", "shed-cost-calculator"],
  },
  {
    slug: "concrete-slab-thickness-guide",
    title: "Concrete Slab Thickness Guide",
    description:
      "Understand how slab thickness affects concrete volume, cost, durability, and project planning.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator"],
  },
  {
    slug: "how-much-paint-do-i-need",
    title: "How Much Paint Do I Need?",
    description:
      "Estimate paint gallons from wall area, coats, and coverage before starting a room or home project.",
    category: "Home Improvement",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "paint-coverage-guide",
    title: "Paint Coverage Guide",
    description:
      "Understand paint coverage per gallon and the factors that change how much paint a project really needs.",
    category: "Home Improvement",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "mulch-vs-gravel",
    title: "Mulch vs Gravel: Which Is Better for Your Yard?",
    description:
      "Compare mulch and gravel for garden beds, paths, drainage, maintenance, cost, and long-term yard planning.",
    category: "Garden DIY",
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    relatedTools: ["mulch-calculator", "gravel-calculator"],
  },
  {
    slug: "gravel-base-for-shed-guide",
    title: "Gravel Base for Shed Guide",
    description:
      "Plan a practical gravel shed base by estimating depth, footprint, compaction, edging, and drainage needs.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    relatedTools: ["gravel-calculator", "shed-cost-calculator"],
  },
  {
    slug: "fence-gate-cost-guide",
    title: "Fence Gate Cost Guide",
    description:
      "Understand how gate count, width, hardware, posts, and material choices affect a backyard fence budget.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["fence-cost-calculator"],
  },
  {
    slug: "concrete-slab-cost-guide",
    title: "Concrete Slab Cost Guide",
    description:
      "Plan a concrete slab budget by estimating volume, thickness, waste, base prep, forms, reinforcement, and finishing.",
    category: "Backyard DIY",
    publishedAt: "2026-07-14",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator"],
  },
  {
    slug: "paint-coverage-by-room",
    title: "Paint Coverage by Room",
    description:
      "Estimate paint coverage for bedrooms, bathrooms, kitchens, living rooms, and small repainting projects.",
    category: "Home Improvement",
    publishedAt: "2026-07-14",
    readingTime: "5 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "concrete-slab-cost-by-size",
    title: "Concrete Slab Cost by Size",
    description:
      "Compare concrete slab planning costs by common sizes and see how thickness, waste, and prep affect the estimate.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator"],
  },
  {
    slug: "how-much-gravel-for-a-driveway",
    title: "How Much Gravel for a Driveway?",
    description:
      "Estimate gravel volume and tons for a driveway by measuring length, width, depth, and compaction needs.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "6 min read",
    relatedTools: ["gravel-calculator"],
  },
  {
    slug: "mulch-calculator-by-area",
    title: "Mulch Calculator by Area",
    description:
      "Estimate mulch for common bed areas and understand how square footage, depth, bags, and cubic yards connect.",
    category: "Garden DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["mulch-calculator"],
  },
  {
    slug: "paint-calculator-for-bedrooms",
    title: "Paint Calculator for Bedrooms",
    description:
      "Estimate bedroom paint gallons from wall area, coats, coverage, windows, doors, and color changes.",
    category: "Home Improvement",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "wood-fence-cost-per-foot",
    title: "Wood Fence Cost per Foot",
    description:
      "Plan a wood fence budget by estimating linear feet, gates, posts, height, hardware, and finish choices.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["fence-cost-calculator"],
  },
  {
    slug: "chain-link-fence-cost-guide",
    title: "Chain Link Fence Cost Guide",
    description:
      "Estimate chain link fence costs by length, gates, height, coatings, privacy options, and site conditions.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["fence-cost-calculator"],
  },
  {
    slug: "concrete-for-shed-base",
    title: "Concrete for Shed Base",
    description:
      "Estimate concrete for a shed base and compare slab thickness, waste allowance, gravel prep, and shed size.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator", "shed-cost-calculator"],
  },
  {
    slug: "gravel-path-depth-guide",
    title: "Gravel Path Depth Guide",
    description:
      "Choose a practical gravel depth for garden paths, side yards, walkways, edging, and compacted base layers.",
    category: "Garden DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["gravel-calculator", "mulch-calculator"],
  },
  {
    slug: "paint-calculator-for-living-rooms",
    title: "Paint Calculator for Living Rooms",
    description:
      "Estimate living room paint gallons by measuring wall area, openings, coats, coverage, and color changes.",
    category: "Home Improvement",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "paint-calculator-for-kitchens",
    title: "Paint Calculator for Kitchens",
    description:
      "Estimate kitchen paint needs around cabinets, tile, doors, windows, wall repairs, and washable paint choices.",
    category: "Home Improvement",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "paint-primer-guide",
    title: "Paint Primer Guide",
    description:
      "Decide when primer is worth using and how to estimate primer separately from finish paint.",
    category: "Home Improvement",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "interior-vs-exterior-paint-guide",
    title: "Interior vs Exterior Paint Guide",
    description:
      "Compare interior and exterior paint by durability, cleanup, surface needs, sheen, and project fit before you buy.",
    category: "Home Improvement",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "paint-tools-and-materials-checklist",
    title: "Paint Tools and Materials Checklist",
    description:
      "Plan the paint, primer, rollers, brushes, tape, drop cloths, trays, patching supplies, and cleanup items for a room project.",
    category: "Home Improvement",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["paint-calculator"],
  },
  {
    slug: "how-much-gravel-for-a-patio-base",
    title: "How Much Gravel for a Patio Base?",
    description:
      "Estimate gravel for a patio base by planning footprint, depth, compaction, edging, and drainage.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "6 min read",
    relatedTools: ["gravel-calculator", "concrete-slab-calculator"],
  },
  {
    slug: "gravel-for-dog-run-guide",
    title: "Gravel for Dog Run Guide",
    description:
      "Plan gravel depth and material needs for a dog run while considering drainage, comfort, cleaning, and edging.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["gravel-calculator", "fence-cost-calculator"],
  },
  {
    slug: "gravel-types-guide",
    title: "Gravel Types Guide",
    description:
      "Compare common gravel types for driveways, paths, shed bases, patios, drainage, and decorative yard projects.",
    category: "Backyard DIY",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["gravel-calculator"],
  },
  {
    slug: "gravel-delivery-cost-guide",
    title: "Gravel Delivery Cost Guide",
    description:
      "Understand how gravel delivery, minimum orders, access, dump location, and spreading can affect the real project budget.",
    category: "Backyard DIY",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["gravel-calculator"],
  },
  {
    slug: "concrete-patio-calculator-guide",
    title: "Concrete Patio Calculator Guide",
    description:
      "Estimate concrete for a patio by planning length, width, slab thickness, waste, forms, and base prep.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator"],
  },
  {
    slug: "concrete-walkway-calculator-guide",
    title: "Concrete Walkway Calculator Guide",
    description:
      "Estimate concrete for a walkway from path length, width, thickness, curves, waste, and finishing needs.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["concrete-slab-calculator", "gravel-calculator"],
  },
  {
    slug: "concrete-bag-calculator-guide",
    title: "Concrete Bag Calculator Guide",
    description:
      "Estimate how many concrete bags a small slab, pad, footing, or repair project may need before buying materials.",
    category: "Backyard DIY",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator"],
  },
  {
    slug: "diy-concrete-slab-checklist",
    title: "DIY Concrete Slab Checklist",
    description:
      "Plan forms, base prep, reinforcement, tools, ordering, pouring, finishing, and curing before a small concrete slab project.",
    category: "Backyard DIY",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["concrete-slab-calculator", "gravel-calculator"],
  },
  {
    slug: "vinyl-fence-cost-guide",
    title: "Vinyl Fence Cost Guide",
    description:
      "Estimate vinyl fence cost by length, height, panels, posts, gates, terrain, and maintenance expectations.",
    category: "Backyard DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["fence-cost-calculator"],
  },
  {
    slug: "mulch-for-flower-beds",
    title: "Mulch for Flower Beds",
    description:
      "Estimate mulch for flower beds and choose a practical depth for weed control, moisture, and plant health.",
    category: "Garden DIY",
    publishedAt: "2026-07-15",
    readingTime: "5 min read",
    relatedTools: ["mulch-calculator", "raised-garden-bed-soil-calculator"],
  },
  {
    slug: "shed-foundation-options-guide",
    title: "Shed Foundation Options Guide",
    description:
      "Compare gravel pads, concrete slabs, blocks, skids, and piers before choosing a shed foundation.",
    category: "Backyard DIY",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator", "gravel-calculator", "concrete-slab-calculator"],
  },
  {
    slug: "shed-size-planning-guide",
    title: "Shed Size Planning Guide",
    description:
      "Choose a practical shed size by planning storage, access, yard space, foundation, doors, and future use.",
    category: "Backyard DIY",
    publishedAt: "2026-07-18",
    readingTime: "6 min read",
    relatedTools: ["shed-cost-calculator"],
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
