export type GravelDensity = "standard" | "compact";

export const gravelDensityOptions: Array<{
  value: GravelDensity;
  label: string;
  poundsPerCubicYard: number;
}> = [
  { value: "standard", label: "Standard gravel", poundsPerCubicYard: 2800 },
  { value: "compact", label: "Dense or compacted gravel", poundsPerCubicYard: 3200 },
];

export function calculateGravel(
  lengthFeet: number,
  widthFeet: number,
  depthInches: number,
  density: GravelDensity,
) {
  const area = Math.max(0, lengthFeet) * Math.max(0, widthFeet);
  const cubicFeet = area * (Math.max(0, depthInches) / 12);
  const cubicYards = cubicFeet / 27;
  const selectedDensity =
    gravelDensityOptions.find((option) => option.value === density) ??
    gravelDensityOptions[0];
  const tons = (cubicYards * selectedDensity.poundsPerCubicYard) / 2000;

  return {
    area,
    cubicFeet,
    cubicYards,
    tons,
    poundsPerCubicYard: selectedDensity.poundsPerCubicYard,
  };
}
