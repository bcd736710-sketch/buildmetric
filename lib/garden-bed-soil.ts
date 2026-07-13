export function calculateGardenBedSoil(
  lengthFeet: number,
  widthFeet: number,
  depthInches: number,
) {
  const safeLength = Math.max(0, lengthFeet || 0);
  const safeWidth = Math.max(0, widthFeet || 0);
  const safeDepth = Math.max(0, depthInches || 0);
  const cubicFeet = safeLength * safeWidth * (safeDepth / 12);

  return {
    cubicFeet,
    cubicYards: cubicFeet / 27,
    bagsOnePointFiveCubicFeet: Math.ceil(cubicFeet / 1.5),
  };
}
