import type {
  SkyBody,
  SkyComputation,
  SkyConstellationLabel,
  SkyStar,
} from "@/lib/sky/astronomy";
import type { MomentConfig, SkyPosterStyle } from "@/lib/sky/moment";
import { posterStyles } from "@/lib/sky/moment";
import { skyProductConfig } from "@/lib/sky/product-config";

export type ArtworkType = "your-sky" | "cosmic-signature";

export type ArtworkOutputSpec = "a3-portrait-300dpi";

export type ArtworkComposition = {
  width: number;
  height: number;
  sky: {
    cx: number;
    cy: number;
    r: number;
  };
  text: {
    titleY: number;
    messageY: number;
    momentY: number;
    detailsY: number;
    brandY: number;
  };
};

export type ArtworkStyleTokens = (typeof posterStyles)[SkyPosterStyle] & {
  id: SkyPosterStyle;
  starHalo: string;
  deepTone: string;
  textAccent: string;
  frameOpacity: number;
  constellationOpacity: number;
  labelOpacity: number;
  milkyWayOpacity: number;
  paperOpacity: number;
};

export type ArtworkStar = SkyStar & {
  tier: "brightest" | "medium" | "faint";
  radius: number;
  opacity: number;
  glowOpacity: number;
};

export type ArtworkBody = SkyBody & {
  display: "featured-moon" | "featured-planet" | "subtle-marker";
  radius: number;
  label: string;
};

export type ArtworkScene = {
  type: "your-sky";
  output: ArtworkOutputSpec;
  config: MomentConfig;
  skyData: SkyComputation;
  style: ArtworkStyleTokens;
  composition: ArtworkComposition;
  stars: ArtworkStar[];
  bodies: ArtworkBody[];
  labels: SkyConstellationLabel[];
  moonLabel: string;
  momentLine: string;
  coordinateLine: string;
};

export const supportedArtworkTypes: ArtworkType[] = ["your-sky", "cosmic-signature"];
export const supportedOutputSpecs: ArtworkOutputSpec[] = ["a3-portrait-300dpi"];

const composition: ArtworkComposition = {
  width: skyProductConfig.output.width,
  height: skyProductConfig.output.height,
  sky: {
    cx: skyProductConfig.output.width / 2,
    cy: 1970,
    r: 1272,
  },
  text: {
    titleY: 3750,
    messageY: 3912,
    momentY: 4076,
    detailsY: 4180,
    brandY: 4660,
  },
};

function styleTokens(styleId: SkyPosterStyle): ArtworkStyleTokens {
  const style = posterStyles[styleId];

  if (styleId === "celestial-dream") {
    return {
      ...style,
      id: styleId,
      starHalo: "rgba(180, 205, 255, 0.42)",
      deepTone: "#07081d",
      textAccent: "#d8ddff",
      frameOpacity: 0.38,
      constellationOpacity: 0.12,
      labelOpacity: 0.18,
      milkyWayOpacity: 0.2,
      paperOpacity: 0.18,
    };
  }

  if (styleId === "vintage-observatory") {
    return {
      ...style,
      id: styleId,
      starHalo: "rgba(92, 60, 32, 0.18)",
      deepTone: "#e7d7b8",
      textAccent: "#4f351f",
      frameOpacity: 0.72,
      constellationOpacity: 0.28,
      labelOpacity: 0.34,
      milkyWayOpacity: 0.13,
      paperOpacity: 0.34,
    };
  }

  return {
    ...style,
    id: styleId,
    starHalo: "rgba(221, 190, 128, 0.28)",
    deepTone: "#02030a",
    textAccent: "#e7c982",
    frameOpacity: 0.58,
    constellationOpacity: 0.12,
    labelOpacity: 0.17,
    milkyWayOpacity: 0.16,
    paperOpacity: 0.12,
  };
}

function starTier(star: SkyStar): ArtworkStar["tier"] {
  if (star.major || star.magnitude <= 1.2) return "brightest";
  if (star.magnitude <= 3.4) return "medium";
  return "faint";
}

