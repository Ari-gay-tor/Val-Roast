import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `http://localhost:3001/api/player/${name}/${tag}`
      );

      if (!res.ok) {
        throw new Error("Profile not found");
      }

      const json = await res.json();
      console.log("API response:", json); // IMPORTANT

      setData(json);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>🔥 Val-Roast</h1>

      <div className="input-row">
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Tag"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
        <button onClick={fetchProfile}>Roast Me</button>
      </div>

      {error && <p className="error">{error}</p>}

      {data?.stats && (
        <div className="card">
          <h2>{data.stats.profile.username}</h2>
          <p>Level {data.stats.profile.level}</p>

          <div className="section">
            <strong>Rank</strong>
            <p>{data.stats.rank.current}</p>
            <p>ELO: {data.stats.rank.elo}</p>
          </div>

          <div className="section">
            <strong>Momentum</strong>
            <p>Last game: {data.stats.momentum.lastGame} RR</p>
            <p>Trend: {data.stats.momentum.trend}</p>
          </div>

          <div className="roasts">
            {data.roasts.map((roast, i) => (
              <p key={i} className="roast">🔥 {roast}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
