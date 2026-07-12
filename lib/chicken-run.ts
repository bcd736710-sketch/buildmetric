export type RunSurface = "grass" | "dirt" | "mixed";

export const runSurfaceOptions: Array<{ value: RunSurface; label: string }> = [
  { value: "grass", label: "Grass" },
  { value: "dirt", label: "Dirt" },
  { value: "mixed", label: "Mixed ground" },
];

export function calculateChickenRunSpace(chickenCount: number) {
  const safeChickenCount = Math.max(1, Math.floor(chickenCount || 1));

  return {
    minimumRunSpace: safeChickenCount * 10,
    comfortableRunSpace: safeChickenCount * 15,
  };
}
