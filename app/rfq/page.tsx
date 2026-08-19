import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RFQForm } from "./rfq-form";

export const metadata: Metadata = {
  title: "Request a Quote | TROVANE",
  description:
    "Submit a B2B RFQ for TROVANE pet outdoor and travel products.",
  alternates: {
    canonical: "https://buildmetriccalc.com/rfq",
  },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-warm/92 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link aria-label="TROVANE home" className="flex shrink-0 items-center" href="/">
          <Image
            alt="TROVANE Pet Outdoor and Travel logo"
            className="h-auto w-[146px] sm:w-[170px]"
            height={47}
            src="/trovane-logo-horizontal-cropped.png"
            style={{ height: "auto" }}
            unoptimized
            width={170}
          />
        </Link>
        <nav className="hidden items-center gap-6 text-[13px] font-semibold text-navy/78 lg:flex">
          <Link className="hover:text-forest" href="/products">
            Products
          </Link>
          <Link className="hover:text-forest" href="/#customization">
            Customization
          </Link>
          <Link className="hover:text-forest" href="/#service">
            Sourcing Service
          </Link>
        </nav>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-forest px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy sm:min-h-12 sm:px-6 sm:text-sm"
          href="/rfq"
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}

export default async function RFQPage({
  searchParams,
}: {
  searchParams?: Promise<{ product?: string; intent?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const initialProduct = params.product ? decodeURIComponent(params.product) : "";
  const initialIntent = params.intent ? decodeURIComponent(params.intent) : "";

  return (
    <main className="bg-warm text-navy">
      <Header />

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate">
              <Link className="font-semibold text-navy hover:text-forest" href="/">
                Home
              </Link>
              <span>/</span>
              <span>Request a Quote</span>
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-forest">
              B2B RFQ
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-navy sm:text-6xl">
              Tell us what you want to source.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate">
              Share your product, quantity, customization and reference details.
              TROVANE will review the request and follow up with sourcing or
              wholesale pricing information.
            </p>

            <div className="mt-8 border-y border-navy/10 py-5 text-sm leading-7 text-slate">
              <p>
                <strong className="text-navy">Response focus:</strong> product
                fit, sample direction, customization and B2B pricing.
              </p>
              <p className="mt-3">
                <strong className="text-navy">Response time:</strong> We typically
                reply within 1 business day.
              </p>
            </div>
          </div>

          <div className="border border-navy/10 bg-white p-5 sm:p-8">
            <RFQForm initialIntent={initialIntent} initialProduct={initialProduct} />
          </div>
        </div>
      </section>
    </main>
  );
}
