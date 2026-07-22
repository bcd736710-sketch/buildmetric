import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Sky Remembers",
    short_name: "Sky Remembers",
    description:
      "Personalized celestial artwork from a meaningful date, time, and place.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#050713",
    theme_color: "#050713",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["art", "lifestyle", "personalization"],
  };
}
