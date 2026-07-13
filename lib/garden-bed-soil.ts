export type SoilBagSize = "one" | "onePointFive" | "two";

export const soilBagSizeOptions: Array<{
  value: SoilBagSize;
  label: string;
  cubicFeet: number;
}> = [
  { value: "one", label: "1 cu ft bags", cubicFeet: 1 },
  { value: "onePointFive", label: "1.5 cu ft bags", cubicFeet: 1.5 },
  { value: "two", label: "2 cu ft bags", cubicFeet: 2 },
];

export function calculateGardenBedSoil(
  lengthFeet: number,
  widthFeet: number,
  depthInches: number,
  bagSize: SoilBagSize,
) {
  const safeLength = Math.max(0, lengthFeet || 0);
  const safeWidth = Math.max(0, widthFeet || 0);
  const safeDepth = Math.max(0, depthInches || 0);
  const selectedBagSize =
    soilBagSizeOptions.find((option) => option.value === bagSize) ??
    soilBagSizeOptions[1];
  const cubicFeet = safeLength * safeWidth * (safeDepth / 12);

  return {
    cubicFeet,
    cubicYards: cubicFeet / 27,
    bagSizeCubicFeet: selectedBagSize.cubicFeet,
    bagsNeeded: Math.ceil(cubicFeet / selectedBagSize.cubicFeet),
  };
}
