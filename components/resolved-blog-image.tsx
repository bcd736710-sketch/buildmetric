"use client";

import Image from "next/image";
import { useState } from "react";
import { defaultBlogImage } from "@/lib/blog/blog-image-defaults";

type Props = {
  alt: string;
  className: string;
  fallbackSrc: string;
  priority?: boolean;
  sizes: string;
  src: string;
};

export function ResolvedBlogImage({
  alt,
  className,
  fallbackSrc,
  priority,
  sizes,
  src,
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);

  function useFallback() {
    setCurrentSrc((current) => {
      if (current !== fallbackSrc) return fallbackSrc;
      return current !== defaultBlogImage ? defaultBlogImage : current;
    });
  }

  return (
    <Image
      alt={alt}
      className={className}
      fill
      onError={useFallback}
      priority={priority}
      sizes={sizes}
      src={currentSrc}
      unoptimized
    />
  );
}
