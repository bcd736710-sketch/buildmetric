import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BuildMetric",
    short_name: "BuildMetric",
    description:
      "Backyard DIY calculators and material planning guides for homeowners.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#256f5a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["utilities", "productivity", "lifestyle"],
  };
}
