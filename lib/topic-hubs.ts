export type TopicHub = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  toolSlugs: string[];
  postCategories: string[];
  postSlugs?: string[];
  nextLinks: Array<{
    href: string;
    label: string;
    description: string;
  }>;
};

export const topicHubs: TopicHub[] = [
  {
    slug: "backyard-chickens",
    eyebrow: "Backyard chickens",
    title: "Plan a cleaner, safer backyard chicken setup.",
    description:
      "Estimate coop space, outdoor run space, and feed needs, then use practical guides to plan ventilation, bedding, cleaning, and predator protection.",
    metaTitle: "Backyard Chicken Planning Tools",
    metaDescription:
      "Use free backyard chicken calculators and guides to plan coop size, chicken run space, feed needs, ventilation, bedding, and predator protection.",
    toolSlugs: [
      "chicken-coop-size-calculator",
      "chicken-run-size-calculator",
      "chicken-feed-calculator",
    ],
    postCategories: ["Backyard Chickens"],
    nextLinks: [
      {
        href: "/tools/chicken-coop-size-calculator",
        label: "Start with coop size",
        description: "Estimate indoor coop space and outdoor run space.",
      },
      {
        href: "/blog/chicken-coop-ventilation-guide",
        label: "Check ventilation",
        description: "Plan airflow before choosing the final layout.",
      },
      {
        href: "/backyard-diy",
        label: "Browse backyard projects",
        description: "See the wider BuildMetric backyard planning library.",
      },
    ],
  },
  {
    slug: "garden-diy",
    eyebrow: "Garden DIY",
    title: "Estimate garden materials before you buy bags or bulk delivery.",
    description:
      "Plan raised bed soil, mulch depth, and garden material quantities with simple calculators and homeowner-friendly guides.",
    metaTitle: "Garden DIY Calculators and Guides",
    metaDescription:
      "Use free garden DIY calculators and guides to estimate raised bed soil, mulch volume, soil bags, garden bed depth, and material needs.",
    toolSlugs: ["raised-garden-bed-soil-calculator", "mulch-calculator"],
    postCategories: ["Garden DIY"],
    nextLinks: [
      {
        href: "/tools/raised-garden-bed-soil-calculator",
        label: "Calculate raised bed soil",
        description: "Estimate cubic feet, cubic yards, and soil bags.",
      },
      {
        href: "/tools/mulch-calculator",
        label: "Calculate mulch",
        description: "Estimate mulch volume from bed area and depth.",
      },
      {
        href: "/blog/mulch-vs-gravel",
        label: "Compare mulch and gravel",
        description: "Choose the right material for beds, paths, and drainage.",
      },
    ],
  },
  {
    slug: "shed-planning",
    eyebrow: "Shed planning",
    title: "Plan shed size, foundation materials, and early project budget.",
    description:
      "Use shed, gravel, and concrete calculators to compare common backyard shed planning choices before buying materials.",
    metaTitle: "Shed Planning Calculators and Guides",
    metaDescription:
      "Plan a DIY shed with free calculators and guides for shed cost, gravel bases, concrete slabs, permits, materials, and foundation choices.",
    toolSlugs: [
      "shed-cost-calculator",
      "gravel-calculator",
      "concrete-slab-calculator",
    ],
    postCategories: ["Backyard DIY"],
    postSlugs: [
      "how-much-does-it-cost-to-build-a-shed",
      "diy-shed-materials-list",
      "10x12-shed-cost-guide",
      "8x10-shed-cost-guide",
      "shed-foundation-cost-guide",
      "shed-roofing-cost-guide",
      "diy-shed-permit-basics",
      "gravel-base-for-shed-guide",
      "how-much-gravel-do-i-need",
      "how-much-concrete-do-i-need-for-a-slab",
      "concrete-slab-thickness-guide",
      "concrete-slab-cost-guide",
    ],
    nextLinks: [
      {
        href: "/tools/shed-cost-calculator",
        label: "Estimate shed cost",
        description: "Start with size, finish level, and foundation choice.",
      },
      {
        href: "/tools/gravel-calculator",
        label: "Plan a gravel base",
        description: "Estimate gravel volume and approximate tons.",
      },
      {
        href: "/tools/concrete-slab-calculator",
        label: "Compare slab volume",
        description: "Estimate concrete yards and bag count.",
      },
    ],
  },
  {
    slug: "home-improvement",
    eyebrow: "Home improvement",
    title: "Simple planning tools for common homeowner projects.",
    description:
      "Estimate paint, surface coverage, and related project quantities with calculators designed for quick early planning.",
    metaTitle: "Home Improvement Calculators and Guides",
    metaDescription:
      "Use simple home improvement calculators and guides to estimate paint gallons, paint coverage, and practical homeowner project quantities.",
    toolSlugs: ["paint-calculator", "concrete-slab-calculator"],
    postCategories: ["Home Improvement"],
    nextLinks: [
      {
        href: "/tools/paint-calculator",
        label: "Calculate paint gallons",
        description: "Estimate paint from wall area, coats, and coverage.",
      },
      {
        href: "/blog/paint-coverage-by-room",
        label: "Estimate by room",
        description: "Plan paint coverage for common room types.",
      },
      {
        href: "/tools",
        label: "Browse all calculators",
        description: "Move from home projects into outdoor planning tools.",
      },
    ],
  },
];

export const topicHubBySlug = Object.fromEntries(
  topicHubs.map((hub) => [hub.slug, hub]),
) as Record<string, TopicHub>;
