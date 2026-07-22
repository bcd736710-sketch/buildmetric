import type { SkyBody, SkyComputation } from "@/lib/sky/astronomy";
import type { MomentConfig, SkyPosterStyle } from "@/lib/sky/moment";
import { posterStyles } from "@/lib/sky/moment";
import { skyProductConfig } from "@/lib/sky/product-config";

export type CosmicSignatureBody = {
  body: SkyBody["body"];
  azimuth: number;
  altitude: number;
  angle: number;
  radius: number;
  glyph: string;
  label: string;
  prominence: number;
};

export type CosmicSignatureAxis = {
  id: "north" | "east" | "south" | "west" | "zenith" | "sun-bearing";
  label: string;
  angle: number;
  radius: number;
  opacity: number;
};

export type CosmicSignatureStyleTokens = (typeof posterStyles)[SkyPosterStyle] & {
  id: SkyPosterStyle;
  plate: string;
  ink: string;
  fineLine: string;
  glow: string;
  moonLight: string;
  moonShadow: string;
  ringOpacity: number;
  textureOpacity: number;
};

export type CosmicSignatureScene = {
  type: "cosmic-signature";
  output: "a3-portrait-300dpi";
  config: MomentConfig;
  skyData: SkyComputation;
  style: CosmicSignatureStyleTokens;
  composition: {
    width: number;
    height: number;
    cx: number;
    cy: number;
    coreRadius: number;
    planetRing: number;
    orientationRing: number;
    identityRing: number;
  };
  moon: {
    phaseDegrees: number;
    illumination: number;
    phaseName: string;
    angle: number;
  };
  bodies: CosmicSignatureBody[];
  axes: CosmicSignatureAxis[];
  momentLine: string;
  placeLine: string;
  coordinateLine: string;
};

const glyphs: Record<SkyBody["body"], string> = {
  Sun: "SUN",
  Moon: "MOON",
  Mercury: "MER",
  Venus: "VEN",
  Mars: "MAR",
  Jupiter: "JUP",
  Saturn: "SAT",
};

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function styleTokens(styleId: SkyPosterStyle): CosmicSignatureStyleTokens {
  const style = posterStyles[styleId];

  if (styleId === "celestial-dream") {
    return {
      ...style,
      id: styleId,
      plate: "#0c1233",
      ink: "#eef2ff",
      fineLine: "#aebdff",
      glow: "rgba(151, 130, 205, 0.32)",
      moonLight: "#edf3ff",
      moonShadow: "#101334",
      ringOpacity: 0.28,
      textureOpacity: 0.12,
    };
  }

  if (styleId === "vintage-observatory") {
    return {
      ...style,
      id: styleId,
      plate: "#ead7ad",
      ink: "#2a241d",
      fineLine: "#7d512c",
      glow: "rgba(99, 67, 35, 0.12)",
      moonLight: "#f4dfb5",
      moonShadow: "#7b5634",
      ringOpacity: 0.58,
      textureOpacity: 0.32,
    };
  }

  return {
    ...style,
    id: styleId,
    plate: "#050711",
    ink: "#f7ecd2",
    fineLine: "#d7b36a",
    glow: "rgba(214, 176, 104, 0.22)",
    moonLight: "#f3d992",
    moonShadow: "#050711",
    ringOpacity: 0.48,
    textureOpacity: 0.09,
  };
}

function phaseName(degrees: number) {
  const value = normalizeDegrees(degrees);
  if (value < 22.5 || value >= 337.5) return "New Moon";
  if (value < 67.5) return "Waxing Crescent";
  if (value < 112.5) return "First Quarter";
  if (value < 157.5) return "Waxing Gibbous";
  if (value < 202.5) return "Full Moon";
  if (value < 247.5) return "Waning Gibbous";
  if (value < 292.5) return "Last Quarter";
  return "Waning Crescent";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function formatCoordinate(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(4)} ${value >= 0 ? positive : negative}`;
}

function bodyRadius(body: SkyBody) {
  const altitudeFactor = Math.max(0, Math.min(1, (body.altitude + 90) / 180));
  if (body.body === "Sun") return 642 + altitudeFactor * 104;
  if (body.body === "Mercury") return 820 + altitudeFactor * 84;
  if (body.body === "Venus") return 890 + altitudeFactor * 84;
  if (body.body === "Mars") return 958 + altitudeFactor * 84;
  if (body.body === "Jupiter") return 1028 + altitudeFactor * 84;
  if (body.body === "Saturn") return 1098 + altitudeFactor * 84;
  return 0;
}

function prepareBodies(skyData: SkyComputation): CosmicSignatureBody[] {
  return skyData.bodies
    .filter((body) => body.body !== "Moon")
    .map((body) => ({
      body: body.body,
      azimuth: body.azimuth,
      altitude: body.altitude,
      angle: normalizeDegrees(body.azimuth),
      radius: bodyRadius(body),
      glyph: glyphs[body.body],
      label: body.body,
      prominence: body.body === "Sun" ? 1 : body.aboveHorizon ? 0.82 : 0.56,
    }));
}

function prepareAxes(config: MomentConfig, skyData: SkyComputation): CosmicSignatureAxis[] {
  const sun = skyData.bodies.find((body) => body.body === "Sun");
  return [
    { id: "north", label: "N", angle: 0, radius: 1276, opacity: 0.9 },
    { id: "east", label: "E", angle: 90, radius: 1276, opacity: 0.72 },
    { id: "south", label: "S", angle: 180, radius: 1276, opacity: 0.9 },
    { id: "west", label: "W", angle: 270, radius: 1276, opacity: 0.72 },
    {
      id: "zenith",
      label: "Z",
      angle: normalizeDegrees(180 - config.latitude),
      radius: 1212,
      opacity: 0.5,
    },
    {
      id: "sun-bearing",
      label: "SOL",
      angle: sun?.azimuth ?? 0,
      radius: 1170,
      opacity: 0.42,
    },
  ];
}

export function createCosmicSignatureScene(
  config: MomentConfig,
  skyData: SkyComputation,
): CosmicSignatureScene {
  const moon = skyData.bodies.find((body) => body.body === "Moon");

  return {
    type: "cosmic-signature",
    output: "a3-portrait-300dpi",
    config: { ...config, productType: "cosmic-signature" },
    skyData,
    style: styleTokens(config.style),
    composition: {
      width: skyProductConfig.output.width,
      height: skyProductConfig.output.height,
      cx: skyProductConfig.output.width / 2,
      cy: 2208,
      coreRadius: 288,
      planetRing: 1034,
      orientationRing: 1294,
      identityRing: 1510,
    },
    moon: {
      phaseDegrees: skyData.moonPhaseDegrees,
      illumination: skyData.moonIllumination,
      phaseName: phaseName(skyData.moonPhaseDegrees),
      angle: moon?.azimuth ?? 0,
    },
    bodies: prepareBodies(skyData),
    axes: prepareAxes(config, skyData),
    momentLine: `${formatDate(config.localDate)} / ${config.localTime}`,
    placeLine: config.placeName,
    coordinateLine: `${formatCoordinate(config.latitude, "N", "S")} / ${formatCoordinate(
      config.longitude,
      "E",
      "W",
    )}`,
  };
}
