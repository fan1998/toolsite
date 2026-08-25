"use client";

import { useState } from "react";

export default function RandomPicker() {
  const [names, setNames] = useState("");
  const [count, setCount] = useState(1);
  const [winners, setWinners] = useState([]);
  const [rolling, setRolling] = useState(false);

  const pick = () => {
    const pool = names.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (pool.length === 0) return;
    const n = Math.min(count, pool.length);
    setRolling(true);
    let ticks = 0;
    const timer = setInterval(() => {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      setWinners(shuffled.slice(0, n));
      if (++ticks >= 12) {
        clearInterval(timer);
        const picked = [];
        const copy = [...pool];
        for (let i = 0; i < n; i++) picked.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
        setWinners(picked);
        setRolling(false);
      }
    }, 80);
  };

  return (
    <div className="panel">
      <textarea value={names} onChange={(e) => setNames(e.target.value)} placeholder="每行一个名字或选项" />
      <div className="btn-row">
        <label style={{ fontSize: 14 }}>
          抽取人数：
          <input type="number" min="1" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} style={{ width: 70, marginLeft: 8 }} />
        </label>
        <button onClick={pick} disabled={rolling || !names.trim()}>
          {rolling ? "抽取中…" : "开始抽取"}
        </button>
      </div>
      {winners.length > 0 && (
        <div style={{ textAlign: "center", padding: 12 }}>
          {winners.map((w, i) => (
            <span key={i} style={{ display: "inline-block", margin: 6, padding: "10px 22px", background: "linear-gradient(135deg,var(--primary),var(--primary-2))", color: "#fff", borderRadius: 12, fontSize: 17, fontWeight: 700 }}>
              {w}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
