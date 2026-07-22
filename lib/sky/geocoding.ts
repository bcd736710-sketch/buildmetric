import tzLookup from "tz-lookup";

export type PlaceSearchResult = {
  placeName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  provider: "nominatim";
};

export type PlaceProvider = {
  id: PlaceSearchResult["provider"];
  search(query: string): Promise<PlaceSearchResult[]>;
};

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

const cache = new Map<string, { expiresAt: number; results: PlaceSearchResult[] }>();
let lastNominatimRequestAt = 0;

const cacheTtlMs = 24 * 60 * 60 * 1000;
const minRequestSpacingMs = 1100;

function normalizeQuery(query: string) {
  return query.trim().replace(/\s+/g, " ").slice(0, 96);
}

function cacheKey(query: string) {
  return query.toLocaleLowerCase("en-US");
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function throttleNominatim() {
  const elapsed = Date.now() - lastNominatimRequestAt;
  if (elapsed < minRequestSpacingMs) {
    await wait(minRequestSpacingMs - elapsed);
  }
  lastNominatimRequestAt = Date.now();
}

export const nominatimProvider: PlaceProvider = {
  id: "nominatim",
  async search(rawQuery: string) {
    const query = normalizeQuery(rawQuery);
    const key = cacheKey(query);
    const cached = cache.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.results;
    }

    await throttleNominatim();

    const endpoint = new URL("https://nominatim.openstreetmap.org/search");
    endpoint.searchParams.set("q", query);
    endpoint.searchParams.set("format", "jsonv2");
    endpoint.searchParams.set("addressdetails", "1");
    endpoint.searchParams.set("limit", "5");

    const response = await fetch(endpoint, {
      headers: {
        "accept-language": "en",
        "user-agent":
          "TheSkyRemembers/1.0 (https://buildmetriccalc.com; contact: qg231024@outlook.com)",
      },
      next: {
        revalidate: 86400,
      },
    });

    if (!response.ok) {
      throw new Error("Nominatim place search failed.");
    }

    const data = (await response.json()) as NominatimResult[];
    const results = data
      .map((item): PlaceSearchResult | null => {
        const latitude = Number(item.lat);
        const longitude = Number(item.lon);
        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

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
          provider: "nominatim",
        };
      })
      .filter((result): result is PlaceSearchResult => result !== null);

    cache.set(key, { expiresAt: Date.now() + cacheTtlMs, results });
    return results;
  },
};

export function getPlaceProvider(): PlaceProvider {
  return nominatimProvider;
}
