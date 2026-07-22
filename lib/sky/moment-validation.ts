import {
  defaultMomentConfig,
  posterStyles,
  resolveMomentConfig,
  timeAccuracyOptions,
  type MomentConfig,
} from "@/lib/sky/moment";
import { supportedArtworkTypes, supportedOutputSpecs, type ArtworkOutputSpec, type ArtworkType } from "@/lib/sky/artwork-scene";

type RenderRequest = {
  artworkType: ArtworkType;
  output: ArtworkOutputSpec;
  format: "png" | "pdf";
  moment: MomentConfig;
};

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function cleanText(value: unknown, fallback: string, maxLength: number) {
  if (!isString(value)) return fallback;
  return value.trim().slice(0, maxLength);
}

export function validateRenderRequest(input: unknown): RenderRequest {
  if (!input || typeof input !== "object") {
    throw new Error("Request body is required.");
  }

  const body = input as Record<string, unknown>;
  const momentInput =
    body.moment && typeof body.moment === "object"
      ? (body.moment as Record<string, unknown>)
      : {};

  const artworkType = body.artworkType;
  if (!supportedArtworkTypes.includes(artworkType as ArtworkType)) {
    throw new Error("Unsupported artwork type.");
  }

  const output = body.output ?? "a3-portrait-300dpi";
  if (!supportedOutputSpecs.includes(output as ArtworkOutputSpec)) {
    throw new Error("Unsupported output spec.");
  }

  const format = body.format ?? "png";
  if (format !== "png" && format !== "pdf") {
    throw new Error("Unsupported output format.");
  }

  const style = momentInput.style;
  const timeAccuracy = momentInput.timeAccuracy;
  const latitude = momentInput.latitude;
  const longitude = momentInput.longitude;

  if (!Object.keys(posterStyles).includes(String(style))) {
    throw new Error("Unsupported artwork style.");
  }

  if (!Object.keys(timeAccuracyOptions).includes(String(timeAccuracy))) {
    throw new Error("Unsupported time accuracy.");
  }

  if (!isFiniteNumber(latitude) || latitude < -90 || latitude > 90) {
    throw new Error("Latitude is invalid.");
  }

  if (!isFiniteNumber(longitude) || longitude < -180 || longitude > 180) {
    throw new Error("Longitude is invalid.");
  }

  const localDate = isString(momentInput.localDate)
    ? momentInput.localDate
    : defaultMomentConfig.localDate;
  const localTime = isString(momentInput.localTime)
    ? momentInput.localTime
    : defaultMomentConfig.localTime;
  const timezone = isString(momentInput.timezone)
    ? momentInput.timezone
    : defaultMomentConfig.timezone;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(localDate)) {
    throw new Error("Date is invalid.");
  }

  if (!/^\d{2}:\d{2}$/.test(localTime)) {
    throw new Error("Time is invalid.");
  }

  const moment = resolveMomentConfig({
    productType: artworkType as MomentConfig["productType"],
    placeName: cleanText(momentInput.placeName, defaultMomentConfig.placeName, 100),
    country: cleanText(momentInput.country, defaultMomentConfig.country, 80),
    latitude,
    longitude,
    timezone,
    localDate,
    localTime,
    timeAccuracy: timeAccuracy as MomentConfig["timeAccuracy"],
    title: cleanText(momentInput.title, defaultMomentConfig.title, 72),
    message: cleanText(momentInput.message, defaultMomentConfig.message, 120),
    style: style as MomentConfig["style"],
  });

  return {
    artworkType: artworkType as ArtworkType,
    output: output as ArtworkOutputSpec,
    format,
    moment,
  };
}
