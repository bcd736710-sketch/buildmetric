import { NextRequest, NextResponse } from "next/server";
import { getPlaceProvider } from "@/lib/sky/geocoding";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < 3) {
    return NextResponse.json(
      { error: "Enter at least 3 characters before searching.", results: [] },
      { status: 400 },
    );
  }

  const limit = checkRateLimit(getClientKey(request, "place-search"), {
    limit: 8,
    windowMs: 60_000,
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Please wait a moment before searching again.", results: [] },
      {
        status: 429,
        headers: {
          "retry-after": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  try {
    const results = await getPlaceProvider().search(query);
    return NextResponse.json(
      { results },
      {
        headers: {
          "cache-control": "public, s-maxage=86400, stale-while-revalidate=604800",
          "x-ratelimit-remaining": String(limit.remaining),
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Place search is temporarily unavailable.", results: [] },
      { status: 502 },
    );
  }
}
