import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

const exploreLinks = [
  ["Create", "/#create"],
  ["How It Works", "/how-it-works"],
  ["Our Method", "/our-method"],
  ["FAQ", "/faq"],
];

const supportLinks = [
  ["Contact", "/contact"],
  ["Privacy", "/privacy-policy"],
  ["Terms", "/terms"],
  ["Refund Policy", "/refund-policy"],
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight py-12 text-starlight">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="max-w-xl">
          <div className="flex items-center gap-3">
            <BrandMark />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              {siteConfig.brandName}
            </p>
          </div>
          <p className="mt-5 max-w-md leading-7 text-starlight/66">
            Personalized celestial artwork from a date, time, and place. Built
            for meaning, grounded in astronomical calculation.
          </p>
          <p className="mt-4 text-sm text-starlight/48">
            Digital artwork only. No physical item ships in the current MVP.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Explore
            </p>
            <div className="mt-4 grid gap-3">
              {exploreLinks.map(([label, href]) => (
                <Link
                  className="text-sm font-medium text-starlight/66 transition hover:text-starlight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Support
            </p>
            <div className="mt-4 grid gap-3">
              {supportLinks.map(([label, href]) => (
                <Link
                  className="text-sm font-medium text-starlight/66 transition hover:text-starlight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/30"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6">
        <p className="text-sm text-starlight/44">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
