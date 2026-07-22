import * as AstronomyEngine from "astronomy-engine";
import {
  constellationLabels,
  constellationLineCatalog,
  majorBrightStarIds,
  milkyWayCatalog,
  skyCatalogSource,
  starCatalog,
} from "@/lib/sky/catalog";
import type { MomentConfig } from "@/lib/sky/moment";

type AstronomyModule = typeof AstronomyEngine & {
  MakeTime?: (date: Date) => unknown;
  Body?: Record<string, unknown>;
  Observer?: new (latitude: number, longitude: number, height: number) => unknown;
  Equator?: (
    body: unknown,
    time: unknown,
    observer: unknown,
    ofDate: boolean,
    aberration: boolean,
  ) => { ra: number; dec: number };
  Horizon?: (
    time: unknown,
    observer: unknown,
    ra: number,
    dec: number,
    refraction: string,
  ) => { altitude: number; azimuth: number };
  MoonPhase?: (time: unknown) => number;
};

export type ProjectedPoint = {
  altitude: number;
  azimuth: number;
  x: number;
  y: number;
  aboveHorizon: boolean;
};

export type SkyStar = ProjectedPoint & {
  id: string;
  name: string;
  constellation?: string;
  magnitude: number;
  major: boolean;
};

export type SkyBody = ProjectedPoint & {
  body: "Sun" | "Moon" | "Mercury" | "Venus" | "Mars" | "Jupiter" | "Saturn";
  magnitudeHint: "solar" | "lunar" | "planet";
};

export type SkyConstellationLine = {
  constellation: string;
  segments: ProjectedPoint[][];
};

export type SkyConstellationLabel = ProjectedPoint & {
  id: string;
  name: string;
  rank: number;
};

export type SkyMilkyWay = {
  mode: "astronomical-data-layer";
  note: string;
  polygons: ProjectedPoint[][];
};

export type SkyVisibility = {
  sunAltitude: number;
  skyCondition:
    | "daylight"
    | "civil-twilight"
    | "nautical-twilight"
    | "astronomical-twilight"
    | "night";
  nakedEyeStarVisibility:
    | "not-visible-in-daylight"
    | "limited-by-twilight"
    | "dark-sky-possible";
  statement: string;
};

export type SkyComputation = {
  generatedAt: string;
  utcInstant: string;
  localDate: string;
  localTime: string;
  timeAccuracy: MomentConfig["timeAccuracy"];
  placeName: string;
  country: string;
  timezone: string;
  latitude: number;
  longitude: number;
  moonPhaseDegrees: number;
  moonIllumination: number;
  stars: SkyStar[];
  majorStars: SkyStar[];
  bodies: SkyBody[];
  constellationLines: SkyConstellationLine[];
  constellationLabels: SkyConstellationLabel[];
  milkyWay: SkyMilkyWay;
  visibility: SkyVisibility;
  catalog: {
    source: typeof skyCatalogSource;
    starCount: number;
    renderedStarCount: number;
    constellationLineCount: number;
    constellationLabelCount: number;
  };
  notes: string[];
};

const astronomy = AstronomyEngine as AstronomyModule;

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function julianDate(date: Date) {
  return date.getTime() / 86400000 + 2440587.5;
}

function greenwichSiderealDegrees(date: Date) {
  const jd = julianDate(date);
  const d = jd - 2451545.0;
  const t = d / 36525;
  return normalizeDegrees(
    280.46061837 +
      360.98564736629 * d +
      0.000387933 * t * t -
      (t * t * t) / 38710000,
  );
}

function equatorialToHorizontal(
  date: Date,
  latitude: number,
  longitude: number,
  raDegrees: number,
  decDegrees: number,
) {
  const lat = (latitude * Math.PI) / 180;
  const dec = (decDegrees * Math.PI) / 180;
  const lst = normalizeDegrees(greenwichSiderealDegrees(date) + longitude);
  const hourAngle = (normalizeDegrees(lst - raDegrees) * Math.PI) / 180;

  const sinAlt =
    Math.sin(dec) * Math.sin(lat) +
    Math.cos(dec) * Math.cos(lat) * Math.cos(hourAngle);
  const altitude = (Math.asin(sinAlt) * 180) / Math.PI;

  const azimuth = normalizeDegrees(
    (Math.atan2(
      -Math.sin(hourAngle),
      Math.tan(dec) * Math.cos(lat) - Math.sin(lat) * Math.cos(hourAngle),
    ) *
      180) /
      Math.PI,
  );

  return { altitude, azimuth };
}

