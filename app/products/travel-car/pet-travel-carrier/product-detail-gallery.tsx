"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
};

export function ProductDetailGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="min-w-0">
      <div className="hidden lg:block">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <Image
            alt={activeImage.alt}
            className="h-full w-full object-cover"
            fill
            priority
            sizes="60vw"
            src={activeImage.src}
            unoptimized
          />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              aria-label={`Show product image ${index + 1}`}
              className={`relative aspect-square overflow-hidden border transition ${
                activeIndex === index ? "border-forest" : "border-navy/10 hover:border-navy/35"
              }`}
              key={image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                sizes="14vw"
                src={image.src}
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full snap-x gap-3 overflow-x-auto pb-2 lg:hidden">
        {images.map((image, index) => (
          <div
            className="relative aspect-[4/4.55] w-full shrink-0 snap-center overflow-hidden bg-mist"
            key={image.src}
          >
            <Image
              alt={image.alt}
              className="h-full w-full object-cover"
              fill
              priority={index === 0}
              sizes="100vw"
              src={image.src}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductAccordions({
  sections,
}: {
  sections: Array<{ title: string; items: string[] }>;
}) {
  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10 lg:hidden">
      {sections.map((section, index) => (
        <details className="group py-4" key={section.title} open={index === 0}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold uppercase tracking-[0.12em] text-navy">
            {section.title}
            <span className="inline-flex h-6 w-6 items-center justify-center text-xl leading-none text-forest group-open:hidden">
              +
            </span>
            <span className="hidden h-6 w-6 items-center justify-center text-2xl leading-none text-forest group-open:inline-flex">
              -
            </span>
          </summary>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
