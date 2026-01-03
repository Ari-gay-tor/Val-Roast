// server/utils/normalizeStats.js

export function normalizeStats(rawData) {
  if (!rawData || !rawData.mmr || !rawData.account) {
    throw new Error("Invalid raw data passed to normalizeStats");
  }

  const { account, mmr } = rawData;

  return {
    username: `${account.name}#${account.tag}`,
    level: account.account_level ?? "Unknown",

    rank: mmr.currenttierpatched ?? "Unranked",
    rr: mmr.ranking_in_tier ?? 0,
    elo: mmr.elo ?? null,

    lastGameRRChange: mmr.mmr_change_to_last_game ?? 0,
    peakRank: mmr.highest_rank
      ? mmr.highest_rank.patched_tier
      : "Unknown"
  };
}
