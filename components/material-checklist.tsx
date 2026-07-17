import Link from "next/link";
import { Container } from "@/components/container";
import { materialChecklists } from "@/lib/material-checklists";

type MaterialChecklistProps = {
  toolSlug: string;
};

export function MaterialChecklist({ toolSlug }: MaterialChecklistProps) {
  const checklist = materialChecklists[toolSlug];

  if (!checklist) {
    return null;
  }

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Materials checklist
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-ink">
              {checklist.title}
            </h2>
            <p className="mt-4 leading-8 text-muted">
              {checklist.description}
            </p>
            <p className="mt-5 rounded-2xl border border-line bg-surface p-4 text-sm leading-6 text-muted">
              BuildMetric may add affiliate links here later. Recommendations
              should stay practical, clearly disclosed, and tied to the project
              estimate.
              <Link
                href="/affiliate-disclosure"
                className="ml-1 font-semibold text-brand transition hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                Read the affiliate disclosure.
              </Link>
            </p>
          </div>

          <div className="grid gap-4">
            {checklist.items.map((item) => (
              <article
                key={item.name}
                className="rounded-3xl border border-line bg-surface p-5"
              >
                <h3 className="text-lg font-semibold text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 leading-7 text-muted">{item.note}</p>
              </article>
            ))}
            <div className="rounded-3xl border border-line bg-ink p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                Before buying
              </p>
              <ul className="mt-4 grid gap-3">
                {checklist.buyerNotes.map((note) => (
                  <li key={note} className="flex gap-3 leading-7 text-white/80">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-soft" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
