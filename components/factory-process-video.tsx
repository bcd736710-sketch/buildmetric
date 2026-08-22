"use client";

import { useEffect, useRef, useState } from "react";

export function FactoryProcessVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasLoadedVideoFrame, setHasLoadedVideoFrame] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires these media properties before an explicit muted play attempt.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const startPlayback = () => {
      void video.play().catch(() => {
        // iOS may block autoplay in Low Power Mode. The first loaded frame remains visible.
      });
    };

    startPlayback();
    video.addEventListener("canplay", startPlayback);

    return () => video.removeEventListener("canplay", startPlayback);
  }, []);

  return <div className="mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-mist shadow-[0_12px_30px_rgba(0,32,63,0.14)] sm:max-w-[360px]">
    <video aria-label="TROVANE manufacturing process" autoPlay className="h-full w-full object-contain" loop muted onLoadedData={() => setHasLoadedVideoFrame(true)} playsInline poster={hasLoadedVideoFrame ? undefined : "/images/factory-poster.jpg"} preload="metadata" ref={videoRef} src="/videos/factory.mp4" />
  </div>;
}
