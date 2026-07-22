import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How The Sky Remembers turns a date, time, and place into personalized celestial artwork.",
  alternates: {
    canonical: "/how-it-works",
  },
};

const steps = [
  {
    title: "Choose your moment",
    text: "Start with the date, time, and place that matters. Those details define the sky we calculate.",
  },
  {
    title: "Rebuild the sky",
    text: "The astronomy layer converts the moment into celestial positions for the observer's location.",
  },
  {
    title: "Shape the artwork",
    text: "Choose a visual style, add a title and message, then preview the composition before checkout is connected.",
  },
  {
    title: "Export for print",
    text: "The production renderer is designed for A3 portrait output at 300 DPI as PNG and PDF.",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="bg-midnight py-20 text-starlight sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            How It Works
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
            From one moment to one remembered sky.
          </h1>
          <p className="mt-6 text-lg leading-8 text-starlight/68">
            The Sky Remembers is not astrology and not a random art generator.
            The goal is to make personalized celestial artwork from real time
            and place inputs.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => (
            <div
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
              key={step.title}
            >
              <p className="text-sm font-bold text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-2xl font-black">{step.title}</h2>
              <p className="mt-3 leading-7 text-starlight/62">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
