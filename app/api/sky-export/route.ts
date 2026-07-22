import { NextRequest, NextResponse } from "next/server";
import { computeSky } from "@/lib/sky/astronomy";
import { createArtworkScene } from "@/lib/sky/artwork-scene";
import { createArtworkSvg } from "@/lib/sky/artwork-svg";
import { validateRenderRequest } from "@/lib/sky/moment-validation";
import {
  renderPosterPdf,
  renderPosterPng,
} from "@/lib/sky/poster-renderer";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

function toArrayBuffer(bytes: Uint8Array) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  return copy.buffer;
}

export async function GET() {
  return NextResponse.json(
    { error: "High-resolution artwork exports require POST." },
    { status: 405 },
  );
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(getClientKey(request, "sky-export"), {
    limit: 3,
    windowMs: 60_000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Please wait before rendering another high-resolution export." },
      {
        status: 429,
        headers: {
          "retry-after": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const renderRequest = validateRenderRequest(body);
    const sky = computeSky(renderRequest.moment);
    const scene = createArtworkScene(
      renderRequest.moment,
      sky,
      renderRequest.artworkType,
      renderRequest.output,
    );
    const png = renderPosterPng(createArtworkSvg(scene));

    if (renderRequest.format === "pdf") {
      const pdf = await renderPosterPdf(png);
      return new NextResponse(
        new Blob([toArrayBuffer(pdf)], { type: "application/pdf" }),
        {
          headers: {
            "content-type": "application/pdf",
            "cache-control": "no-store",
            "x-artwork-output": scene.output,
            "x-ratelimit-remaining": String(limit.remaining),
          },
        },
      );
    }

    return new NextResponse(new Blob([toArrayBuffer(png)], { type: "image/png" }), {
      headers: {
        "content-type": "image/png",
        "cache-control": "no-store",
        "x-artwork-output": scene.output,
        "x-ratelimit-remaining": String(limit.remaining),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid render request." },
      { status: 400 },
    );
  }
}
