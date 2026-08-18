import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "/products" },
  { label: "Customization", href: "#customization" },
  { label: "Sourcing Service", href: "#service" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  {
    title: "Travel & Car",
    href: "/products/travel-car",
    image: "/trovane-category-travel-cat.jpg",
    objectPosition: "center",
    items: ["Car Seats", "Carriers", "Safety Restraints", "Car Covers"],
  },
  {
    title: "Walking & Hiking",
    href: "/products/travel-car",
    image: "/trovane-category-hiking-dog.jpg",
    objectPosition: "center",
    items: ["Harnesses", "Leashes", "Collars", "Reflective Gear"],
  },
  {
    title: "Outdoor Feeding",
    href: "/products/travel-car",
    image: "/trovane-product-bowl-cat.jpg",
    objectPosition: "center",
    items: ["Travel Water Bottles", "Travel Bowls", "Food & Water Containers"],
  },
  {
    title: "Outdoor Apparel",
    href: "/products/travel-car",
    image: "/trovane-category-apparel-dog.jpg",
    objectPosition: "center",
    items: ["Cooling Vests", "Raincoats", "Functional Outdoor Clothing"],
  },
  {
    title: "Camping & Accessories",
    href: "/products/travel-car",
    image: "/trovane-category-camping-pets.jpg",
    objectPosition: "65% center",
    items: ["Portable Beds", "Travel Mats", "Backpacks", "Outdoor Accessories"],
  },
];

const products = [
  {
    name: "2-in-1 Pet Travel Bottle",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Hydration",
    audience: "For Dogs & Cats",
    image: "/trovane-product-bottle-dog.jpg",
  },
  {
    name: "Pet Travel Carrier",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Travel & Car",
    audience: "For Dogs & Cats",
    image: "/trovane-product-carrier-cat.jpg",
  },
  {
    name: "Adjustable Outdoor Harness",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Walking & Hiking",
    audience: "For Dogs",
    image: "/trovane-product-harness-dog.jpg",
  },
  {
    name: "Collapsible Travel Bowl",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Outdoor Feeding",
    audience: "For Dogs & Cats",
    image: "/trovane-product-bowl-cat.jpg",
  },
  {
    name: "Cooling Vest",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Outdoor Apparel",
    audience: "For Dogs",
    image: "/trovane-product-vest-dog.jpg",
  },
  {
    name: "Pet Travel Backpack / Carrier",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Dogs & Cats",
    audience: "For Cats",
    image: "/trovane-product-backpack-cat.jpg",
  },
  {
    name: "Reflective Leash",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Safety Gear",
    audience: "For Dogs",
    image: "/trovane-product-leash-dog.jpg",
  },
  {
    name: "Portable Outdoor Pet Bed",
    href: "/products/travel-car/pet-travel-carrier",
    tag: "Camping",
    audience: "For Dogs & Cats",
    image: "/trovane-category-camping-pets.jpg",
  },
];

const services = [
  {
    title: "Custom Logo",
    text: "Selected products can be prepared with brand logo placement for retail and online channels.",
  },
  {
    title: "Custom Packaging",
    text: "Packaging direction, labels and carton details can be coordinated around your brand needs.",
  },
  {
    title: "Colors & Materials",
    text: "We help align product options with your market, retail tier and outdoor use case.",
  },
  {
    title: "Flexible MOQ",
    text: "Start with practical order quantities while testing new products or seasonal programs.",
  },
];

const reasons = [
  {
    title: "Flexible Sourcing",
    text: "We help match products and supply solutions based on your market and requirements.",
  },
  {
    title: "Customization",
    text: "Logo, packaging, colors and selected product options for your brand.",
  },
  {
    title: "Quality Control",
    text: "Product, packaging and quantity checks before shipment.",
  },
  {
    title: "One-stop Coordination",
    text: "One contact for sourcing, samples, production coordination and shipping.",
  },
];

