import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { fetchPlayerStats } from "./services/valorantApi.js";
import { normalizeStats } from "./utils/normalizeStats.js";
import { generateRoast, generateRoasts } from "./utils/roastEngine.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Val-Roast API is alive");
});

app.get("/api/player/:name/:tag", async (req, res) => {
  try {
    const { name, tag } = req.params;

    const rawData = await fetchPlayerStats(name, tag);
    const stats = normalizeStats(rawData);
    const roasts = generateRoasts(stats);

    res.json({ stats, roasts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/roast/:name/:tag", async (req, res) => {
  try {
    const { name, tag } = req.params;

    const rawData = await fetchPlayerStats(name, tag);
    const stats = normalizeStats(rawData);
    const roast = generateRoast(stats);

    res.json({ roast });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Val-Roast server running on port ${PORT}`);
});