function prepareStars(stars: SkyStar[], styleId: SkyPosterStyle): ArtworkStar[] {
  return stars
    .filter((star) => star.aboveHorizon && star.x >= -0.05 && star.x <= 1.05 && star.y >= -0.05 && star.y <= 1.05)
    .slice(0, 1500)
    .map((star) => {
      const tier = starTier(star);
      const vintage = styleId === "vintage-observatory";
      const baseRadius =
        tier === "brightest"
          ? vintage
            ? 7.6 - star.magnitude * 0.7
            : 8.7 - star.magnitude * 0.72
          : tier === "medium"
            ? vintage
              ? 3.8 - star.magnitude * 0.26
              : 4.5 - star.magnitude * 0.34
            : vintage
              ? 1.45 - Math.max(0, star.magnitude - 4.5) * 0.1
              : 1.75 - Math.max(0, star.magnitude - 4.5) * 0.13;
      const opacity =
        tier === "brightest"
          ? vintage
            ? 0.84
            : styleId === "midnight-gold"
              ? 0.96
              : 0.9
          : tier === "medium"
            ? vintage
              ? 0.55
              : styleId === "midnight-gold"
                ? 0.7
                : 0.6
            : vintage
              ? 0.27
              : styleId === "midnight-gold"
                ? 0.36
                : 0.31;

      return {
        ...star,
        tier,
        radius: Number(Math.max(vintage ? 1.1 : 1.45, Math.min(vintage ? 9 : 10.5, baseRadius)).toFixed(2)),
        opacity,
        glowOpacity:
          tier === "brightest" && !vintage
            ? styleId === "midnight-gold"
              ? 0.18
              : 0.22
            : tier === "medium" && !vintage
              ? 0.035
              : 0,
      };
    });
}

function planetDisplay(body: SkyBody): ArtworkBody["display"] {
  if (body.body === "Moon") return "featured-moon";
  if (body.body === "Venus" || body.body === "Jupiter" || body.body === "Mars") {
    return "featured-planet";
  }
  return "subtle-marker";
}

function prepareBodies(bodies: SkyBody[]): ArtworkBody[] {
  return bodies
    .filter((body) => body.body !== "Sun" && body.aboveHorizon)
    .map((body) => {
      const display = planetDisplay(body);
      return {
        ...body,
        display,
        radius:
          display === "featured-moon"
            ? 38
            : display === "featured-planet"
              ? 14
              : 7,
        label: body.body,
      };
    });
}

function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function moonPhaseName(degrees: number) {
  const value = ((degrees % 360) + 360) % 360;
  if (value < 22.5 || value >= 337.5) return "New Moon";
  if (value < 67.5) return "Waxing Crescent";
  if (value < 112.5) return "First Quarter";
  if (value < 157.5) return "Waxing Gibbous";
  if (value < 202.5) return "Full Moon";
  if (value < 247.5) return "Waning Gibbous";
  if (value < 292.5) return "Last Quarter";
  return "Waning Crescent";
}

export function createArtworkScene(
  config: MomentConfig,
  skyData: SkyComputation,
  type: "your-sky" = "your-sky",
  output: ArtworkOutputSpec = "a3-portrait-300dpi",
): ArtworkScene {
  return {
    type,
    output,
    config,
    skyData,
    style: styleTokens(config.style),
    composition,
    stars: prepareStars(skyData.stars, config.style),
    bodies: prepareBodies(skyData.bodies),
    labels: skyData.constellationLabels
      .filter((label) => label.aboveHorizon && label.rank <= 2)
      .slice(0, config.style === "vintage-observatory" ? 14 : 8),
    moonLabel: `${moonPhaseName(skyData.moonPhaseDegrees)} · ${Math.round(
      skyData.moonIllumination * 100,
    )}% illuminated`,
    momentLine: `${formatDate(config.localDate)} · ${config.localTime} · ${config.placeName}`,
    coordinateLine: `${config.latitude.toFixed(4)}°, ${config.longitude.toFixed(4)}°`,
  };
}
