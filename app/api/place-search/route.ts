import { NextRequest, NextResponse } from "next/server";
import tzLookup from "tz-lookup";

export const runtime = "nodejs";

type NominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    country?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
  };
};

export type PlaceSearchResult = {
  placeName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const endpoint = new URL("https://nominatim.openstreetmap.org/search");
  endpoint.searchParams.set("q", query);
  endpoint.searchParams.set("format", "jsonv2");
  endpoint.searchParams.set("addressdetails", "1");
  endpoint.searchParams.set("limit", "5");

  const response = await fetch(endpoint, {
    headers: {
      "accept-language": "en",
      "user-agent": "TheSkyRemembers/1.0 (bcd736710@gmail.com)",
    },
    next: {
      revalidate: 86400,
    },
  }).catch(() => null);

  if (!response?.ok) {
    return NextResponse.json(
      { error: "Place search is temporarily unavailable." },
      { status: 502 },
    );
  }

  const data = (await response.json()) as NominatimResult[];
  const results = data.map((item): PlaceSearchResult => {
    const latitude = Number(item.lat);
    const longitude = Number(item.lon);
    const address = item.address ?? {};
    const locality =
      address.city ?? address.town ?? address.village ?? address.state;

    return {
      placeName: locality
        ? `${locality}, ${address.country ?? item.display_name}`
        : item.display_name,
      country: address.country ?? "",
      latitude,
      longitude,
      timezone: tzLookup(latitude, longitude),
    };
  });

  return NextResponse.json({ results });
}
