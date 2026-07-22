import { NextResponse } from "next/server";
import { computeSky } from "@/lib/sky/astronomy";
import { defaultMomentConfig } from "@/lib/sky/moment";

export const runtime = "nodejs";

const verificationToken = "sky-rendering-check";

export function GET(request: Request) {
  const url = new URL(request.url);
  if (
    process.env.NODE_ENV === "production" &&
    url.searchParams.get("verify") !== verificationToken
  ) {
    return new NextResponse(null, { status: 404 });
  }

  const sky = computeSky(defaultMomentConfig);

  return NextResponse.json({
    ok: true,
    input: defaultMomentConfig,
    sky,
    spike: {
      astronomyEngine: "loaded",
      visibleStarCount: sky.stars.length,
      solarSystemBodies: sky.bodies.map((body) => body.body),
      noFakeDiscovery: true,
    },
  });
}
