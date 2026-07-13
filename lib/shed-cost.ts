export type ShedFinishLevel = "basic" | "standard" | "premium";
export type ShedFoundationType = "none" | "gravel" | "concrete";

export const shedFinishOptions: Array<{
  value: ShedFinishLevel;
  label: string;
  costPerSquareFoot: number;
}> = [
  { value: "basic", label: "Basic", costPerSquareFoot: 25 },
  { value: "standard", label: "Standard", costPerSquareFoot: 45 },
  { value: "premium", label: "Premium", costPerSquareFoot: 75 },
];

export const shedFoundationOptions: Array<{
  value: ShedFoundationType;
  label: string;
  costPerSquareFoot: number;
}> = [
  { value: "none", label: "No foundation allowance", costPerSquareFoot: 0 },
  { value: "gravel", label: "Gravel or block base", costPerSquareFoot: 6 },
  { value: "concrete", label: "Concrete slab allowance", costPerSquareFoot: 14 },
];

export function calculateShedCost(
  lengthFeet: number,
  widthFeet: number,
  finishLevel: ShedFinishLevel,
  foundationType: ShedFoundationType,
) {
  const safeLength = Math.max(0, lengthFeet || 0);
  const safeWidth = Math.max(0, widthFeet || 0);
  const selectedFinish =
    shedFinishOptions.find((option) => option.value === finishLevel) ??
    shedFinishOptions[1];
  const selectedFoundation =
    shedFoundationOptions.find((option) => option.value === foundationType) ??
    shedFoundationOptions[0];
  const squareFeet = safeLength * safeWidth;
  const buildCost = squareFeet * selectedFinish.costPerSquareFoot;
  const foundationCost = squareFeet * selectedFoundation.costPerSquareFoot;

  return {
    squareFeet,
    buildCost,
    foundationCost,
    estimatedCost: buildCost + foundationCost,
    costPerSquareFoot: selectedFinish.costPerSquareFoot,
    foundationCostPerSquareFoot: selectedFoundation.costPerSquareFoot,
  };
}
