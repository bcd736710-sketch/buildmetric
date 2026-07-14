export type ProjectPath = {
  title: string;
  description: string;
  href: string;
  primaryTool: string;
  secondaryTools: string[];
  guideSlugs: string[];
  steps: string[];
};

export const projectPaths: ProjectPath[] = [
  {
    title: "Refresh a garden bed",
    description:
      "Estimate mulch, soil, and practical depth before buying bags or booking bulk delivery.",
    href: "/garden-diy",
    primaryTool: "mulch-calculator",
    secondaryTools: ["raised-garden-bed-soil-calculator"],
    guideSlugs: [
      "how-much-mulch-do-i-need",
      "mulch-depth-guide",
      "mulch-for-flower-beds",
    ],
    steps: [
      "Measure the bed area.",
      "Choose a practical depth.",
      "Compare bagged material with bulk delivery.",
    ],
  },
  {
    title: "Plan a shed base",
    description:
      "Compare gravel, concrete, and shed budget assumptions before choosing the footprint.",
    href: "/shed-planning",
    primaryTool: "gravel-calculator",
    secondaryTools: ["concrete-slab-calculator", "shed-cost-calculator"],
    guideSlugs: [
      "gravel-base-for-shed-guide",
      "concrete-for-shed-base",
      "shed-foundation-cost-guide",
    ],
    steps: [
      "Pick the shed size.",
      "Estimate base material.",
      "Check cost, drainage, and local rules.",
    ],
  },
  {
    title: "Budget a backyard fence",
    description:
      "Estimate linear feet, gates, and material choices before calling suppliers or contractors.",
    href: "/backyard-diy",
    primaryTool: "fence-cost-calculator",
    secondaryTools: ["gravel-calculator"],
    guideSlugs: [
      "how-much-does-a-fence-cost",
      "wood-vs-vinyl-vs-chain-link-fence-cost",
      "vinyl-fence-cost-guide",
    ],
    steps: [
      "Measure the fence run.",
      "Compare common materials.",
      "Add gates and site constraints.",
    ],
  },
  {
    title: "Estimate a room repaint",
    description:
      "Turn room dimensions, coats, and coverage into a clear paint-buying estimate.",
    href: "/home-improvement",
    primaryTool: "paint-calculator",
    secondaryTools: [],
    guideSlugs: [
      "how-much-paint-do-i-need",
      "paint-coverage-by-room",
      "paint-calculator-for-living-rooms",
    ],
    steps: [
      "Measure wall area.",
      "Subtract large openings if needed.",
      "Choose coats and coverage.",
    ],
  },
];
