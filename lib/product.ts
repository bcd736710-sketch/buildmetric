export type ProductAvailability = "checkout_pending" | "available";

export type ProductConfig = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  currency: string;
  checkoutUrl: string | null;
  availability: ProductAvailability;
  purchaseButtonText: string;
  unavailableText: string;
  heroTitle: string;
  heroSubtitle: string;
  digitalLabel: string;
  deliveryNote: string;
  overview: string;
  includedItems: Array<{
    title: string;
    description: string;
  }>;
  glance: Array<{
    label: string;
    value: string;
  }>;
  audience: Array<{
    title: string;
    description: string;
  }>;
  gallery: Array<{
    label: string;
    description: string;
  }>;
  previews: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const chickenCoopPlan: ProductConfig = {
  slug: "5x6-chicken-coop-plans",
  name: "5' x 6' Chicken Coop Plans",
  shortName: "5x6 Chicken Coop Plans",
  price: "$17.95",
  currency: "USD",
  checkoutUrl: null,
  availability: "checkout_pending",
  purchaseButtonText: "Get the Plans",
  unavailableText: "Checkout setup in progress",
  heroTitle: "Build Your Own Backyard Chicken Coop",
  heroSubtitle:
    "A complete 5' x 6' chicken coop building plan designed to help DIY builders go from materials to finished coop with less guesswork.",
  digitalLabel: "Digital download",
  deliveryNote: "No physical product will be shipped.",
  overview:
    "A focused plan package for DIY builders who want a clear chicken coop project instead of starting from a blank page.",
  includedItems: [
    {
      title: "Building Plans",
      description:
        "Editable placeholder for the main plan pages once the final product files are confirmed.",
    },
    {
      title: "Material List",
      description:
        "Editable placeholder for the product's final material list details.",
    },
    {
      title: "Cut List",
      description:
        "Editable placeholder for board and panel cut details after product verification.",
    },
    {
      title: "Step-by-Step Guide",
      description:
        "Editable placeholder for the instruction format and build sequence.",
    },
  ],
  glance: [
    { label: "Size", value: "5 ft x 6 ft" },
    { label: "Digital product", value: "Instant download" },
    { label: "Skill level", value: "TBD" },
    { label: "Chicken capacity", value: "TBD" },
    { label: "Estimated build cost", value: "TBD" },
    { label: "Build time", value: "TBD" },
  ],
  audience: [
    {
      title: "Backyard chicken owners",
      description:
        "For people planning a dedicated coop for a small backyard flock.",
    },
    {
      title: "DIY homeowners",
      description:
        "For builders who prefer a clear plan before buying materials.",
    },
    {
      title: "Prefab alternatives",
      description:
        "For people comparing a build-it-yourself project with a ready-made coop.",
    },
  ],
  gallery: [
    { label: "Front", description: "Future finished coop front view." },
    { label: "Side", description: "Future side elevation or photo." },
    { label: "Back", description: "Future rear view placeholder." },
    { label: "Interior", description: "Future inside layout preview." },
    { label: "Nesting box", description: "Future nesting box detail." },
  ],
  previews: [
    {
      title: "PDF page preview",
      description: "Reserved for a real page sample from the plan package.",
    },
    {
      title: "Structure diagrams",
      description: "Reserved for verified plan diagrams or elevations.",
    },
    {
      title: "Material list sample",
      description: "Reserved for a confirmed material list preview.",
    },
    {
      title: "Instruction pages",
      description: "Reserved for real step-by-step instruction samples.",
    },
  ],
  faqs: [
    {
      question: "Is this a physical chicken coop?",
      answer:
        "No. This is planned as a digital building plan product. No physical chicken coop will be shipped.",
    },
    {
      question: "How will I receive the plans?",
      answer:
        "Delivery details will be confirmed when checkout is connected. The product is intended to be delivered digitally.",
    },
    {
      question: "What file format will I receive?",
      answer:
        "TBD. The final file format will be updated after the product files are confirmed.",
    },
    {
      question: "What measurements are used?",
      answer:
        "The plan is positioned around a 5 ft x 6 ft footprint. Additional measurement details will be confirmed from the final product files.",
    },
    {
      question: "Can beginners build this?",
      answer:
        "TBD. Skill level will be updated after the final plan details are reviewed.",
    },
    {
      question: "Can I modify the design?",
      answer:
        "Many DIY builders adapt plans to their yard and local needs, but final guidance will depend on the confirmed plan details.",
    },
  ],
};
