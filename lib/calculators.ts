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
          "No. Breed, season, forage access, and feed type can change real feed use, so treat the result as a planning estimate.",
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
          "This calculator estimates the number of 1.5 cubic foot bags by dividing total cubic feet by 1.5 and rounding up.",
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
          "It multiplies shed length by width to get square footage, then multiplies that area by a cost per square foot.",
      },
      {
        question: "What does the finish level mean?",
        answer:
          "Finish level represents a simple cost range: basic, standard, or premium materials and finishes.",
      },
      {
        question: "Does this include labor or permits?",
        answer:
          "No. This MVP estimate is for simple planning and does not include local labor, permit, delivery, or site preparation costs.",
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
];

export const calculatorBySlug = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator]),
) as Record<string, CalculatorSummary>;
