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
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate">
              <Link className="font-semibold text-navy hover:text-forest" href="/">
                Home
              </Link>
              <span>/</span>
              <span>Request a Quote</span>
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-forest">
              Company Information
            </p>
            <div className="border-y border-navy/10 text-sm leading-7 text-navy">
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">Company</p>
                <p>Chengdu Yingmengzhuxi Trading Co., Ltd.</p>
              </div>
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">Contact</p>
                <p>Ethan Gou</p>
              </div>
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">Business Type</p>
                <p>Pet Outdoor &amp; Travel Products Supplier</p>
              </div>
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">Customization</p>
                <p>OEM / ODM Support</p>
              </div>
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">Phone</p>
                <a className="w-fit hover:text-forest" href="tel:+8618215529827">+86 18215529827</a>
              </div>
              <div className="grid gap-1 border-b border-navy/10 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">WhatsApp</p>
                <a className="w-fit hover:text-forest" href="https://wa.me/8618215529827">+86 18215529827</a>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-navy/55">Email / General Email</p>
                <a className="w-fit break-all hover:text-forest" href="mailto:jin.gou@buildmetriccalc.com">jin.gou@buildmetriccalc.com</a>
              </div>
            </div>

            <a
              aria-label="Chat with Ethan Gou on WhatsApp"
              className="mt-8 flex w-full max-w-[390px] items-center gap-6 border border-navy/15 bg-white p-6 transition hover:border-forest/50"
              href="https://wa.me/8618215529827"
            >
              <Image
                alt="WhatsApp QR code for Ethan Gou"
                className="h-[92px] w-[92px] shrink-0 object-contain"
                height={92}
                src="/trovane-whatsapp-qr.jpg"
                width={92}
              />
              <span>
                <span className="block text-lg font-semibold tracking-tight text-navy">Chat with Ethan Gou</span>
                <span className="mt-1 block text-sm leading-6 text-slate">Scan to open WhatsApp.</span>
              </span>
            </a>
          </div>

          <div className="border border-navy/10 bg-white p-5 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Contact TROVANE</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">Start a Conversation</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate">Share your product requirements, quantity or project details. Our team will reply within 1 business day.</p>
            <div className="mt-8">
            <RFQForm initialIntent={initialIntent} initialProduct={initialProduct} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
