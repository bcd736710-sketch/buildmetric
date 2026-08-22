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
      <div>
        <div className="relative aspect-[1/1.04] overflow-hidden bg-[#f2f3f1] sm:aspect-[1.04/1]">
          <Image
            alt={activeImage.alt}
            className="h-full w-full object-contain p-6 sm:p-10 lg:p-14"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            src={activeImage.src}
            unoptimized
          />
        </div>
        {images.length > 1 ? <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              aria-label={`Show product image ${index + 1}`}
              className={`relative aspect-square w-18 shrink-0 overflow-hidden border transition-colors sm:w-20 ${
                activeIndex === index ? "border-navy" : "border-navy/15 hover:border-forest"
              }`}
              key={image.src}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <Image
                alt=""
                className="h-full w-full object-cover"
                fill
                sizes="80px"
                src={image.src}
                unoptimized
              />
            </button>
          ))}
        </div> : null}
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
