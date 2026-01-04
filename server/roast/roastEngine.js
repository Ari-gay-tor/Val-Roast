// server/roast/roastEngine.js

export function generateRoast(stats) {
  const roasts = [];

  if (stats.roastFuel?.hardstuck) {
    roasts.push("Hardstuck so long even your rank icon gave up.");
  }

  if (stats.roastFuel?.boosted) {
    roasts.push("RR says carry, gameplay says passenger.");
  }

  if (stats.roastFuel?.struggling) {
    roasts.push("Last match looked like emotional damage in 30 rounds.");
  }

  if (roasts.length === 0) {
    roasts.push("Stable performance detected. Suspicious.");
  }

  return roasts;
}
