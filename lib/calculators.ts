export type CalculatorSummary = {
  slug: string;
  name: string;
  category: string;
  description: string;
  formulaSummary: string[];
  assumptions: string[];
  bestFor: string;
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
    formulaSummary: [
      "Indoor coop space = number of chickens × space per chicken",
      "Small chickens use 3 sq ft each, medium chickens use 4 sq ft each, and large chickens use 5 sq ft each",
      "Walk-in coops add a 25% indoor space allowance",
      "Run space = number of chickens × 10 sq ft",
    ],
    assumptions: [
      "The result is a planning estimate, not a building code requirement.",
      "Extra room may be needed for roosts, nesting boxes, feeders, cleaning access, and future flock growth.",
      "Local rules, climate, ventilation, and predator protection can change the final design.",
    ],
    bestFor:
      "Homeowners planning a backyard chicken coop footprint before choosing a layout or buying materials.",
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
    formulaSummary: [
      "Minimum run space = number of chickens × minimum sq ft per chicken",
      "Comfortable run space = number of chickens × roomier sq ft per chicken",
      "Surface type adjusts the target because dirt, mixed ground, and grass wear differently",
    ],
    assumptions: [
      "The calculator estimates outdoor run area, not the full coop design.",
      "Drainage, shade, roof cover, and predator protection can matter as much as square footage.",
      "Wet or heavily used runs may need a larger footprint or better ground material.",
    ],
    bestFor:
      "Choosing a practical chicken run footprint for a backyard flock before building fencing or posts.",
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
    formulaSummary: [
      "Daily feed = number of chickens × feed per chicken per day",
      "Weekly feed = daily feed × 7",
      "Monthly feed = daily feed × 30",
      "Bag count = monthly feed divided by selected bag size, rounded up",
    ],
    assumptions: [
      "Feed use varies by breed, age, season, forage access, feeder waste, and feed type.",
      "The estimate assumes balanced feed remains available as the main food source.",
      "Store feed dry and avoid buying more than you can keep fresh.",
    ],
    bestFor:
      "Estimating how much chicken feed to buy for small backyard flocks over a week or month.",
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
    formulaSummary: [
      "Soil volume = bed length × bed width × soil depth",
      "Depth is converted from inches to feet before calculating cubic feet",
      "Cubic yards = cubic feet ÷ 27",
      "Bag count = cubic feet ÷ bag size, rounded up",
    ],
    assumptions: [
      "Soil can settle after watering, planting, and the first few weeks of use.",
      "Large beds may be cheaper with bulk delivery than bagged soil.",
      "The calculator estimates fill volume and does not design a soil mix.",
    ],
    bestFor:
      "Planning raised bed soil purchases before buying bags, bulk soil, or compost blends.",
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
    formulaSummary: [
      "Shed area = length × width",
      "Base project cost = shed area × selected cost per square foot",
      "Estimated total = base project cost + selected foundation allowance",
    ],
    assumptions: [
      "The estimate is for early DIY budgeting, not a contractor quote.",
      "Labor, permits, delivery, demolition, utilities, and unusual site work are not included.",
      "Prices vary by region, lumber market, finish level, and foundation choice.",
    ],
    bestFor:
      "Comparing rough DIY shed budgets before choosing a shed size, finish level, or foundation.",
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
    formulaSummary: [
      "Mulch volume = area length × area width × mulch depth",
      "Depth is converted from inches to feet before calculating cubic feet",
      "Cubic yards = cubic feet ÷ 27",
      "Bag count = cubic feet ÷ bag size, rounded up",
    ],
    assumptions: [
      "Mulch depth is a planning choice; many beds use about 2 to 3 inches.",
      "Uneven beds, settling, and spreading loss can change real material use.",
      "Avoid piling mulch directly against stems, trunks, siding, or wood structures.",
    ],
    bestFor:
      "Estimating bagged or bulk mulch for garden beds, tree rings, and landscape refresh projects.",
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
    formulaSummary: [
      "Gravel volume = length × width × depth",
      "Depth is converted from inches to feet before calculating cubic feet",
      "Cubic yards = cubic feet ÷ 27",
      "Approximate tons = cubic yards × selected gravel density",
    ],
    assumptions: [
      "Gravel density varies by stone type, moisture, and supplier.",
      "Compaction and uneven ground can increase the amount needed.",
      "The result is a planning estimate and should be checked against supplier guidance.",
    ],
    bestFor:
      "Planning gravel for paths, shed bases, pads, drainage areas, and simple landscaping projects.",
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
    formulaSummary: [
      "Fence material cost = total linear feet × selected material cost per foot",
      "Gate cost = number of gates × gate allowance",
      "Estimated total = fence material cost + gate cost",
    ],
    assumptions: [
      "The estimate excludes labor, permits, demolition, survey work, and difficult terrain.",
      "Height, posts, corners, slopes, gates, and local labor can materially change final cost.",
      "Confirm property lines, utility locations, HOA rules, and local requirements before building.",
    ],
    bestFor:
      "Comparing early backyard fence budgets across wood, vinyl, and chain link options.",
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
    formulaSummary: [
      "Slab volume = length × width × thickness",
      "Thickness is converted from inches to feet before calculating cubic feet",
      "Cubic yards = cubic feet ÷ 27",
      "Final estimate can include a selected waste allowance",
    ],
    assumptions: [
      "The calculator estimates concrete volume only, not structural design.",
      "Base preparation, forms, reinforcement, drainage, and local code may affect the project.",
      "Small pours often need a 5% to 10% buffer to avoid running short.",
    ],
    bestFor:
      "Estimating concrete for patios, shed slabs, utility pads, and small homeowner concrete projects.",
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
    formulaSummary: [
      "Paint needed = paintable area × number of coats ÷ coverage per gallon",
      "Gallons to buy are rounded up to the next whole gallon",
      "Large openings can be subtracted for a tighter estimate",
    ],
    assumptions: [
      "Coverage varies by paint product, wall texture, primer, color change, and application method.",
      "Primer should be estimated separately when needed.",
      "The calculator is for planning gallons, not choosing a paint system.",
    ],
    bestFor:
      "Estimating paint gallons for rooms, walls, touch-ups, and simple homeowner painting projects.",
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
