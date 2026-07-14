export type CalculatorSummary = {
  slug: string;
  name: string;
  category: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const calculators: CalculatorSummary[] = [
  {
    slug: "chicken-coop-size-calculator",
    name: "Chicken Coop Size Calculator",
    category: "Backyard DIY",
    description:
      "Estimate recommended indoor coop space and outdoor run space for your backyard chicken flock.",
    seoTitle: "Chicken Coop Size Calculator",
    metaDescription:
      "Use the free Chicken Coop Size Calculator to estimate indoor coop space and outdoor run space based on flock size and chicken size.",
    faqs: [
      {
        question: "How much indoor coop space does a chicken need?",
        answer:
          "A simple planning rule is 3 square feet per small chicken, 4 square feet per medium chicken, and 5 square feet per large chicken.",
      },
      {
        question: "How much outdoor run space should I plan?",
        answer:
          "This calculator uses 10 square feet of outdoor run space per chicken as a practical planning estimate.",
      },
      {
        question: "Does coop style change the result?",
        answer:
          "Yes. Standard coops use the base indoor space estimate. Walk-in coops add a 25% indoor space allowance for access, cleaning, and layout flexibility.",
      },
      {
        question: "Should I build a larger coop than the calculator suggests?",
        answer:
          "Often, yes. The result is a practical starting point. Extra space can help with cleaning, feeders, roosts, nesting boxes, and future flock growth.",
      },
      {
        question: "Does the calculator include nesting boxes and roost space?",
        answer:
          "The calculator estimates general indoor floor space. You should still plan room for roost bars, nesting boxes, ventilation, doors, and cleaning access.",
      },
    ],
  },
  {
    slug: "chicken-run-size-calculator",
    name: "Chicken Run Size Calculator",
    category: "Backyard DIY",
    description:
      "Estimate minimum and comfortable outdoor run space for your backyard chicken flock.",
    seoTitle: "Chicken Run Size Calculator",
    metaDescription:
      "Use the free Chicken Run Size Calculator to estimate outdoor chicken run space based on flock size.",
    faqs: [
      {
        question: "How much outdoor run space does a chicken need?",
        answer:
          "A practical minimum planning rule is 10 square feet of outdoor run space per chicken.",
      },
      {
        question: "Is more run space better for chickens?",
        answer:
          "Yes. More outdoor space can reduce crowding and make the run easier to manage, especially for active flocks.",
      },
      {
        question: "Does ground surface change the calculation?",
        answer:
          "Yes. Grass, dirt, and mixed ground use slightly different square-foot targets because surface wear, drainage, and maintenance needs are different.",
      },
      {
        question: "Can a chicken run be too small even if the coop is large?",
        answer:
          "Yes. Chickens spend much of the day outside when conditions allow, so a cramped run can still cause crowding even when the indoor coop is adequate.",
      },
      {
        question: "Should I add extra run space for wet or muddy yards?",
        answer:
          "Extra space can help reduce wear on the ground, but drainage, surface material, and run cover also matter in wet climates.",
      },
    ],
  },
  {
    slug: "chicken-feed-calculator",
    name: "Chicken Feed Calculator",
    category: "Backyard DIY",
    description:
      "Estimate daily, weekly, and monthly chicken feed needs for your flock.",
    seoTitle: "Chicken Feed Calculator",
    metaDescription:
      "Use the free Chicken Feed Calculator to estimate how much feed your chickens need per day, week, and month.",
    faqs: [
      {
        question: "How much feed does an adult chicken eat per day?",
        answer:
          "A common planning estimate for an adult laying hen is about 0.25 pounds of feed per day.",
      },
      {
        question: "Should chicks and adult chickens use the same estimate?",
        answer:
          "No. Chicks usually eat less than adult chickens, so this calculator includes separate estimates for chicks, growing chickens, and adult laying hens.",
      },
      {
        question: "Is this exact for every flock?",
        answer:
          "No. Breed, season, forage access, feeder style, waste, and feed type can change real feed use, so treat the result as a planning estimate.",
      },
      {
        question: "Should I buy feed weekly or monthly?",
        answer:
          "Many small flocks can be planned weekly or monthly. Store feed in a dry, sealed container and avoid buying more than you can keep fresh.",
      },
      {
        question: "Does free ranging reduce feed needs?",
        answer:
          "It can reduce some feed use, but most backyard chickens still need a balanced feed available so nutrition stays consistent.",
      },
    ],
  },
  {
    slug: "raised-garden-bed-soil-calculator",
    name: "Raised Garden Bed Soil Calculator",
    category: "Garden DIY",
    description:
      "Calculate how much soil you need to fill a raised garden bed.",
    seoTitle: "Raised Garden Bed Soil Calculator",
    metaDescription:
      "Use the free Raised Garden Bed Soil Calculator to estimate soil volume in cubic feet, cubic yards, and bag count.",
    faqs: [
      {
        question: "How do I calculate soil for a raised garden bed?",
        answer:
          "Multiply length by width by soil depth. Convert depth from inches to feet before multiplying.",
      },
      {
        question: "How many bags of soil do I need?",
        answer:
          "This calculator estimates bag count by dividing total cubic feet by your selected bag size and rounding up.",
      },
      {
        question: "Should I buy extra soil?",
        answer:
          "It is usually smart to buy a little extra because soil settles after watering and planting.",
      },
      {
        question: "Why does soil depth matter so much?",
        answer:
          "Soil depth directly changes volume. A 4x8 bed filled 12 inches deep needs twice as much soil as the same bed filled 6 inches deep.",
      },
      {
        question: "Can I fill the entire bed with bagged soil?",
        answer:
          "Yes, but bagged soil can become expensive for larger beds. For big projects, compare bagged soil with bulk delivery or a blended raised bed mix.",
      },
    ],
  },
  {
    slug: "shed-cost-calculator",
    name: "Shed Cost Calculator",
    category: "Backyard DIY",
    description:
      "Estimate a simple DIY shed budget from shed size and finish level.",
    seoTitle: "Shed Cost Calculator",
    metaDescription:
      "Use the free Shed Cost Calculator to estimate DIY shed cost based on square footage and finish level.",
    faqs: [
      {
        question: "How does this shed cost calculator work?",
        answer:
          "It multiplies shed length by width to get square footage, applies the selected finish cost per square foot, then adds the selected foundation allowance.",
      },
      {
        question: "What does the finish level mean?",
        answer:
          "Finish level represents a simple cost range: basic, standard, or premium materials and finishes.",
      },
      {
        question: "Does this include labor or permits?",
        answer:
          "No. This estimate is for simple planning and does not include local labor, permit fees, delivery, utility work, or unusual site preparation.",
      },
      {
        question: "What is the biggest cost driver for a DIY shed?",
        answer:
          "Size is usually the biggest driver because it affects floor framing, wall framing, siding, roofing, foundation materials, and finishing.",
      },
      {
        question: "Should I include a budget buffer?",
        answer:
          "Yes. A small buffer helps cover fasteners, trim, delivery fees, damaged materials, tool rentals, and small design changes during the build.",
      },
    ],
  },
  {
    slug: "mulch-calculator",
    name: "Mulch Calculator",
    category: "Garden DIY",
    description:
      "Estimate mulch volume in cubic feet, cubic yards, and bag count for garden beds and landscape areas.",
    seoTitle: "Mulch Calculator",
    metaDescription:
      "Use the free Mulch Calculator to estimate cubic feet, cubic yards, and bags of mulch for garden beds and landscaping projects.",
    faqs: [
      {
        question: "How do I calculate how much mulch I need?",
        answer:
          "Multiply length by width by mulch depth. Convert depth from inches to feet before calculating cubic feet.",
      },
      {
        question: "How deep should mulch be?",
        answer:
          "Many garden beds use about 2 to 3 inches of mulch. Around trees, avoid piling mulch against the trunk.",
      },
      {
        question: "How many cubic feet are in a cubic yard of mulch?",
        answer:
          "One cubic yard equals 27 cubic feet.",
      },
      {
        question: "Should I buy extra mulch?",
        answer:
          "A small extra amount can help cover uneven areas, settling, and measuring differences.",
      },
    ],
  },
  {
    slug: "gravel-calculator",
    name: "Gravel Calculator",
    category: "Backyard DIY",
    description:
      "Estimate gravel volume and approximate tons for paths, pads, shed bases, and landscaping projects.",
    seoTitle: "Gravel Calculator",
    metaDescription:
      "Use the free Gravel Calculator to estimate cubic yards and tons of gravel from length, width, depth, and gravel type.",
    faqs: [
      {
        question: "How do I calculate gravel volume?",
        answer:
          "Multiply length by width by depth. Convert depth from inches to feet, then divide cubic feet by 27 to get cubic yards.",
      },
      {
        question: "How many tons are in a cubic yard of gravel?",
        answer:
          "A common planning range is about 1.4 to 1.6 tons per cubic yard, depending on gravel type and compaction.",
      },
      {
        question: "Should I order extra gravel?",
        answer:
          "Yes, a small buffer can help account for compaction, uneven ground, and spreading loss.",
      },
      {
        question: "Can I use this for a shed base?",
        answer:
          "Yes, it is useful for a simple shed base estimate, but confirm depth and compaction requirements for your site.",
      },
    ],
  },
  {
    slug: "fence-cost-calculator",
    name: "Fence Cost Calculator",
    category: "Backyard DIY",
    description:
      "Estimate a simple backyard fence budget from linear feet, material type, and gate count.",
    seoTitle: "Fence Cost Calculator",
    metaDescription:
      "Use the free Fence Cost Calculator to estimate wood, vinyl, or chain link fence cost from length and gate count.",
    faqs: [
      {
        question: "How is fence cost estimated?",
        answer:
          "The calculator multiplies fence length by a material cost per linear foot, then adds a simple gate allowance.",
      },
      {
        question: "Does this include labor?",
        answer:
          "No. This is a simple planning estimate and does not include local labor, permits, demolition, or unusual site work.",
      },
      {
        question: "What affects fence cost most?",
        answer:
          "Material type, total length, height, gates, terrain, posts, and local labor rates can all affect the final cost.",
      },
      {
        question: "Should I measure property lines first?",
        answer:
          "Yes. Confirm property lines, setbacks, HOA rules, and utility locations before building a fence.",
      },
    ],
  },
  {
    slug: "concrete-slab-calculator",
    name: "Concrete Slab Calculator",
    category: "Backyard DIY",
    description:
      "Estimate concrete volume in cubic yards and bags for patios, shed bases, and small slabs.",
    seoTitle: "Concrete Slab Calculator",
    metaDescription:
      "Use the free Concrete Slab Calculator to estimate cubic yards and 80 lb bags from slab length, width, and thickness.",
    faqs: [
      {
        question: "How do I calculate concrete for a slab?",
        answer:
          "Multiply slab length by width by thickness. Convert thickness from inches to feet, then divide cubic feet by 27 for cubic yards.",
      },
      {
        question: "Should I add waste to a concrete order?",
        answer:
          "Yes. Many small projects add about 5% to 10% so the pour does not come up short.",
      },
      {
        question: "How much does an 80 lb bag of concrete make?",
        answer:
          "A common planning estimate is about 0.6 cubic feet per 80 lb bag.",
      },
      {
        question: "Can this replace a contractor estimate?",
        answer:
          "No. It is for early planning only. Slabs may need base prep, reinforcement, forms, permits, and local code checks.",
      },
    ],
  },
  {
    slug: "paint-calculator",
    name: "Paint Calculator",
    category: "Home Improvement",
    description:
      "Estimate paint gallons from wall area, number of coats, and coverage per gallon.",
    seoTitle: "Paint Calculator",
    metaDescription:
      "Use the free Paint Calculator to estimate how many gallons of paint you need for walls, rooms, and DIY painting projects.",
    faqs: [
      {
        question: "How do I calculate paint needed?",
        answer:
          "Multiply paintable wall area by the number of coats, then divide by coverage per gallon.",
      },
      {
        question: "How much area does one gallon of paint cover?",
        answer:
          "Many paints cover about 300 to 400 square feet per gallon, but always check the product label.",
      },
      {
        question: "Should I include windows and doors?",
        answer:
          "For a rough estimate, you can use total wall area. For a tighter estimate, subtract large windows and doors.",
      },
      {
        question: "Do I need primer?",
        answer:
          "Primer may be needed for bare drywall, stains, strong color changes, or uneven surfaces. It can change material needs.",
      },
    ],
  },
];

export const calculatorBySlug = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator]),
) as Record<string, CalculatorSummary>;
