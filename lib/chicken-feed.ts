export type ChickenFeedType = "chick" | "grower" | "layer";

export const chickenFeedOptions: Array<{
  value: ChickenFeedType;
  label: string;
  poundsPerChickenPerDay: number;
}> = [
  { value: "chick", label: "Chicks", poundsPerChickenPerDay: 0.1 },
  { value: "grower", label: "Growing chickens", poundsPerChickenPerDay: 0.18 },
  { value: "layer", label: "Adult laying hens", poundsPerChickenPerDay: 0.25 },
];

export function calculateChickenFeed(
  chickenCount: number,
  feedType: ChickenFeedType,
) {
  const safeChickenCount = Math.max(1, Math.floor(chickenCount || 1));
  const selectedFeed =
    chickenFeedOptions.find((option) => option.value === feedType) ??
    chickenFeedOptions[2];
  const dailyFeed = safeChickenCount * selectedFeed.poundsPerChickenPerDay;

  return {
    dailyFeed,
    weeklyFeed: dailyFeed * 7,
    monthlyFeed: dailyFeed * 30,
  };
}
