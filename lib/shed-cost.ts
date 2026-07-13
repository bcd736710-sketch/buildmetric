export type ShedFinishLevel = "basic" | "standard" | "premium";

export const shedFinishOptions: Array<{
  value: ShedFinishLevel;
  label: string;
  costPerSquareFoot: number;
}> = [
  { value: "basic", label: "Basic", costPerSquareFoot: 25 },
  { value: "standard", label: "Standard", costPerSquareFoot: 45 },
  { value: "premium", label: "Premium", costPerSquareFoot: 75 },
];

export function calculateShedCost(
  lengthFeet: number,
  widthFeet: number,
  finishLevel: ShedFinishLevel,
) {
  const safeLength = Math.max(0, lengthFeet || 0);
  const safeWidth = Math.max(0, widthFeet || 0);
  const selectedFinish =
    shedFinishOptions.find((option) => option.value === finishLevel) ??
    shedFinishOptions[1];
  const squareFeet = safeLength * safeWidth;

  return {
    squareFeet,
    estimatedCost: squareFeet * selectedFinish.costPerSquareFoot,
    costPerSquareFoot: selectedFinish.costPerSquareFoot,
  };
}
