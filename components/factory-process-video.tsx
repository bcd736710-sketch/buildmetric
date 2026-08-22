"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function FactoryProcessVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "240px 0px" });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} className="relative aspect-video overflow-hidden rounded-[24px] bg-navy shadow-[0_18px_44px_rgba(0,32,63,0.16)] sm:rounded-[28px]">
    <Image alt="Pet outdoor product craftsmanship at TROVANE" className="absolute inset-0 h-full w-full object-cover opacity-80" fill loading="lazy" sizes="(min-width: 1024px) 52vw, 100vw" src="/trovane-hero-camper-harness-pets.jpg" unoptimized />
    <div className="absolute inset-0 bg-navy/20" />
    {shouldLoad && !hasVideoError ? <video aria-label="TROVANE manufacturing process" autoPlay className="absolute inset-0 h-full w-full object-contain" loop muted onError={() => setHasVideoError(true)} playsInline poster="/images/factory-poster.jpg" preload="metadata" src="/videos/factory.mp4" /> : null}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(0,32,63,0.58))] px-5 pb-4 pt-14 sm:px-6 sm:pb-5"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">Manufacturing in motion</p></div>
  </div>;
}
