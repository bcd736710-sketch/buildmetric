"use client";

import { useEffect, useRef, useState } from "react";

export function FactoryProcessVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const retryTimerRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
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
  }, []);

  return <div className="mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-[20px] bg-mist shadow-[0_12px_30px_rgba(0,32,63,0.14)] sm:max-w-[360px]">
    <video aria-label="TROVANE manufacturing process" autoPlay className="h-full w-full object-contain" loop muted onLoadedData={() => setHasLoadedVideoFrame(true)} onPlaying={() => setHasLoadedVideoFrame(true)} playsInline poster={hasLoadedVideoFrame ? undefined : "/images/factory-poster.jpg"} preload="metadata" ref={videoRef} src="/videos/factory.mp4" />
  </div>;
}
