export type ChickenSize = "small" | "medium" | "large";
export type CoopStyle = "standard" | "walk-in";

export const chickenSizeOptions: Array<{
  value: ChickenSize;
  label: string;
  coopSpacePerChicken: number;
}> = [
  { value: "small", label: "Small", coopSpacePerChicken: 3 },
  { value: "medium", label: "Medium", coopSpacePerChicken: 4 },
  { value: "large", label: "Large", coopSpacePerChicken: 5 },
];

export const coopStyleOptions: Array<{ value: CoopStyle; label: string }> = [
  { value: "standard", label: "Standard coop" },
  { value: "walk-in", label: "Walk-in coop" },
];

export function calculateChickenCoopSpace(
  chickenCount: number,
  chickenSize: ChickenSize,
) {
  const safeChickenCount = Math.max(1, Math.floor(chickenCount || 1));
  const selectedSize =
    chickenSizeOptions.find((option) => option.value === chickenSize) ??
    chickenSizeOptions[1];

  return {
    coopSpace: safeChickenCount * selectedSize.coopSpacePerChicken,
    runSpace: safeChickenCount * 10,
  };
}
