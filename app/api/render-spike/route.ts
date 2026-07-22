import { NextResponse } from "next/server";
import { computeSky } from "@/lib/sky/astronomy";
import { createArtworkScene } from "@/lib/sky/artwork-scene";
import { createArtworkSvg } from "@/lib/sky/artwork-svg";
import { defaultMomentConfig } from "@/lib/sky/moment";
import {
  renderPosterPdf,
  renderPosterPng,
} from "@/lib/sky/poster-renderer";

export const runtime = "nodejs";
export const maxDuration = 30;

function toArrayBuffer(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const sky = computeSky(defaultMomentConfig);
  const scene = createArtworkScene(defaultMomentConfig, sky);
  const svg = createArtworkSvg(scene);
  const png = renderPosterPng(svg);
  const pdf = await renderPosterPdf(png);

  return NextResponse.json({
    ok: true,
    devOnly: true,
    output: scene.output,
    pngBytes: png.byteLength,
    pdfBytes: pdf.byteLength,
    visibleStarCount: sky.stars.length,
    moonPhaseDegrees: sky.moonPhaseDegrees,
  });
}

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const sky = computeSky(defaultMomentConfig);
  const scene = createArtworkScene(defaultMomentConfig, sky);
  const svg = createArtworkSvg(scene);
  const png = renderPosterPng(svg);

  return new NextResponse(new Blob([toArrayBuffer(png)], { type: "image/png" }), {
    headers: {
      "content-type": "image/png",
      "cache-control": "no-store",
      "x-dev-only": "true",
    },
  });
}
