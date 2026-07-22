import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Our Method",
  description:
    "The astronomy and rendering principles behind The Sky Remembers.",
  alternates: {
    canonical: "/our-method",
  },
};

const principles = [
  "Use date, time, latitude, longitude, and timezone as the source of truth.",
  "Calculate solar system positions with a real astronomy engine.",
  "Use verified star-coordinate data rather than decorative random dots.",
  "Only reveal special cosmic discoveries when a detector can verify the event.",
  "Render final artwork server-side for print resolution instead of browser screenshots.",
];

export default function OurMethodPage() {
  return (
    <section className="bg-[linear-gradient(180deg,#050713_0%,#0c1020_100%)] py-20 text-starlight sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            Our Method
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
            Meaningful, but not made up.
          </h1>
        </div>
        <div>
          <p className="text-lg leading-8 text-starlight/68">
            The Sky Remembers treats astronomy as the ground layer and art as
            the emotional layer. The current MVP has working spikes for real
            astronomical calculation and A3 server-side rendering. Features that
            are not yet verified are intentionally not sold as facts.
          </p>
          <div className="mt-8 grid gap-3">
            {principles.map((principle) => (
              <div
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-starlight/72"
                key={principle}
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
