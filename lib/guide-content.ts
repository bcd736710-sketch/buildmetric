export type GuideSection = {
  heading: string;
  body: string;
};

export type GuideContent = {
  quickAnswer: string;
  primaryTool: {
    href: string;
    label: string;
  };
  secondaryTool?: {
    href: string;
    label: string;
  };
  sections: GuideSection[];
};

export const guideContentBySlug: Record<string, GuideContent> = {
  "how-much-mulch-do-i-need": {
    quickAnswer:
      "To estimate mulch, multiply the bed length by width by mulch depth. Convert depth from inches to feet, then convert cubic feet to cubic yards or bags.",
    primaryTool: {
      href: "/tools/mulch-calculator",
      label: "Use mulch calculator",
    },
    secondaryTool: {
      href: "/tools/raised-garden-bed-soil-calculator",
      label: "Estimate garden soil",
    },
    sections: [
      {
        heading: "Start with the bed area",
        body: "Measure the length and width of the planting bed or landscape area in feet. For rectangles, multiply length by width. For irregular beds, break the space into smaller rectangles and add the areas together.",
      },
      {
        heading: "Choose a practical mulch depth",
        body: "Many garden beds use about 2 to 3 inches of mulch. A thinner layer may not suppress weeds well, while a very deep layer can hold too much moisture around plants.",
      },
      {
        heading: "Convert volume into bags or cubic yards",
        body: "Bagged mulch is often sold in 2 or 3 cubic foot bags. Bulk mulch is usually sold by the cubic yard. One cubic yard equals 27 cubic feet.",
      },
      {
        heading: "Avoid common mulch mistakes",
        body: "Do not pile mulch directly against tree trunks or plant stems. Leave a small gap for airflow and use the estimate as a starting point before adjusting for uneven beds.",
      },
    ],
  },
  "mulch-depth-guide": {
    quickAnswer:
      "A 2 to 3 inch mulch layer is a practical target for many beds. Use less around delicate plants and avoid piling mulch against trunks or stems.",
    primaryTool: {
      href: "/tools/mulch-calculator",
      label: "Calculate mulch",
    },
    sections: [
      {
        heading: "Why mulch depth matters",
        body: "Mulch depth affects weed suppression, moisture retention, soil temperature, and how much material you need to buy. A small depth change can significantly change the final volume.",
      },
      {
        heading: "Common depth targets",
        body: "Use about 2 inches for light refreshes, 3 inches for many garden beds, and deeper layers only when the site and plants can handle it. Around trees, spread mulch wide rather than deep.",
      },
      {
        heading: "When to use less mulch",
        body: "Use a thinner layer near small seedlings, crowns, and stems that may be sensitive to trapped moisture. Keep mulch pulled back from structures where moisture or pests could be a concern.",
      },
      {
        heading: "Plan for settling",
        body: "Fresh mulch may settle after rain and watering. If you want a clean finished look, buy a small buffer or plan a light top-up after the first settling period.",
      },
    ],
  },
  "how-much-gravel-do-i-need": {
    quickAnswer:
      "Calculate gravel by multiplying length by width by depth. Convert depth from inches to feet, then divide cubic feet by 27 for cubic yards.",
    primaryTool: {
      href: "/tools/gravel-calculator",
      label: "Use gravel calculator",
    },
    secondaryTool: {
      href: "/tools/concrete-slab-calculator",
      label: "Estimate concrete",
    },
    sections: [
      {
        heading: "Measure the project footprint",
        body: "Start with the length and width of the path, pad, driveway area, or base. For odd shapes, estimate smaller rectangles and add them together.",
      },
      {
        heading: "Pick the gravel depth",
        body: "Depth depends on use. A decorative path may need less depth than a shed base or compacted pad. Always check the needs of the project before ordering.",
      },
      {
        heading: "Convert cubic yards to tons",
        body: "Suppliers often sell gravel by the ton. Weight varies by stone type and moisture, but a common planning estimate is about 1.4 to 1.6 tons per cubic yard.",
      },
      {
        heading: "Add a small buffer",
        body: "Uneven ground, compaction, and spreading loss can all increase real material use. A small extra amount is often easier than placing a second order.",
      },
    ],
  },
  "gravel-depth-guide": {
    quickAnswer:
      "Gravel depth depends on the project. Decorative paths may use a shallower layer, while shed bases and compacted pads usually need more depth and better preparation.",
    primaryTool: {
      href: "/tools/gravel-calculator",
      label: "Calculate gravel",
    },
    sections: [
      {
        heading: "Depth changes volume quickly",
        body: "A 2 inch layer and a 4 inch layer over the same area require very different amounts of gravel. Always choose depth before estimating cubic yards.",
      },
      {
        heading: "Paths and decorative areas",
        body: "Light-use garden paths may use a shallower gravel layer, especially over landscape fabric or a prepared base. Edging helps keep material in place.",
      },
      {
        heading: "Shed bases and pads",
        body: "A shed base often needs a deeper, compacted gravel layer for drainage and support. The right depth depends on soil, shed size, and local conditions.",
      },
      {
        heading: "Compaction matters",
        body: "Compacted gravel may settle lower than loose gravel. If the finished height matters, plan for compaction and check supplier recommendations.",
      },
    ],
  },
  "how-much-does-a-fence-cost": {
    quickAnswer:
      "Fence cost depends mainly on linear feet, material, gates, height, terrain, and local labor. Estimate length first, then compare material cost ranges.",
    primaryTool: {
      href: "/tools/fence-cost-calculator",
      label: "Use fence cost calculator",
    },
    sections: [
      {
        heading: "Linear feet drive the budget",
        body: "Fence estimates usually start with total linear feet. Measure each side of the fence line and add them together before choosing material.",
      },
      {
        heading: "Material changes the range",
        body: "Wood, vinyl, and chain link can have very different cost profiles. Wood may be flexible and familiar, vinyl can cost more upfront, and chain link is often simpler.",
      },
      {
        heading: "Gates and corners add cost",
        body: "Gates, corners, slopes, and transitions can add hardware and labor. A long straight fence is usually easier to estimate than a complex layout.",
      },
      {
        heading: "Check rules before building",
        body: "Before buying materials, confirm property lines, HOA rules, local height limits, utility locations, and any permit requirements.",
      },
    ],
  },
  "wood-vs-vinyl-vs-chain-link-fence-cost": {
    quickAnswer:
      "Wood is flexible, vinyl is often higher upfront, and chain link is usually simpler. The best choice depends on budget, privacy, maintenance, and appearance.",
    primaryTool: {
      href: "/tools/fence-cost-calculator",
      label: "Compare fence costs",
    },
    sections: [
      {
        heading: "Wood fence cost considerations",
        body: "Wood fences can be a practical choice for privacy and traditional backyard layouts. Costs vary by lumber type, height, posts, staining, and maintenance expectations.",
      },
      {
        heading: "Vinyl fence cost considerations",
        body: "Vinyl often costs more upfront but may reduce painting or staining work. It can be a good fit when clean appearance and lower maintenance are priorities.",
      },
      {
        heading: "Chain link cost considerations",
        body: "Chain link is often used when containment is more important than privacy. It may be a lower-cost option, but privacy slats and coatings can add cost.",
      },
      {
        heading: "Choose based on the job",
        body: "Compare material cost with the real goal: privacy, pet containment, curb appeal, durability, and maintenance. The cheapest material is not always the best long-term fit.",
      },
    ],
  },
  "how-much-concrete-do-i-need-for-a-slab": {
    quickAnswer:
      "Concrete slab volume equals length times width times thickness. Convert thickness from inches to feet, then divide cubic feet by 27 for cubic yards.",
    primaryTool: {
      href: "/tools/concrete-slab-calculator",
      label: "Use concrete calculator",
    },
    secondaryTool: {
      href: "/tools/shed-cost-calculator",
      label: "Estimate shed cost",
    },
    sections: [
      {
        heading: "Measure slab dimensions",
        body: "Start with slab length and width in feet. Then choose thickness in inches based on the project type, load, base preparation, and local requirements.",
      },
      {
        heading: "Convert thickness correctly",
        body: "A common mistake is multiplying by inches directly. Convert inches to feet first. A 4 inch slab is 0.333 feet thick.",
      },
      {
        heading: "Add waste before ordering",
        body: "Small concrete projects often include a 5% to 10% buffer. This helps account for uneven base, forms, spillage, and small measurement differences.",
      },
      {
        heading: "Plan beyond volume",
        body: "Concrete volume is only one part of the project. Forms, compacted base, reinforcement, finishing, curing, drainage, and permits may also matter.",
      },
    ],
  },
  "concrete-slab-thickness-guide": {
    quickAnswer:
      "Slab thickness depends on use, load, soil, base prep, and local code. Many small DIY slabs are planned around common thicknesses, but requirements vary.",
    primaryTool: {
      href: "/tools/concrete-slab-calculator",
      label: "Calculate slab volume",
    },
    sections: [
      {
        heading: "Thickness affects volume and cost",
        body: "A thicker slab uses more concrete over the same footprint. Before estimating cost, decide whether the project needs a light pad or a stronger structural slab.",
      },
      {
        heading: "Small patios and pads",
        body: "Small patios, walkways, and utility pads may use common residential thicknesses, but the right choice depends on base preparation and expected loads.",
      },
      {
        heading: "Shed and workshop bases",
        body: "A shed or workshop slab may need more attention to drainage, reinforcement, edge thickening, and local requirements than a simple decorative pad.",
      },
      {
        heading: "When to ask a professional",
        body: "If the slab supports vehicles, heavy equipment, a structure, or poor soil conditions, get local guidance before relying on a simple planning estimate.",
      },
    ],
  },
  "how-much-paint-do-i-need": {
    quickAnswer:
      "Paint needed equals paintable area times number of coats, divided by coverage per gallon. Round up to whole gallons before buying.",
    primaryTool: {
      href: "/tools/paint-calculator",
      label: "Use paint calculator",
    },
    sections: [
      {
        heading: "Start with paintable area",
        body: "Measure the wall area you plan to paint. For a room, add the area of each wall. You can subtract large windows and doors for a tighter estimate.",
      },
      {
        heading: "Account for coats",
        body: "Two coats are common for many repainting projects, especially when changing colors. One coat may be enough for touch-ups or similar colors in good condition.",
      },
      {
        heading: "Check coverage per gallon",
        body: "Paint coverage varies by product, surface texture, color, and application. Many paints list a coverage range on the label, such as 300 to 400 square feet per gallon.",
      },
      {
        heading: "Round up carefully",
        body: "Paint is usually bought in whole containers. Rounding up helps avoid color mismatch or stopping mid-project, but avoid buying far more than you can use.",
      },
    ],
  },
  "paint-coverage-guide": {
    quickAnswer:
      "Paint coverage is usually listed as square feet per gallon, but real coverage depends on surface texture, primer, color change, and application method.",
    primaryTool: {
      href: "/tools/paint-calculator",
      label: "Calculate paint gallons",
    },
    sections: [
      {
        heading: "Coverage is a planning number",
        body: "A coverage number helps estimate gallons, but it is not exact. Porous surfaces, textured walls, and rough repairs can use more paint than expected.",
      },
      {
        heading: "Primer can change the estimate",
        body: "Primer may be needed for bare drywall, stains, patched areas, or strong color changes. Primer and paint should be estimated separately when both are needed.",
      },
      {
        heading: "Color changes matter",
        body: "Going from dark to light or light to dark can require additional coats. Better coverage paint can reduce work, but product quality and preparation still matter.",
      },
      {
        heading: "Keep a small touch-up amount",
        body: "For many rooms, keeping a small amount of matching paint helps with later touch-ups. Label the can with the room and date before storing it.",
      },
    ],
  },
  "mulch-vs-gravel": {
    quickAnswer:
      "Mulch is usually better for planting beds and soil health, while gravel is better for paths, drainage zones, and longer-lasting hardscape areas.",
    primaryTool: {
      href: "/tools/mulch-calculator",
      label: "Calculate mulch",
    },
    secondaryTool: {
      href: "/tools/gravel-calculator",
      label: "Calculate gravel",
    },
    sections: [
      {
        heading: "Choose mulch for planting beds",
        body: "Mulch helps hold soil moisture, reduce weeds, moderate soil temperature, and improve the look of planted beds. Organic mulch can break down over time, so it may need refreshing.",
      },
      {
        heading: "Choose gravel for paths and drainage",
        body: "Gravel is useful for walkways, shed approaches, drainage strips, and areas where you want a firmer surface. It does not feed soil like organic mulch, but it can last longer with good edging.",
      },
      {
        heading: "Compare maintenance before buying",
        body: "Mulch may fade, decompose, or move during heavy rain. Gravel can collect leaves, migrate into lawns, or need occasional raking. The easier choice depends on how the space will be used.",
      },
      {
        heading: "Estimate each material separately",
        body: "Mulch is often planned by depth and bag size, while gravel may also need a weight estimate in tons. Use the right calculator for the material instead of treating them as interchangeable.",
      },
    ],
  },
  "gravel-base-for-shed-guide": {
    quickAnswer:
      "A gravel shed base needs a clear footprint, practical depth, compacted layers, edging, and drainage planning before you estimate cubic yards or tons.",
    primaryTool: {
      href: "/tools/gravel-calculator",
      label: "Calculate gravel base",
    },
    secondaryTool: {
      href: "/tools/shed-cost-calculator",
      label: "Estimate shed cost",
    },
    sections: [
      {
        heading: "Start with the shed footprint",
        body: "Measure the shed length and width, then decide whether the gravel base should extend beyond the walls. A small border can improve drainage and make installation easier.",
      },
      {
        heading: "Pick a depth before estimating",
        body: "Depth has a large effect on gravel volume. A shed base often needs more than a light decorative path, especially when the gravel will be compacted for support.",
      },
      {
        heading: "Plan for compaction and edging",
        body: "Loose gravel settles as it is compacted. Edging, timbers, or a framed perimeter help keep the base in place and make the finished pad easier to level.",
      },
      {
        heading: "Think about drainage first",
        body: "A good base should move water away from the shed, not trap it underneath. Site slope, soil type, fabric, and outlet paths all affect the final design.",
      },
    ],
  },
  "fence-gate-cost-guide": {
    quickAnswer:
      "Fence gates add cost through hardware, stronger posts, framing, hinges, latches, and labor. Count gates early so the fence budget is not based on linear feet alone.",
    primaryTool: {
      href: "/tools/fence-cost-calculator",
      label: "Estimate fence cost",
    },
    sections: [
      {
        heading: "Gate count changes the estimate",
        body: "A simple fence with no gates is easier to price than a layout with several access points. Each gate can add hardware, framing, post work, and installation time.",
      },
      {
        heading: "Gate width matters",
        body: "A narrow walk gate is different from a wider equipment gate. Wider gates may need stronger posts, better bracing, heavier hinges, and more careful alignment.",
      },
      {
        heading: "Material affects gate cost",
        body: "Wood, vinyl, and chain link gates use different hardware and construction methods. Matching the gate to the fence material usually looks cleaner but can change the budget.",
      },
      {
        heading: "Plan access before final layout",
        body: "Place gates where people, tools, trash bins, pets, and maintenance equipment actually need to move. A cheaper layout can become frustrating if access is poor.",
      },
    ],
  },
  "concrete-slab-cost-guide": {
    quickAnswer:
      "Concrete slab cost starts with volume, but the real budget also depends on thickness, waste, base preparation, forms, reinforcement, finishing, and delivery.",
    primaryTool: {
      href: "/tools/concrete-slab-calculator",
      label: "Calculate concrete volume",
    },
    sections: [
      {
        heading: "Volume is the first cost driver",
        body: "Length, width, and thickness determine concrete volume. Once you know cubic yards, you can compare ready-mix quotes, bagged concrete, or local supply pricing.",
      },
      {
        heading: "Thickness changes more than material",
        body: "A thicker slab uses more concrete and may also affect excavation, base depth, reinforcement, and finishing time. Choose thickness based on the project, not only price.",
      },
      {
        heading: "Include base prep and forms",
        body: "Gravel base, compaction, form boards, stakes, screws, vapor barrier, reinforcement, and tools can all add cost before concrete is placed.",
      },
      {
        heading: "Add waste and delivery realities",
        body: "Small measurement differences, uneven subgrade, spillage, and ordering minimums can change the final cost. A planning estimate should include a realistic buffer.",
      },
    ],
  },
  "paint-coverage-by-room": {
    quickAnswer:
      "Paint coverage by room depends on wall area, number of coats, product coverage, openings, surface texture, and whether primer or strong color changes are involved.",
    primaryTool: {
      href: "/tools/paint-calculator",
      label: "Calculate paint by room",
    },
    sections: [
      {
        heading: "Bedrooms and living rooms",
        body: "Bedrooms and living rooms often have larger continuous wall areas. Measure each wall, subtract large openings if needed, and plan for two coats when changing color.",
      },
      {
        heading: "Bathrooms and kitchens",
        body: "Bathrooms and kitchens may have less paintable wall area because of cabinets, tile, mirrors, and fixtures. They may also need paints suited for moisture and cleaning.",
      },
      {
        heading: "Hallways and small spaces",
        body: "Small spaces can still use more paint than expected if they have many corners, doors, trim interruptions, or textured surfaces. Measure instead of guessing by room name alone.",
      },
      {
        heading: "Use coverage as a range",
        body: "A label coverage number is a good starting point, but real use changes with surface condition, roller nap, primer, repairs, and color shift. Round up before buying.",
      },
    ],
  },
};
