export type SkyProductType = "your-sky" | "cosmic-signature";

export type SkyPosterStyle =
  | "midnight-gold"
  | "celestial-dream"
  | "vintage-observatory";

export type TimeAccuracy =
  | "morning"
  | "afternoon"
  | "evening"
  | "late-night"
  | "exact-time";

export type MomentPlace = {
  placeName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type MomentConfig = MomentPlace & {
  productType: SkyProductType;
  localDate: string;
  localTime: string;
  timeAccuracy: TimeAccuracy;
  utcInstant: string;
  title: string;
  message: string;
  style: SkyPosterStyle;
};

export const timeAccuracyOptions: Record<
  TimeAccuracy,
  { label: string; defaultTime: string; note: string }
> = {
  morning: {
    label: "Morning",
    defaultTime: "09:00",
    note: "A remembered morning, anchored to 9:00 AM local time.",
  },
  afternoon: {
    label: "Afternoon",
    defaultTime: "14:00",
    note: "A remembered afternoon, anchored to 2:00 PM local time.",
  },
  evening: {
    label: "Evening",
    defaultTime: "20:00",
    note: "A remembered evening, anchored to 8:00 PM local time.",
  },
  "late-night": {
    label: "Late Night",
    defaultTime: "23:30",
    note: "A late-night memory, anchored to 11:30 PM local time.",
  },
  "exact-time": {
    label: "Exact Time",
    defaultTime: "14:00",
    note: "Use the precise time you provide.",
  },
};

export const posterStyles: Record<
  SkyPosterStyle,
  {
    name: string;
    description: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
    secondaryAccent: string;
    skyGlow: string;
    paperTexture: string;
  }
> = {
  "midnight-gold": {
    name: "Midnight Gold",
    description: "Deep black sky, restrained warm gold, quiet heirloom mood.",
    background: "#040612",
    foreground: "#f8f1df",
    muted: "#9f9887",
    accent: "#d5ad61",
    secondaryAccent: "#8f7442",
    skyGlow: "rgba(213, 173, 97, 0.18)",
    paperTexture: "rgba(255, 255, 255, 0.03)",
  },
  "celestial-dream": {
    name: "Celestial Dream",
    description: "Deep blue violet atmosphere, soft luminous dust, no neon glare.",
    background: "#090b21",
    foreground: "#f3f6ff",
    muted: "#a7afcf",
    accent: "#9dc7ff",
    secondaryAccent: "#bba8ff",
    skyGlow: "rgba(157, 199, 255, 0.18)",
    paperTexture: "rgba(255, 255, 255, 0.035)",
  },
  "vintage-observatory": {
    name: "Vintage Observatory",
    description: "Warm old paper, copperplate lines, private observatory feel.",
    background: "#efe4ce",
    foreground: "#1d2433",
    muted: "#6d6355",
    accent: "#9e6732",
    secondaryAccent: "#c49a68",
    skyGlow: "rgba(158, 103, 50, 0.16)",
    paperTexture: "rgba(29, 36, 51, 0.035)",
  },
};

const earliestSupportedDate = "1900-01-01";

export const defaultMomentPlace: MomentPlace = {
  placeName: "Austin, Texas",
  country: "United States",
  latitude: 30.2672,
  longitude: -97.7431,
  timezone: "America/Chicago",
};

function dateParts(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return { year, month, day };
}

function timeParts(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return { hour, minute };
}

function zonedParts(date: Date, timezone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

export function getTimeZoneOffsetMinutes(timezone: string, utcDate: Date) {
  const parts = zonedParts(utcDate, timezone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  return Math.round((asUtc - utcDate.getTime()) / 60000);
}

export function localMomentToUtcInstant(
  localDate: string,
  localTime: string,
  timezone: string,
) {
  const { year, month, day } = dateParts(localDate);
  const { hour, minute } = timeParts(localTime);
  let utcMillis = Date.UTC(year, month - 1, day, hour, minute, 0);

  for (let index = 0; index < 4; index += 1) {
    const offset = getTimeZoneOffsetMinutes(timezone, new Date(utcMillis));
    utcMillis = Date.UTC(year, month - 1, day, hour, minute, 0) - offset * 60000;
  }

  return new Date(utcMillis).toISOString();
}

export function resolveMomentConfig(
  config: Omit<MomentConfig, "utcInstant"> & { utcInstant?: string },
): MomentConfig {
  const today = new Date().toISOString().slice(0, 10);
  const localDate =
    config.localDate < earliestSupportedDate
      ? earliestSupportedDate
      : config.localDate > today
        ? today
        : config.localDate;
  const localTime =
    config.timeAccuracy === "exact-time"
      ? config.localTime
      : timeAccuracyOptions[config.timeAccuracy].defaultTime;

  return {
    ...config,
    localDate,
    localTime,
    utcInstant: localMomentToUtcInstant(localDate, localTime, config.timezone),
  };
}

export const defaultMomentConfig: MomentConfig = resolveMomentConfig({
  productType: "your-sky",
  ...defaultMomentPlace,
  localDate: "2024-04-08",
  localTime: "14:00",
  timeAccuracy: "exact-time",
  title: "A moment worth remembering",
  message: "The sky remembers.",
  style: "midnight-gold",
});
