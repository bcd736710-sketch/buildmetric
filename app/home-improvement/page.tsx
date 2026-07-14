import type { Metadata } from "next";
import { TopicHubPage } from "@/components/topic-hub-page";
import { topicHubBySlug } from "@/lib/topic-hubs";

const hub = topicHubBySlug["home-improvement"];

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.metaDescription,
  alternates: { canonical: `/${hub.slug}` },
  openGraph: {
    title: `${hub.metaTitle} | BuildMetric`,
    description: hub.metaDescription,
    url: `/${hub.slug}`,
    type: "website",
  },
};

export default function HomeImprovementPage() {
  return <TopicHubPage hub={hub} />;
}
