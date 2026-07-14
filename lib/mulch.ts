export type MulchBagSize = "two" | "three";

export const mulchBagSizeOptions: Array<{
  value: MulchBagSize;
  label: string;
  cubicFeet: number;
}> = [
  { value: "two", label: "2 cu ft bag", cubicFeet: 2 },
  { value: "three", label: "3 cu ft bag", cubicFeet: 3 },
];

export function calculateMulch(
  lengthFeet: number,
  widthFeet: number,
  depthInches: number,
  bagSize: MulchBagSize,
) {
  const area = Math.max(0, lengthFeet) * Math.max(0, widthFeet);
  const cubicFeet = area * (Math.max(0, depthInches) / 12);
  const cubicYards = cubicFeet / 27;
  const selectedBag =
    mulchBagSizeOptions.find((option) => option.value === bagSize) ??
    mulchBagSizeOptions[0];

  return {
    area,
    cubicFeet,
    cubicYards,
    bagSizeCubicFeet: selectedBag.cubicFeet,
    bagsNeeded: Math.ceil(cubicFeet / selectedBag.cubicFeet),
  };
}
