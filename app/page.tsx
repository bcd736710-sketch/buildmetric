import type { Metadata } from "next";
import { SkyExperience } from "@/components/sky/sky-experience";

export const metadata: Metadata = {
  title: "The Sky Remembers - Personalized Star Maps",
  description:
    "Choose a date, time, and place to bring that sky back to life as personalized celestial artwork.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Sky Remembers - Personalized Star Maps",
    description:
      "What did the universe look like at your moment? Create personalized celestial artwork from a meaningful date, time, and place.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return <SkyExperience />;
}
