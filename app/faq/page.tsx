import type { Metadata } from "next";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about The Sky Remembers personalized star maps.",
  alternates: {
    canonical: "/faq",
  },
};

const faqs = [
  {
    question: "Is this astrology?",
    answer:
      "No. The product is personalized celestial artwork based on astronomy inputs. It does not make predictions or personality claims.",
  },
  {
    question: "Is the preview the final high-resolution file?",
    answer:
      "No. The browser preview is a live composition aid. Final files are intended to be rendered server-side at A3 300 DPI.",
  },
  {
    question: "Are cosmic discoveries random?",
    answer:
      "No. A discovery should only appear when the system verifies a real astronomical event connected to the moment.",
  },
  {
    question: "Can I buy this now?",
    answer:
      "Checkout is not connected in the current MVP. PayPal Sandbox integration will be added before any real payment flow.",
  },
  {
    question: "Will I receive a physical poster?",
    answer:
      "The current product direction is digital artwork only. No physical item ships in the MVP.",
  },
];

export default function FAQPage() {
  return (
    <section className="bg-midnight py-20 text-starlight sm:py-28">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            FAQ
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
            Clear answers before the sky gets poetic.
          </h1>
        </div>
        <div className="mt-12 grid gap-4">
          {faqs.map((faq) => (
            <div
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
              key={faq.question}
            >
              <h2 className="text-2xl font-black">{faq.question}</h2>
              <p className="mt-3 leading-7 text-starlight/64">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
