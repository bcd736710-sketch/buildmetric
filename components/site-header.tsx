"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Home", href: "/#home" },
  { label: "Products", href: "/products" },
  { label: "Customization", href: "/#customization" },
  { label: "Sourcing Service", href: "/#service" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return <header className="sticky top-0 z-50 border-b border-navy/10 bg-warm/92 backdrop-blur">
    <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
      <Link aria-label="TROVANE home" className="flex shrink-0 items-center" href="/">
        <Image alt="TROVANE Pet Outdoor and Travel logo" className="h-auto w-[126px] sm:w-[146px] lg:w-[170px]" height={47} src="/trovane-logo-horizontal-cropped.png" style={{ height: "auto" }} unoptimized width={170} />
      </Link>
      <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-[12px] font-semibold text-navy/78 lg:flex xl:gap-6 xl:text-[13px]">
        {navigationItems.map((item) => <Link className="whitespace-nowrap transition hover:text-forest" href={item.href} key={item.label}>{item.label}</Link>)}
      </nav>
      <Link className="hidden min-h-12 shrink-0 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy lg:inline-flex" href="/rfq">Request a Quote</Link>
      <div className="flex items-center gap-2 lg:hidden">
        <details className="relative">
          <summary className="flex h-11 cursor-pointer list-none items-center rounded-full border border-navy/15 px-4 text-xs font-bold uppercase tracking-[0.08em] text-navy">Menu</summary>
          <nav aria-label="Mobile navigation" className="absolute right-0 mt-3 w-64 border border-navy/10 bg-warm p-3 shadow-[0_20px_50px_rgba(0,35,70,0.14)]">
            {navigationItems.map((item) => <Link className="block px-3 py-3 text-sm font-semibold text-navy transition hover:bg-mist hover:text-forest" href={item.href} key={item.label}>{item.label}</Link>)}
          </nav>
        </details>
        <Link className="inline-flex h-11 items-center rounded-full bg-forest px-3 text-[10px] font-bold uppercase tracking-normal text-white transition hover:bg-navy whitespace-nowrap" href="/rfq">Request a Quote</Link>
      </div>
    </div>
  </header>;
}
