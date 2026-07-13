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

export const coopStyleOptions: Array<{
  value: CoopStyle;
  label: string;
  indoorSpaceMultiplier: number;
}> = [
  { value: "standard", label: "Standard coop", indoorSpaceMultiplier: 1 },
  { value: "walk-in", label: "Walk-in coop", indoorSpaceMultiplier: 1.25 },
];

export function calculateChickenCoopSpace(
  chickenCount: number,
  chickenSize: ChickenSize,
  coopStyle: CoopStyle,
) {
  const safeChickenCount = Math.max(1, Math.floor(chickenCount || 1));
  const selectedSize =
    chickenSizeOptions.find((option) => option.value === chickenSize) ??
    chickenSizeOptions[1];
  const selectedStyle =
    coopStyleOptions.find((option) => option.value === coopStyle) ??
    coopStyleOptions[0];

  return {
    coopSpace: Math.ceil(
      safeChickenCount *
        selectedSize.coopSpacePerChicken *
        selectedStyle.indoorSpaceMultiplier,
    ),
    runSpace: safeChickenCount * 10,
  };
}