export function projectHorizon(altitude: number, azimuth: number): ProjectedPoint {
  const radius = Math.min(1.08, (90 - altitude) / 90);
  const angle = (azimuth - 180) * (Math.PI / 180);
  return {
    altitude: Number(altitude.toFixed(2)),
    azimuth: Number(azimuth.toFixed(2)),
    x: Number((0.5 + Math.sin(angle) * radius * 0.5).toFixed(5)),
    y: Number((0.5 + Math.cos(angle) * radius * 0.5).toFixed(5)),
    aboveHorizon: altitude >= 0,
  };
}

function computeSolarSystemBodies(config: MomentConfig, utcDate: Date) {
  if (
    !astronomy.MakeTime ||
    !astronomy.Observer ||
    !astronomy.Equator ||
    !astronomy.Horizon ||
    !astronomy.Body
  ) {
    throw new Error("astronomy-engine did not expose the expected API.");
  }

  const time = astronomy.MakeTime(utcDate);
  const observer = new astronomy.Observer(config.latitude, config.longitude, 0);
  const bodyNames: SkyBody["body"][] = [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
  ];

  return bodyNames.map((bodyName) => {
    const body = astronomy.Body?.[bodyName];
    const equator = astronomy.Equator?.(body, time, observer, true, true);
    const horizon = astronomy.Horizon?.(
      time,
      observer,
      equator.ra,
      equator.dec,
      "normal",
    );

    return {
      body: bodyName,
      ...projectHorizon(horizon.altitude, horizon.azimuth),
      magnitudeHint:
        bodyName === "Sun" ? "solar" : bodyName === "Moon" ? "lunar" : "planet",
    } satisfies SkyBody;
  });
}

function moonIlluminationFromPhase(phaseDegrees: number) {
  return Number(((1 - Math.cos((phaseDegrees * Math.PI) / 180)) / 2).toFixed(3));
}

function visibilityFromSun(sunAltitude: number): SkyVisibility {
  if (sunAltitude >= 0) {
    return {
      sunAltitude,
      skyCondition: "daylight",
      nakedEyeStarVisibility: "not-visible-in-daylight",
      statement:
        "The celestial arrangement is astronomically real, but most stars would not be visible to the naked eye in daylight.",
    };
  }

  if (sunAltitude >= -6) {
    return {
      sunAltitude,
      skyCondition: "civil-twilight",
      nakedEyeStarVisibility: "limited-by-twilight",
      statement:
        "The sky was in civil twilight, so naked-eye star visibility would be limited.",
    };
  }

  if (sunAltitude >= -12) {
    return {
      sunAltitude,
      skyCondition: "nautical-twilight",
      nakedEyeStarVisibility: "limited-by-twilight",
      statement:
        "The sky was in nautical twilight; bright stars may be visible, but the full star field is a celestial arrangement layer.",
    };
  }

  if (sunAltitude >= -18) {
    return {
      sunAltitude,
      skyCondition: "astronomical-twilight",
      nakedEyeStarVisibility: "limited-by-twilight",
      statement:
        "The sky was near astronomical darkness; visibility still depends on weather and light pollution.",
    };
  }

  return {
    sunAltitude,
    skyCondition: "night",
    nakedEyeStarVisibility: "dark-sky-possible",
    statement:
      "The sky was astronomically dark enough for stars, though real visibility still depends on weather and local light pollution.",
  };
}

function computeStars(config: MomentConfig, utcDate: Date) {
  return starCatalog.map((star): SkyStar => {
    const horizontal = equatorialToHorizontal(
      utcDate,
      config.latitude,
      config.longitude,
      star.raDegrees,
      star.decDegrees,
    );

    return {
      id: star.id,
      name: star.name,
      constellation: star.constellation,
      magnitude: star.magnitude,
      major: majorBrightStarIds.has(star.id),
      ...projectHorizon(horizontal.altitude, horizontal.azimuth),
    };
  });
}

