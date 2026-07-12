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
          "In this first version, coop style is included for planning context but does not change the formula. Future versions may add style-specific recommendations.",
      },
    ],
  },
];

export const calculatorBySlug = Object.fromEntries(
  calculators.map((calculator) => [calculator.slug, calculator]),
) as Record<string, CalculatorSummary>;
