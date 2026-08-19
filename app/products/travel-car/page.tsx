import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel & Car Products | TROVANE",
  description:
    "Travel carriers, restraints, hydration and comfort products for pet travel.",
  alternates: {
    canonical: "https://buildmetriccalc.com/products/travel-car",
  },
};

const products = [
  {
    name: "Pet Travel Carrier",
    href: "/products/travel-car/pet-travel-carrier",
    image: "/trovane-product-carrier-cat.jpg",
    category: "Carrier",
    audience: "For Dogs & Cats",
  },
  {
    name: "Pet Travel Backpack / Carrier",
    href: "/products/travel-car/pet-travel-carrier",
    image: "/trovane-product-backpack-cat.jpg",
    category: "Carrier",
    audience: "For Cats",
  },
  {
    name: "2-in-1 Pet Travel Bottle",
    href: "/products/travel-car/pet-travel-carrier",
    image: "/trovane-product-bottle-dog.jpg",
    category: "Hydration",
    audience: "For Dogs & Cats",
  },
  {
    name: "Collapsible Travel Bowl",
    href: "/products/travel-car/pet-travel-carrier",
    image: "/trovane-product-bowl-cat.jpg",
    category: "Hydration",
    audience: "For Dogs & Cats",
  },
  {
    name: "Portable Outdoor Pet Bed",
    href: "/products/travel-car/pet-travel-carrier",
    image: "/trovane-category-camping-pets.jpg",
    category: "Mats & Beds",
    audience: "For Dogs & Cats",
  },
  {
    name: "Adjustable Outdoor Harness",
    href: "/products/travel-car/pet-travel-carrier",
    image: "/trovane-product-harness-dog.jpg",
    category: "Car Safety",
    audience: "For Dogs",
  },
];

const filters = ["All", "Carriers", "Car Safety", "Hydration", "Mats & Beds", "Dogs", "Cats"];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-warm/92 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8">
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
          <Link className="text-forest" href="/products">
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
          className="hidden min-h-11 items-center justify-center rounded-full bg-forest px-5 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy sm:min-h-12 sm:px-6 sm:text-sm lg:inline-flex"
          href="/rfq"
        >
          Request a Quote
        </Link>
        <div className="flex items-center gap-2 lg:hidden">
          <details className="relative">
            <summary className="flex h-11 cursor-pointer list-none items-center rounded-full border border-navy/15 px-4 text-xs font-bold uppercase tracking-[0.08em] text-navy">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-56 border border-navy/10 bg-warm p-3">
              <Link className="block px-3 py-3 text-sm font-semibold text-navy" href="/products">
                Products
              </Link>
              <Link className="block px-3 py-3 text-sm font-semibold text-navy" href="/#customization">
                Customization
              </Link>
              <Link className="block px-3 py-3 text-sm font-semibold text-navy" href="/#service">
                Sourcing Service
              </Link>
            </div>
          </details>
          <Link
            className="inline-flex h-11 items-center rounded-full bg-forest px-3 text-[11px] font-bold uppercase tracking-normal text-white whitespace-nowrap"
            href="/rfq"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function TravelCarPage() {
  return (
    <main className="bg-warm text-navy">
      <Header />

      <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate">
            <Link className="font-semibold text-navy hover:text-forest" href="/products">
              Products
            </Link>
            <span>/</span>
            <span>Travel & Car</span>
          </div>

          <div className="grid gap-5 border-b border-navy/10 pb-7 lg:grid-cols-[0.72fr_1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-forest">
                Travel & Car
              </p>
                <h1 className="text-4xl font-semibold tracking-tight text-navy sm:text-[3.4rem]">
                Travel & Car
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate">
                Carriers, restraints, hydration and comfort products for pet travel.
              </p>
            </div>
            <div className="relative aspect-[16/7.5] overflow-hidden bg-mist lg:aspect-[16/5.8]">
              <Image
                alt="Cat travel carrier and pet road-trip product scene"
                className="h-full w-full object-cover object-[56%_center]"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                src="/trovane-category-travel-cat.jpg"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                className={`min-h-11 rounded-full border px-4 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  filter === "All"
                    ? "border-forest bg-forest text-white"
                    : "border-navy/12 bg-warm text-navy/74 hover:border-forest"
                }`}
                key={filter}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 lg:grid-cols-3">
            {products.map((product) => (
              <Link className="group" href={product.href} key={product.name}>
                <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    alt={`${product.name} TROVANE product`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    src={product.image}
                    unoptimized
                  />
                </div>
                <div className="flex min-h-[150px] flex-col pt-4 sm:min-h-[166px]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-forest sm:text-xs">
                    {product.category}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-navy sm:text-2xl">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate">{product.audience}</p>
                  <span className="mt-auto inline-flex pt-4 text-xs font-bold uppercase tracking-[0.08em] text-navy transition group-hover:text-forest sm:text-sm">
                    View Product -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