function computeConstellationLines(config: MomentConfig, utcDate: Date) {
  return constellationLineCatalog.map((line): SkyConstellationLine => ({
    constellation: line.constellation,
    segments: line.lines.map((segment) =>
      segment.map(([raDegrees, decDegrees]) => {
        const horizontal = equatorialToHorizontal(
          utcDate,
          config.latitude,
          config.longitude,
          raDegrees,
          decDegrees,
        );

        return projectHorizon(horizontal.altitude, horizontal.azimuth);
      }),
    ),
  }));
}

function computeConstellationLabels(config: MomentConfig, utcDate: Date) {
  return constellationLabels.map((label): SkyConstellationLabel => {
    const horizontal = equatorialToHorizontal(
      utcDate,
      config.latitude,
      config.longitude,
      label.raDegrees,
      label.decDegrees,
    );

    return {
      id: label.id,
      name: label.name,
      rank: label.rank,
      ...projectHorizon(horizontal.altitude, horizontal.azimuth),
    };
  });
}

function computeMilkyWay(config: MomentConfig, utcDate: Date): SkyMilkyWay {
  const polygons = milkyWayCatalog.slice(0, 8).map((polygon) =>
    polygon.rings[0].slice(0, 220).map(([raDegrees, decDegrees]) => {
      const horizontal = equatorialToHorizontal(
        utcDate,
        config.latitude,
        config.longitude,
        raDegrees,
        decDegrees,
      );

      return projectHorizon(horizontal.altitude, horizontal.azimuth);
    }),
  );

  return {
    mode: "astronomical-data-layer",
    note:
      "Milky Way geometry uses the d3-celestial Milky Way coordinate dataset transformed into the observer horizon. It is rendered subtly as an astronomical data layer, not as a random decorative band.",
    polygons,
  };
}

export function computeSky(config: MomentConfig): SkyComputation {
  const utcDate = new Date(config.utcInstant);
  const stars = computeStars(config, utcDate);
  const bodies = computeSolarSystemBodies(config, utcDate);
  const time = astronomy.MakeTime?.(utcDate) ?? utcDate;
  const moonPhaseDegrees = astronomy.MoonPhase
    ? Number(astronomy.MoonPhase(time).toFixed(2))
    : NaN;
  const sun = bodies.find((body) => body.body === "Sun");
  const visibleForPoster = stars
    .filter((star) => star.aboveHorizon && star.magnitude <= 6)
    .sort((a, b) => a.magnitude - b.magnitude);

  return {
    generatedAt: new Date().toISOString(),
    utcInstant: config.utcInstant,
    localDate: config.localDate,
    localTime: config.localTime,
    timeAccuracy: config.timeAccuracy,
    placeName: config.placeName,
    country: config.country,
    timezone: config.timezone,
    latitude: config.latitude,
    longitude: config.longitude,
    moonPhaseDegrees,
    moonIllumination: moonIlluminationFromPhase(moonPhaseDegrees),
    stars: visibleForPoster,
    majorStars: visibleForPoster.filter((star) => star.major).slice(0, 32),
    bodies,
    constellationLines: computeConstellationLines(config, utcDate),
    constellationLabels: computeConstellationLabels(config, utcDate),
    milkyWay: computeMilkyWay(config, utcDate),
    visibility: visibilityFromSun(sun?.altitude ?? 90),
    catalog: {
      source: skyCatalogSource,
      starCount: starCatalog.length,
      renderedStarCount: visibleForPoster.length,
      constellationLineCount: constellationLineCatalog.length,
      constellationLabelCount: constellationLabels.length,
    },
    notes: [
      "Stars remain part of the celestial arrangement even when the moment occurs in daylight.",
      "Naked-eye visibility is represented separately from astronomical position.",
      "Cosmic Discovery and rarity are intentionally not included until event detectors are implemented.",
    ],
  };
}
