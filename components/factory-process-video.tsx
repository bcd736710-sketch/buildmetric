"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function FactoryProcessVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const retryTimerRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const [, setHasLoadedVideoFrame] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin: "240px 0px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires these media properties before an explicit muted play attempt.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startPlayback = () => {
      void video.play().then(() => {
        retryCountRef.current = 0;
        setHasLoadedVideoFrame(true);
      }).catch(() => {
        // Safari can reject the first muted play while it is preparing the media pipeline.
        if (retryCountRef.current >= 3) return;
        retryCountRef.current += 1;
        window.clearTimeout(retryTimerRef.current ?? undefined);
        retryTimerRef.current = window.setTimeout(startPlayback, retryCountRef.current * 300);
      });
    };

    const markVideoReady = () => setHasLoadedVideoFrame(true);
    const retryAfterError = () => {
      if (retryCountRef.current >= 3) return;
      retryCountRef.current += 1;
      window.clearTimeout(retryTimerRef.current ?? undefined);
      retryTimerRef.current = window.setTimeout(() => {
        video.load();
      }, retryCountRef.current * 300);
    };

    // Force Safari to request the already-rendered source instead of retaining its poster.
    video.load();
    video.addEventListener("loadedmetadata", startPlayback);
    video.addEventListener("loadeddata", startPlayback);
    video.addEventListener("canplay", startPlayback);
    video.addEventListener("playing", markVideoReady);
    video.addEventListener("error", retryAfterError);

    return () => {
      video.removeEventListener("loadedmetadata", startPlayback);
      video.removeEventListener("loadeddata", startPlayback);
      video.removeEventListener("canplay", startPlayback);
      video.removeEventListener("playing", markVideoReady);
      video.removeEventListener("error", retryAfterError);
      window.clearTimeout(retryTimerRef.current ?? undefined);
    };
  }, [shouldLoad]);

  return <div className="mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-mist shadow-[0_12px_30px_rgba(0,32,63,0.14)] sm:max-w-[360px]" ref={containerRef}>
    {shouldLoad ? <video aria-label="Pet product production process at a manufacturing partner workshop" autoPlay className="h-full w-full object-contain" loop muted onLoadedData={() => setHasLoadedVideoFrame(true)} onPlaying={() => setHasLoadedVideoFrame(true)} playsInline preload="metadata" ref={videoRef} src="/videos/factory.mp4" /> : <div className="relative h-full w-full"><Image alt="Partner production process video loads when near view" className="h-full w-full object-cover object-center" fill loading="lazy" sizes="(min-width: 640px) 360px, 320px" src="/images/factory-poster.jpg" /></div>}
  </div>;
}
