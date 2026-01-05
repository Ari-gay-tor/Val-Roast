export function generateRoasts(stats) {
  const roasts = [];

  const { rank, momentum, roastFuel, profile } = stats;

  if (roastFuel?.hardstuck) {
    roasts.push(`Hardstuck ${rank.current}. Riot’s considering long-term leasing.`);
  }

  if (momentum?.lastGame < 0) {
    roasts.push(`Lost ${Math.abs(momentum.lastGame)} RR last game. MMR flinched.`);
  }

  if (momentum?.trend === "falling") {
    roasts.push(`Rank graph looks like a ski slope. No helmet.`);
  }

  if (rank.current?.startsWith("Silver") && profile.level > 80) {
    roasts.push(`Level ${profile.level} and still Silver. That’s commitment.`);
  }

  if (roasts.length === 0) {
    roasts.push(`Annoyingly stable. Come back after disaster.`);
  }

  return roasts;
}

export function generateRoast(stats) {
  const roasts = generateRoasts(stats);
  return roasts[Math.floor(Math.random() * roasts.length)];
}
