export type MaterialChecklistItem = {
  name: string;
  note: string;
};

export type MaterialChecklist = {
  title: string;
  description: string;
  items: MaterialChecklistItem[];
  buyerNotes: string[];
};

export const materialChecklists: Record<string, MaterialChecklist> = {
  "paint-calculator": {
    title: "Paint project shopping checklist",
    description:
      "Use the gallon estimate as the starting point, then confirm prep supplies, tools, and finish details before buying.",
    items: [
      {
        name: "Interior or exterior paint",
        note: "Match the product to the room, surface, sheen, and cleaning needs.",
      },
      {
        name: "Primer",
        note: "Useful for bare drywall, stains, patches, and strong color changes.",
      },
      {
        name: "Rollers and brushes",
        note: "Choose roller nap by wall texture and keep an angled brush for edges.",
      },
      {
        name: "Tape, trays, and drop cloths",
        note: "Prep supplies usually decide whether the job feels clean or chaotic.",
      },
      {
        name: "Patching and sanding supplies",
        note: "Fill holes, sand rough areas, and clean surfaces before painting.",
      },
    ],
    buyerNotes: [
      "Check the coverage range on the exact paint label.",
      "Estimate primer separately from finish paint.",
      "Keep color name, sheen, and room label for touch-ups.",
    ],
  },
  "gravel-calculator": {
    title: "Gravel project shopping checklist",
    description:
      "After estimating cubic yards and tons, confirm material type, delivery access, edging, and base prep.",
    items: [
      {
        name: "Project gravel",
        note: "Choose crushed stone, pea gravel, or decorative gravel based on use.",
      },
      {
        name: "Landscape fabric",
        note: "May help separate gravel from soil for paths, pads, and bases.",
      },
      {
        name: "Edging or frame material",
        note: "Keeps gravel contained and improves the finished shape.",
      },
      {
        name: "Compaction tools",
        note: "A tamper or plate compactor may be needed for pads and bases.",
      },
      {
        name: "Delivery and spreading plan",
        note: "Plan the dump location, access, wheelbarrow route, and cleanup.",
      },
    ],
    buyerNotes: [
      "Ask suppliers whether material is sold by cubic yard or ton.",
      "Confirm density and minimum delivery quantities locally.",
      "Add a small buffer for compaction, uneven ground, and spreading loss.",
    ],
  },
  "concrete-slab-calculator": {
    title: "Concrete slab shopping checklist",
    description:
      "Concrete volume is only one part of a slab. Forms, base prep, tools, finishing, and curing supplies should be planned early.",
    items: [
      {
        name: "Ready-mix or bagged concrete",
        note: "Compare project size, bag yield, access, and delivery minimums.",
      },
      {
        name: "Gravel base",
        note: "A compacted base helps support the slab and manage drainage.",
      },
      {
        name: "Form boards and stakes",
        note: "Forms control slab size, height, and finished edges.",
      },
      {
        name: "Reinforcement",
        note: "Wire mesh, rebar, or fiber may be needed depending on the slab.",
      },
      {
        name: "Finishing and curing supplies",
        note: "Plan screed, float, edger, broom, gloves, boots, and curing method.",
      },
    ],
    buyerNotes: [
      "Confirm slab thickness before ordering.",
      "Add waste for uneven base, forms, and spillage.",
      "Check local requirements for structural or vehicle-supporting slabs.",
    ],
  },
  "shed-cost-calculator": {
    title: "Shed project shopping checklist",
    description:
      "Use the shed cost estimate to plan the shell, foundation, hardware, and site prep before comparing kits or buying lumber.",
    items: [
      {
        name: "Framing and floor materials",
        note: "Floor, wall, and roof framing drive much of the shell cost.",
      },
      {
        name: "Siding, roofing, and trim",
        note: "Finish level changes both appearance and budget.",
      },
      {
        name: "Foundation materials",
        note: "Gravel, blocks, skids, piers, or concrete should be priced with the shed.",
      },
      {
        name: "Doors, windows, and vents",
        note: "Openings affect usability, airflow, and final cost.",
      },
      {
        name: "Fasteners and hardware",
        note: "Screws, anchors, hinges, latches, hangers, and flashing add up.",
      },
    ],
    buyerNotes: [
      "Check permits, setbacks, HOA rules, and utility locations first.",
      "Compare DIY lumber with prefab shed kits when time matters.",
      "Add a budget buffer for delivery, tool rental, and small hardware.",
    ],
  },
  "mulch-calculator": {
    title: "Mulch project shopping checklist",
    description:
      "After calculating depth and volume, compare bagged mulch, bulk delivery, edging, and bed prep needs.",
    items: [
      {
        name: "Mulch bags or bulk mulch",
        note: "Small beds may be easier with bags; larger areas may fit bulk delivery.",
      },
      {
        name: "Bed edging",
        note: "Edging helps keep mulch out of lawn, paths, and gravel areas.",
      },
      {
        name: "Weeding and prep tools",
        note: "Clear weeds and debris before spreading a fresh layer.",
      },
      {
        name: "Wheelbarrow, rake, and gloves",
        note: "Spreading tools matter most on larger beds or bulk deliveries.",
      },
      {
        name: "Plant-safe spacing",
        note: "Keep mulch pulled back from trunks, crowns, stems, and siding.",
      },
    ],
    buyerNotes: [
      "Choose depth before comparing bag counts.",
      "Do not pile mulch against tree trunks or plant stems.",
      "Plan a smaller refresh layer if existing mulch is still in place.",
    ],
  },
};
