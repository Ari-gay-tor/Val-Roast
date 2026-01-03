// server/services/valorantApi.js
import fetch from "node-fetch";

const BASE_URL = "https://api.henrikdev.xyz";
const DEFAULT_REGION = "ap";

export async function fetchPlayerStats(name, tag) {
  // 1. Account lookup (no region required)
  const accountRes = await fetch(
    `${BASE_URL}/valorant/v1/account/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    {
      headers: {
        Authorization: process.env.HENRIK_API_KEY
      }
    }
  );

  if (!accountRes.ok) {
    const text = await accountRes.text();
    console.error("Account fetch failed:", accountRes.status, text);
    throw new Error("Account fetch failed");
  }

  const accountData = await accountRes.json();

  // 2. MMR lookup (region REQUIRED)
  const mmrRes = await fetch(
    `${BASE_URL}/valorant/v1/mmr/${DEFAULT_REGION}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    {
      headers: {
        Authorization: process.env.HENRIK_API_KEY
      }
    }
  );

  if (!mmrRes.ok) {
    const text = await mmrRes.text();
    console.error("MMR fetch failed:", mmrRes.status, text);
    throw new Error("MMR fetch failed");
  }

  const mmrData = await mmrRes.json();

  return {
    account: accountData.data,
    mmr: mmrData.data
  };
}
