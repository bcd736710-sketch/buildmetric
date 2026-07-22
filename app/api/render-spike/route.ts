import { NextRequest, NextResponse } from "next/server";
import { computeSky } from "@/lib/sky/astronomy";
import { defaultMomentConfig } from "@/lib/sky/moment";
import {
  createPosterSvg,
  renderPosterPdf,
  renderPosterPng,
} from "@/lib/sky/poster-renderer";
import { skyProductConfig } from "@/lib/sky/product-config";

export const runtime = "nodejs";
export const maxDuration = 30;

const verificationToken = "sky-rendering-check";

function toArrayBuffer(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

export async function GET(request: NextRequest) {
  if (
    process.env.NODE_ENV === "production" &&
    request.nextUrl.searchParams.get("verify") !== verificationToken
  ) {
    return new NextResponse(null, { status: 404 });
  }

  const startedAt = performance.now();
  const format = request.nextUrl.searchParams.get("format") ?? "json";
  const sky = computeSky(defaultMomentConfig);
  const svg = createPosterSvg(defaultMomentConfig, sky);
  const png = renderPosterPng(svg);
  const renderMs = Math.round(performance.now() - startedAt);

  if (format === "png") {
    return new NextResponse(
      new Blob([toArrayBuffer(png)], { type: "image/png" }),
      {
        headers: {
          "content-type": "image/png",
          "cache-control": "no-store",
          "x-render-ms": String(renderMs),
          "x-file-bytes": String(png.byteLength),
        },
      },
    );
  }

  if (format === "pdf") {
    const pdf = await renderPosterPdf(png);
    const totalMs = Math.round(performance.now() - startedAt);

    return new NextResponse(
      new Blob([toArrayBuffer(pdf)], { type: "application/pdf" }),
      {
        headers: {
          "content-type": "application/pdf",
          "cache-control": "no-store",
          "x-render-ms": String(totalMs),
          "x-file-bytes": String(pdf.byteLength),
        },
      },
    );
  }

  return NextResponse.json({
    ok: true,
    output: skyProductConfig.output,
    pngBytes: png.byteLength,
    renderMs,
    fontLoading: "fontFiles",
    runtime,
    visibleStarCount: sky.stars.length,
    moonPhaseDegrees: sky.moonPhaseDegrees,
    sampleBodies: sky.bodies,
  });
}
