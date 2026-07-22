import { resolveMomentConfig, type MomentConfig } from "@/lib/sky/moment";

export type SkyRegressionMoment = {
  id: "nighttime" | "daytime" | "southern-hemisphere";
  label: string;
  config: MomentConfig;
};

export const skyRegressionMoments: SkyRegressionMoment[] = [
  {
    id: "nighttime",
    label: "Moment A - Nighttime",
    config: resolveMomentConfig({
      productType: "your-sky",
      placeName: "Sedona, Arizona",
      country: "United States",
      latitude: 34.8697,
      longitude: -111.761,
      timezone: "America/Phoenix",
      localDate: "2024-11-12",
      localTime: "22:18",
      timeAccuracy: "exact-time",
      title: "The Night We Chose",
      message: "Under this sky, everything became possible.",
      style: "midnight-gold",
    }),
  },
  {
    id: "daytime",
    label: "Moment B - Daytime",
    config: resolveMomentConfig({
      productType: "your-sky",
      placeName: "Paris",
      country: "France",
      latitude: 48.8566,
      longitude: 2.3522,
      timezone: "Europe/Paris",
      localDate: "2022-06-18",
      localTime: "14:42",
      timeAccuracy: "exact-time",
      title: "A Bright Beginning",
      message: "The stars were still there.",
      style: "celestial-dream",
    }),
  },
  {
    id: "southern-hemisphere",
    label: "Moment C - Different hemisphere / season",
    config: resolveMomentConfig({
      productType: "your-sky",
      placeName: "Queenstown",
      country: "New Zealand",
      latitude: -45.0312,
      longitude: 168.6626,
      timezone: "Pacific/Auckland",
      localDate: "2023-08-04",
      localTime: "21:05",
      timeAccuracy: "exact-time",
      title: "South of the Stars",
      message: "A sky from the other side of the world.",
      style: "vintage-observatory",
    }),
  },
];
