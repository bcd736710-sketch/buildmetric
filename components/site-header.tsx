"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Customization", href: "/#customization" },
  { label: "Sourcing Service", href: "/#service" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/products") return pathname === "/products" || pathname.startsWith("/products/");
    if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
    return false;
  };

  if (pathname.startsWith("/admin")) return null;

  return <header className="sticky top-0 z-50 border-b border-navy/10 bg-warm/92 backdrop-blur">
    <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
      <Link aria-label="TROVANE home" className="flex shrink-0 items-center" href="/">
        <Image alt="TROVANE Pet Outdoor and Travel logo" className="h-auto w-[126px] sm:w-[146px] lg:w-[170px]" height={47} src="/trovane-logo-horizontal-cropped.png" style={{ height: "auto" }} unoptimized width={170} />
      </Link>
      <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-4 text-[12px] font-semibold text-navy/78 lg:flex xl:gap-6 xl:text-[13px]">
        {navigationItems.map((item) => <Link aria-current={isActive(item.href) ? "page" : undefined} className={`whitespace-nowrap transition hover:text-forest ${isActive(item.href) ? "text-forest" : ""}`} href={item.href} key={item.label}>{item.label}</Link>)}
      </nav>
      <Link aria-current={pathname === "/rfq" ? "page" : undefined} className={`hidden min-h-12 shrink-0 items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy lg:inline-flex ${pathname === "/rfq" ? "ring-2 ring-navy/25 ring-offset-2 ring-offset-warm" : ""}`} href="/rfq">Request a Quote</Link>
      <div className="flex items-center gap-2 lg:hidden">
        <div className="relative">
          <button aria-controls="mobile-primary-navigation" aria-expanded={isMobileMenuOpen} className="flex h-11 items-center rounded-full border border-navy/15 px-4 text-xs font-bold uppercase tracking-[0.08em] text-navy" onClick={() => setIsMobileMenuOpen((open) => !open)} type="button">Menu</button>
          {isMobileMenuOpen ? <nav aria-label="Mobile navigation" className="absolute right-0 mt-3 w-64 border border-navy/10 bg-warm p-3 shadow-[0_20px_50px_rgba(0,35,70,0.14)]" id="mobile-primary-navigation">
            {navigationItems.map((item) => <Link aria-current={isActive(item.href) ? "page" : undefined} className={`block px-3 py-3 text-sm font-semibold transition hover:bg-mist hover:text-forest ${isActive(item.href) ? "bg-mist text-forest" : "text-navy"}`} href={item.href} key={item.label} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>)}
            <Link aria-current={pathname === "/rfq" ? "page" : undefined} className={`mt-2 block px-3 py-3 text-sm font-semibold transition hover:bg-mist hover:text-forest ${pathname === "/rfq" ? "bg-mist text-forest" : "text-navy"}`} href="/rfq" onClick={() => setIsMobileMenuOpen(false)}>Request a Quote</Link>
          </nav> : null}
        </div>
      </div>
    </div>
  </header>;
}
