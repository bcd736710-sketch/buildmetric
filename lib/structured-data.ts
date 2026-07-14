import type { CalculatorSummary } from "@/lib/calculators";
import { siteConfig } from "@/lib/site";

export function buildToolJsonLd(calculator: CalculatorSummary, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: calculator.name,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        url: `${siteConfig.url}${pageUrl}`,
        description: calculator.metaDescription,
        featureList: [...calculator.formulaSummary, ...calculator.assumptions],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: calculator.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${siteConfig.url}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: calculator.name,
            item: `${siteConfig.url}${pageUrl}`,
          },
        ],
      },
    ],
  };
}
