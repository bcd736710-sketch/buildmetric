import { NextResponse } from "next/server";
import { computeSky } from "@/lib/sky/astronomy";
import { createArtworkScene } from "@/lib/sky/artwork-scene";
import { createArtworkSvg } from "@/lib/sky/artwork-svg";
import { skyRegressionMoments } from "@/lib/sky/regression-moments";
import { renderPosterPng } from "@/lib/sky/poster-renderer";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const moments = skyRegressionMoments.map((moment) => {
    const sky = computeSky(moment.config);
    const scene = createArtworkScene(moment.config, sky);
    const svg = createArtworkSvg(scene);
    const png = renderPosterPng(svg);
    const moon = sky.bodies.find((body) => body.body === "Moon");

    return {
      id: moment.id,
      label: moment.label,
      style: moment.config.style,
      pngBytes: png.byteLength,
      stars: {
        computed: sky.catalog.renderedStarCount,
        artwork: scene.stars.length,
        brightest: scene.stars.filter((star) => star.tier === "brightest").length,
        medium: scene.stars.filter((star) => star.tier === "medium").length,
        faint: scene.stars.filter((star) => star.tier === "faint").length,
      },
      moon: moon
        ? {
            x: moon.x,
            y: moon.y,
            phaseDegrees: sky.moonPhaseDegrees,
            illumination: sky.moonIllumination,
          }
        : null,
      milkyWayPolygons: sky.milkyWay.polygons.length,
      composition: scene.composition,
      previewAndExportRenderer: "shared ArtworkScene + createArtworkSvg",
    };
  });

  return NextResponse.json({ ok: true, moments });
}
