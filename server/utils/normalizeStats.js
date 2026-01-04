// server/utils/normalizeStats.js

export function normalizeStats(rawData) {
  if (!rawData || !rawData.mmr || !rawData.account) {
    throw new Error("Invalid raw data passed to normalizeStats");
  }

  const { account, mmr } = rawData;

  const rr = mmr.ranking_in_tier ?? 0;
  const lastChange = mmr.mmr_change_to_last_game ?? 0;

  return {
    profile: {
      username: `${account.name}#${account.tag}`,
      level: account.account_level ?? "Unknown"
    },

    rank: {
      current: mmr.currenttierpatched ?? "Unranked",
      rr,
      elo: mmr.elo ?? null,
      peak: mmr.highest_rank?.patched_tier ?? "Unknown"
    },

    momentum: {
      lastGame: lastChange,
      trend:
        lastChange > 0 ? "climbing" :
        lastChange < 0 ? "falling" :
        "stagnant"
    },

    roastFuel: {
      hardstuck: rr < 30,
      boosted: rr > 80 && lastChange < 0,
      struggling: lastChange < -15
    }
  };
}
