"use client";

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

  return <div ref={containerRef} className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[20px] shadow-[0_12px_30px_rgba(0,32,63,0.14)] sm:max-w-[360px]">
    <div className="aspect-[9/16]">
      {shouldLoad && !hasVideoError ? <video aria-label="TROVANE manufacturing process" autoPlay className="h-full w-full object-contain" loop muted onError={() => setHasVideoError(true)} playsInline poster="/images/factory-poster.jpg" preload="metadata" src="/videos/factory.mp4" /> : null}
      {hasVideoError ? <div className="flex h-full items-center justify-center bg-mist px-6 text-center text-sm text-navy/65">Production video is currently unavailable.</div> : null}
    </div>
  </div>;
}