const steps = [
  "Tell Us What You Need",
  "Product & Sourcing Proposal",
  "Sample & Confirmation",
  "Production & Quality Check",
  "Shipping",
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a aria-label="TROVANE home" className="flex shrink-0 items-center" href="#home">
      <Image
        alt="TROVANE Pet Outdoor and Travel logo"
        className={compact ? "h-auto w-[126px]" : "h-auto w-[146px] sm:w-[170px]"}
        height={compact ? 41 : 47}
        src="/trovane-logo-horizontal-cropped.png"
        style={{ height: "auto" }}
        unoptimized
        width={compact ? 126 : 170}
      />
    </a>
  );
}

function SectionHeading({
  label,
  title,
  text,
}: {
  label?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      {label ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-forest">
          {label}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-5xl">
        {title}
      </h2>
      {text ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
}) {
  const className =
    variant === "primary"
      ? "bg-forest text-white hover:bg-navy"
      : variant === "light"
        ? "border border-white/70 bg-white text-navy hover:bg-mist"
        : "border border-navy/20 bg-white text-navy hover:border-forest hover:text-forest";

  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold uppercase tracking-[0.08em] transition duration-200 active:translate-y-px ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}

export default function HomePage() {
  return (
    <main id="home" className="overflow-x-hidden bg-warm text-navy">
      <header className="sticky top-0 z-50 border-b border-navy/10 bg-warm/92 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav aria-label="Primary navigation" className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                className="whitespace-nowrap text-[12px] font-semibold text-navy/78 transition hover:text-forest xl:text-[13px]"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden shrink-0 lg:flex">
            <Button href="/rfq">Request a Quote</Button>
          </div>
          <details className="relative lg:hidden">
            <summary className="flex h-11 cursor-pointer list-none items-center rounded-full border border-navy/15 px-5 text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-navy/10 bg-white p-4 shadow-[0_24px_70px_rgba(0,35,70,0.14)]">
              {navItems.map((item) => (
                <a
                  className="block rounded-xl px-3 py-3 text-sm font-semibold text-navy hover:bg-mist"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-3 grid gap-2">
                <Button href="/rfq">Request a Quote</Button>
              </div>
            </div>
          </details>
        </div>
      </header>

      <section className="relative isolate h-[720px] overflow-hidden sm:h-[748px] lg:h-auto lg:min-h-[calc(100dvh-68px)]">
        <Image
          alt="A dog wearing an outdoor harness drinks from a portable pet water bottle while a cat uses an open travel carrier beside a lakeside SUV rest stop"
          className="absolute inset-0 h-full w-full object-cover object-[71%_50%] sm:object-[68%_50%] lg:object-[58%_50%]"
          fill
          priority
          sizes="100vw"
          src="/trovane-hero-product-use.png"
          unoptimized
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,32,63,0.54),rgba(0,32,63,0.24)_35%,rgba(0,32,63,0.06)_62%,rgba(0,32,63,0.10))] lg:bg-[linear-gradient(90deg,rgba(0,32,63,0.50),rgba(0,32,63,0.31)_34%,rgba(0,32,63,0.09)_62%,rgba(0,32,63,0.02))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,32,63,0.04),rgba(0,32,63,0.02)_44%,rgba(0,32,63,0.18))] max-lg:hidden" />
        <div className="relative mx-auto flex h-full max-w-[1360px] items-start px-4 pt-24 sm:px-6 sm:pt-28 lg:min-h-[calc(100dvh-68px)] lg:items-center lg:px-8 lg:py-14">
          <div className="max-w-[360px] text-white sm:max-w-[420px] lg:max-w-[560px]">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 sm:text-xs lg:mb-5 lg:text-sm lg:tracking-[0.2em]">
              TROVANE PET OUTDOOR & TRAVEL
            </p>
            <h1 className="max-w-[340px] text-[38px] font-semibold leading-[1.02] tracking-tight sm:max-w-[420px] sm:text-[42px] lg:max-w-[540px] lg:text-[4.25rem]">
              Outdoor & Travel Gear for Pets
            </h1>
            <p className="mt-4 max-w-[340px] text-base leading-6 text-white/88 sm:max-w-[390px] lg:mt-6 lg:max-w-[480px] lg:text-lg lg:leading-8">
              Pet outdoor and travel products for brands, retailers and
              distributors worldwide.
            </p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:max-w-[360px] lg:mt-8 lg:max-w-none lg:flex-row">
              <a
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-forest px-6 text-sm font-bold uppercase tracking-[0.08em] text-white transition duration-200 hover:bg-navy active:translate-y-px sm:w-auto lg:hidden"
                href="/rfq"
              >
                Request a Quote
              </a>
              <a
                className="inline-flex min-h-8 items-center justify-center px-1 text-xs font-bold uppercase tracking-[0.08em] text-white/90 underline decoration-white/35 underline-offset-8 transition duration-200 hover:text-white active:translate-y-px lg:hidden"
                href="#products"
              >
                Explore Products -&gt;
              </a>
              <div className="hidden lg:contents">
                <Button href="/rfq">Request a Quote</Button>
                <Button href="#products" variant="light">
                Explore Products
                </Button>
              </div>
            </div>
            <div className="mt-10 hidden grid-cols-3 divide-x divide-white/35 border-t border-white/30 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/78 lg:grid">
              <span className="whitespace-nowrap pr-3">Flexible MOQ</span>
              <span className="whitespace-nowrap px-3">Customization</span>
              <span className="whitespace-nowrap pl-3">Shipping Coordination</span>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-warm px-4 py-3 text-[9px] font-bold uppercase text-navy/72 sm:px-6 lg:hidden">
        <div className="mx-auto grid max-w-[520px] grid-cols-3 items-center divide-x divide-navy/15 text-center">
          <span className="whitespace-nowrap px-1">Flexible MOQ</span>
          <span className="whitespace-nowrap px-1">Customization</span>
          <span className="whitespace-nowrap px-1">Shipping Coordination</span>
        </div>
      </div>

      <section id="products" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Shop by Category"
            text="A focused product range for pet travel, active days outside and retail-ready outdoor programs."
            title="Built around how pets move, travel and explore."
          />
          <div className="grid gap-4 lg:grid-cols-12">
            {categories.map((category, index) => (
              <Link
                className={`group relative min-h-[320px] overflow-hidden rounded-[24px] bg-navy text-white sm:min-h-[360px] ${
                  index < 2 ? "lg:col-span-6" : "lg:col-span-4"
                }`}
                href={category.href}
                key={category.title}
              >
                <Image
                  alt={`${category.title} pet outdoor product scene`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src={category.image}
                  style={{ objectPosition: category.objectPosition ?? "center" }}
                  unoptimized
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,32,63,0.02),rgba(0,32,63,0.64))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {category.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-xs font-semibold text-white/84">
                    {category.items.map((item) => (
                      <span
                        className="border-b border-white/24 pb-0.5"
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-forest">
                Featured Products
              </p>
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-navy sm:text-5xl">
                Wholesale-ready products for outdoor pet programs.
              </h2>
            </div>
            <Button href="/rfq?intent=wholesale-price" variant="secondary">
              Get Wholesale Price
            </Button>
          </div>
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article className="group" key={product.name}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-navy/8 bg-mist">
                  <Image
                    alt={`${product.name} for pet outdoor and travel sourcing`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    src={product.image}
                    unoptimized
                  />
                </div>
                <div className="pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">
                      {product.tag}
                    </p>
                    <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold text-navy/72">
                      {product.audience}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-navy">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate">
                    Custom logo and packaging options available.
                  </p>
                  <Link
                    className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.08em] text-navy transition hover:text-forest"
                    href={`/rfq?product=${encodeURIComponent(product.name)}&intent=wholesale-price`}
                  >
                    Request Price -&gt;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-[660px] lg:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image
            alt="Outdoor lifestyle with pets traveling beyond the door"
            className="absolute inset-0 h-full w-full object-cover"
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, 100vw"
            src="/trovane-category-camping-pets.jpg"
            unoptimized
          />
        </div>
        <div className="flex items-center bg-navy px-4 py-20 text-white sm:px-10 lg:px-16">
          <div className="max-w-xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-moss">
              Outdoor Lifestyle
            </p>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Built for Life Beyond the Door.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/76">
              TROVANE helps pet brands shape product lines for road trips,
              trail walks, camping weekends and everyday movement outside.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm font-semibold text-white/82">
              <span>Travel</span>
              <span>Hiking</span>
              <span>Camping</span>
              <span>Exploration</span>
            </div>
          </div>
        </div>
      </section>

      <section id="customization" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="Made for Your Brand"
            text="Customization is treated as retail brand support, with practical choices around logo, packaging, materials and order planning."
            title="A sourcing program that can carry your brand."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                className="rounded-[24px] border border-navy/10 bg-white p-7"
                key={service.title}
              >
                <h3 className="text-xl font-semibold text-navy">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate">{service.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/rfq?intent=custom-project">Start Your Custom Project</Button>
          </div>
        </div>
      </section>

      <section id="service" className="bg-mist px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-forest">
              Why TROVANE
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-5xl">
              Practical B2B support without factory-story exaggeration.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate">
              We focus on coordination, sourcing fit, customization readiness
              and shipment preparation for overseas pet product buyers.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <article
                className="rounded-[24px] bg-white p-7"
                key={reason.title}
              >
                <h3 className="text-lg font-semibold text-navy">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate">{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            label="How We Work"
            title="From brief to shipment, one clear path."
          />
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <article
                className="rounded-[24px] border border-navy/10 bg-white p-6"
                key={step}
              >
                <p className="font-mono text-sm text-forest">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-10 text-lg font-semibold leading-6 text-navy">
                  {step}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-white px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[28px] border border-navy/10 bg-warm p-8 sm:p-10">
            <Image
              alt="TROVANE Pet Outdoor and Travel logo"
              className="h-auto w-full"
              height={1180}
              loading="lazy"
              src="/trovane-logo-horizontal-cropped.png"
              style={{ height: "auto" }}
              unoptimized
              width={1180}
            />
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-forest">
              About TROVANE
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-navy sm:text-5xl">
              Pet outdoor and travel sourcing for brands that need a better
              product line.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate">
              TROVANE is a China-based pet outdoor and travel products supplier,
              helping pet brands, retailers and distributors source, customize
              and develop products for their markets.
            </p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-navy sm:grid-cols-2">
              <span>Pet Outdoor & Travel specialization</span>
              <span>Reliable sourcing partners</span>
              <span>Professional coordination</span>
              <span>International shipping support</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-navy text-white">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-8 sm:p-12 lg:p-16">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-moss">
                RFQ
              </p>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Looking for Your Next Pet Product?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
                Tell us the product, quantity and customization you need. We
                will help you find the right solution.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/rfq" variant="light">
                  Request a Quote
                </Button>
                <Button href="/rfq?intent=whatsapp">WhatsApp Us</Button>
              </div>
            </div>
            <div className="bg-forest p-8 sm:p-12 lg:p-16">
              <div className="rounded-[24px] bg-white/10 p-6">
                <h3 className="text-xl font-semibold">RFQ details to prepare</h3>
                <div className="mt-6 grid gap-3 text-sm text-white/84 sm:grid-cols-2">
                  <span>Country</span>
                  <span>Company</span>
                  <span>Email</span>
                  <span>WhatsApp</span>
                  <span>Product</span>
                  <span>Quantity</span>
                  <span>Logo customization</span>
                  <span>Packaging customization</span>
                  <span>Target price optional</span>
                  <span>Other requirements</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy/10 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo compact />
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate">
              Pet outdoor and travel products for overseas brands, retailers,
              distributors, online sellers and importers.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-4">
            <FooterColumn
              title="Products"
              items={[
                "Travel & Car",
                "Walking & Hiking",
                "Outdoor Feeding",
                "Outdoor Apparel",
                "Camping & Accessories",
              ]}
            />
            <FooterColumn
              title="Customization"
              items={[
                "Custom Logo",
                "Custom Packaging",
                "Colors & Materials",
                "Flexible MOQ",
              ]}
            />
            <FooterColumn
              title="Company"
              items={["About Us", "Sourcing Service", "How We Work", "Contact Us"]}
            />
            <div>
              <h3 className="text-sm font-bold text-navy">Get in Touch</h3>
              <div className="mt-4 space-y-3 text-sm text-slate">
                <p>Email: admin@buildmetriccalc.com</p>
                <p>WhatsApp: Available on request</p>
                <p>Company information: To be updated</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-navy">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-slate">
        {items.map((item) => (
          <li key={item}>
            <a className="transition hover:text-forest" href="#products">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
