export type ChickenFeedType = "chick" | "grower" | "layer";
export type FeedWasteLevel = "low" | "standard" | "high";

export const chickenFeedOptions: Array<{
  value: ChickenFeedType;
  label: string;
  poundsPerChickenPerDay: number;
}> = [
  { value: "chick", label: "Chicks", poundsPerChickenPerDay: 0.1 },
  { value: "grower", label: "Growing chickens", poundsPerChickenPerDay: 0.18 },
  { value: "layer", label: "Adult laying hens", poundsPerChickenPerDay: 0.25 },
];

export const feedWasteOptions: Array<{
  value: FeedWasteLevel;
  label: string;
  multiplier: number;
}> = [
  { value: "low", label: "Low waste", multiplier: 1 },
  { value: "standard", label: "Standard buffer", multiplier: 1.1 },
  { value: "high", label: "High waste / open feeder", multiplier: 1.2 },
];

export function calculateChickenFeed(
  chickenCount: number,
  feedType: ChickenFeedType,
  wasteLevel: FeedWasteLevel,
) {
  const safeChickenCount = Math.max(1, Math.floor(chickenCount || 1));
  const selectedFeed =
    chickenFeedOptions.find((option) => option.value === feedType) ??
    chickenFeedOptions[2];
  const selectedWaste =
    feedWasteOptions.find((option) => option.value === wasteLevel) ??
    feedWasteOptions[1];
  const dailyFeed =
    safeChickenCount *
    selectedFeed.poundsPerChickenPerDay *
    selectedWaste.multiplier;

  return {
    dailyFeed,
    weeklyFeed: dailyFeed * 7,
    monthlyFeed: dailyFeed * 30,
  };
}
