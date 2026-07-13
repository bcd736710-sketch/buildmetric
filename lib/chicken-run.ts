export type RunSurface = "grass" | "dirt" | "mixed";

export const runSurfaceOptions: Array<{
  value: RunSurface;
  label: string;
  minimumSqFtPerChicken: number;
  comfortableSqFtPerChicken: number;
}> = [
  {
    value: "grass",
    label: "Grass",
    minimumSqFtPerChicken: 12,
    comfortableSqFtPerChicken: 18,
  },
  {
    value: "dirt",
    label: "Dirt",
    minimumSqFtPerChicken: 10,
    comfortableSqFtPerChicken: 15,
  },
  {
    value: "mixed",
    label: "Mixed ground",
    minimumSqFtPerChicken: 11,
    comfortableSqFtPerChicken: 16,
  },
];

export function calculateChickenRunSpace(
  chickenCount: number,
  surface: RunSurface,
) {
  const safeChickenCount = Math.max(1, Math.floor(chickenCount || 1));
  const selectedSurface =
    runSurfaceOptions.find((option) => option.value === surface) ??
    runSurfaceOptions[2];

  return {
    minimumRunSpace:
      safeChickenCount * selectedSurface.minimumSqFtPerChicken,
    comfortableRunSpace:
      safeChickenCount * selectedSurface.comfortableSqFtPerChicken,
  };
}
