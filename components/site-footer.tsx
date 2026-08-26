import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Customization", href: "/#customization" },
  { label: "Sourcing Service", href: "/#service" },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function SiteFooter() {
  return <footer className="border-t border-navy/10 bg-white px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_2fr]">
      <div><Link aria-label="TROVANE home" className="flex w-fit items-center" href="/"><Image alt="TROVANE Pet Outdoor and Travel logo" className="h-auto w-[126px]" height={41} src="/trovane-logo-horizontal-cropped.png" unoptimized width={126} /></Link><p className="mt-5 max-w-sm text-sm leading-7 text-slate">Pet outdoor and travel products for overseas brands, retailers, distributors, online sellers and importers.</p></div>
      <div className="grid gap-8 sm:grid-cols-[1fr_1fr_1.1fr]"><div><h2 className="text-sm font-bold text-navy">Explore</h2><ul className="mt-4 space-y-3 text-sm text-slate">{footerLinks.slice(0, 2).map((item) => <li key={item.href}><Link className="transition hover:text-forest" href={item.href}>{item.label}</Link></li>)}</ul></div><div><h2 className="text-sm font-bold text-navy">Company</h2><ul className="mt-4 space-y-3 text-sm text-slate">{footerLinks.slice(2).map((item) => <li key={item.href}><Link className="transition hover:text-forest" href={item.href}>{item.label}</Link></li>)}</ul></div><div><h2 className="text-sm font-bold text-navy">Get in Touch</h2><div className="mt-4 space-y-3 text-sm text-slate"><a className="transition hover:text-forest" href="mailto:jin.gou@buildmetriccalc.com">jin.gou@buildmetriccalc.com</a><a className="block transition hover:text-forest" href="https://wa.me/8618215529827">WhatsApp: +86 18215529827</a><Link className="inline-flex pt-1 font-bold uppercase tracking-[0.08em] text-forest transition hover:text-navy" href="/rfq">Request a Quote</Link></div></div></div>
    </div>
  </footer>;
}
