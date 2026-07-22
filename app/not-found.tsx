import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <section className="bg-midnight py-20 text-starlight sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand">
            Page not found
          </p>
          <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
            This moment is not in our sky.
          </h1>
          <p className="mt-6 text-lg leading-8 text-starlight/64">
            The page may have moved, or the link may be incomplete. Start again
            with a date, time, and place.
          </p>
          <Link
            href="/#create"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-starlight px-6 py-3 text-sm font-bold text-midnight transition hover:bg-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
          >
            Choose Your Moment
          </Link>
        </div>
      </Container>
    </section>
  );
}
