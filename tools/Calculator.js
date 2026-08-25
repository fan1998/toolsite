"use client";

import { useState } from "react";

const KEYS = [
  ["7", "8", "9", "÷", "C"],
  ["4", "5", "6", "×", "⌫"],
  ["1", "2", "3", "-", "%"],
  ["0", ".", "(", ")", "+"],
];

export default function Calculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  const press = (k) => {
    if (k === "C") { setExpr(""); setResult(""); return; }
    if (k === "⌫") { setExpr((e) => e.slice(0, -1)); return; }
    setExpr((e) => e + k);
  };

  const calc = () => {
    try {
      const safe = expr.replace(/×/g, "*").replace(/÷/g, "/");
      if (!/^[0-9+\-*/().%\s]+$/.test(safe)) throw new Error();
      const v = Function(`"use strict";return (${safe.replace(/(\d+)%/g, "($1/100)")})`)();
      if (typeof v !== "number" || !isFinite(v)) throw new Error();
      setResult(String(Math.round(v * 1e10) / 1e10));
    } catch {
      setResult("表达式错误");
    }
  };

  return (
    <div className="panel" style={{ maxWidth: 360, margin: "16px auto" }}>
      <input type="text" value={expr} onChange={(e) => setExpr(e.target.value)} placeholder="0" style={{ fontSize: 20, textAlign: "right" }} />
      <div style={{ fontSize: 22, fontWeight: 700, textAlign: "right", padding: "8px 4px", minHeight: 34, color: "var(--primary)" }}>{result}</div>
      {KEYS.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          {row.map((k) => (
            <button
              key={k}
              className={/[0-9.]/.test(k) ? "" : "secondary"}
              onClick={() => press(k)}
              style={{ flex: 1, padding: "14px 0", fontSize: 16 }}
            >
              {k}
            </button>
          ))}
        </div>
      ))}
      <button onClick={calc} style={{ width: "100%", padding: "14px 0", fontSize: 16 }}>＝</button>
    </div>
  );
}
