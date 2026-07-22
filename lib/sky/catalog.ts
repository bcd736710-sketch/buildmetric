import stars6 from "d3-celestial/data/stars.6.json";
import starNames from "d3-celestial/data/starnames.json";
import constellationLines from "d3-celestial/data/constellations.lines.json";
import constellations from "d3-celestial/data/constellations.json";
import milkyWay from "d3-celestial/data/milkyway.json";

type GeoPointFeature = {
  id: number | string;
  properties: Record<string, unknown>;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
};

type GeoLineFeature = {
  id: string;
  properties?: Record<string, string | number | undefined>;
  geometry: {
    type: "MultiLineString";
    coordinates: [number, number][][];
  };
};

type GeoPolygonFeature = {
  id: string;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};

type StarNames = Record<
  string,
  {
    name?: string;
    desig?: string;
    bayer?: string;
    flam?: string;
    c?: string;
  }
>;

export type CatalogStar = {
  id: string;
  name: string;
  constellation?: string;
  raDegrees: number;
  decDegrees: number;
  magnitude: number;
};

export type CatalogLine = {
  constellation: string;
  lines: [number, number][][];
};

export type CatalogLabel = {
  id: string;
  name: string;
  raDegrees: number;
  decDegrees: number;
  rank: number;
};

export type MilkyWayPolygon = {
  id: string;
  rings: [number, number][][];
};

const names = starNames as StarNames;

export const skyCatalogSource = {
  package: "d3-celestial",
  starFile: "stars.6.json",
  constellationLineFile: "constellations.lines.json",
  constellationLabelFile: "constellations.json",
  milkyWayFile: "milkyway.json",
  note: "Data is used as catalog input; rendering is custom and driven by Moment Config.",
};

export const starCatalog: CatalogStar[] = (stars6.features as unknown as GeoPointFeature[])
  .map((feature) => {
    const nameEntry = names[String(feature.id)] ?? {};
    const magnitude = Number(feature.properties.mag);
    const [raDegrees, decDegrees] = feature.geometry.coordinates;
    const fallbackName = nameEntry.desig
      ? `${nameEntry.desig} ${nameEntry.c ?? ""}`.trim()
      : `HIP ${feature.id}`;

    return {
      id: String(feature.id),
      name: nameEntry.name || fallbackName,
      constellation: nameEntry.c,
      raDegrees,
      decDegrees,
      magnitude,
    };
  })
  .filter((star) => Number.isFinite(star.magnitude))
  .sort((a, b) => a.magnitude - b.magnitude);

export const majorBrightStarIds = new Set(
  starCatalog.slice(0, 90).map((star) => star.id),
);

export const constellationLineCatalog: CatalogLine[] = (
  constellationLines.features as unknown as GeoLineFeature[]
).map((feature) => ({
  constellation: feature.id,
  lines: feature.geometry.coordinates,
}));

export const constellationLabels: CatalogLabel[] = (
  constellations.features as unknown as GeoPointFeature[]
)
  .map((feature) => ({
    id: String(feature.id),
    name: String(feature.properties.name ?? feature.id),
    raDegrees: feature.geometry.coordinates[0],
    decDegrees: feature.geometry.coordinates[1],
    rank: Number(feature.properties.rank ?? 3),
  }))
  .sort((a, b) => a.rank - b.rank);

function normalizeMilkyWayFeature(feature: GeoPolygonFeature): MilkyWayPolygon {
  if (feature.geometry.type === "Polygon") {
    return {
      id: feature.id,
      rings: feature.geometry.coordinates as [number, number][][],
    };
  }

  return {
    id: feature.id,
    rings: (feature.geometry.coordinates as [number, number][][][]).flat(),
  };
}

export const milkyWayCatalog: MilkyWayPolygon[] = (
  milkyWay.features as GeoPolygonFeature[]
).map(normalizeMilkyWayFeature);
