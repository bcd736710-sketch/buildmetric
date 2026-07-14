export type FenceMaterial = "wood" | "vinyl" | "chainLink";

export const fenceMaterialOptions: Array<{
  value: FenceMaterial;
  label: string;
  costPerFoot: number;
}> = [
  { value: "wood", label: "Wood fence", costPerFoot: 28 },
  { value: "vinyl", label: "Vinyl fence", costPerFoot: 38 },
  { value: "chainLink", label: "Chain link fence", costPerFoot: 18 },
];

export function calculateFenceCost(
  lengthFeet: number,
  material: FenceMaterial,
  gates: number,
) {
  const selectedMaterial =
    fenceMaterialOptions.find((option) => option.value === material) ??
    fenceMaterialOptions[0];
  const fenceLength = Math.max(0, lengthFeet);
  const gateCount = Math.max(0, Math.floor(gates));
  const materialCost = fenceLength * selectedMaterial.costPerFoot;
  const gateCost = gateCount * 250;
  const estimatedCost = materialCost + gateCost;

  return {
    fenceLength,
    costPerFoot: selectedMaterial.costPerFoot,
    gateCount,
    materialCost,
    gateCost,
    estimatedCost,
  };
}
