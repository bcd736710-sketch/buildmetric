export type PaintCoats = "one" | "two";

export const paintCoatOptions: Array<{
  value: PaintCoats;
  label: string;
  coats: number;
}> = [
  { value: "one", label: "1 coat", coats: 1 },
  { value: "two", label: "2 coats", coats: 2 },
];

export function calculatePaint(
  wallAreaSquareFeet: number,
  coats: PaintCoats,
  coveragePerGallon: number,
) {
  const selectedCoats =
    paintCoatOptions.find((option) => option.value === coats) ??
    paintCoatOptions[1];
  const paintableArea = Math.max(0, wallAreaSquareFeet) * selectedCoats.coats;
  const gallons = paintableArea / Math.max(1, coveragePerGallon);

  return {
    paintableArea,
    coats: selectedCoats.coats,
    gallons,
    gallonsToBuy: Math.ceil(gallons),
  };
}
