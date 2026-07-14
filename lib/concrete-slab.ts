export function calculateConcreteSlab(
  lengthFeet: number,
  widthFeet: number,
  thicknessInches: number,
  wastePercent: number,
) {
  const area = Math.max(0, lengthFeet) * Math.max(0, widthFeet);
  const cubicFeet = area * (Math.max(0, thicknessInches) / 12);
  const cubicYards = cubicFeet / 27;
  const wasteMultiplier = 1 + Math.max(0, wastePercent) / 100;
  const cubicYardsWithWaste = cubicYards * wasteMultiplier;
  const eightyPoundBags = Math.ceil(cubicFeet / 0.6);

  return {
    area,
    cubicFeet,
    cubicYards,
    cubicYardsWithWaste,
    eightyPoundBags,
  };
}
