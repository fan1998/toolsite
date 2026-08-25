"use client";

import { useState } from "react";

export default function CssGradient() {
  const [c1, setC1] = useState("#4f6ef7");
  const [c2, setC2] = useState("#7c3aed");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const css = `linear-gradient(${angle}deg, ${c1}, ${c2})`;

  return (
    <div className="panel">
      <div className="btn-row">
        <input type="color" value={c1} onChange={(e) => setC1(e.target.value)} style={{ width: 56, height: 40, border: "none", background: "none" }} />
        <input type="color" value={c2} onChange={(e) => setC2(e.target.value)} style={{ width: 56, height: 40, border: "none", background: "none" }} />
        <label style={{ flex: 1, fontSize: 14 }}>
          角度：<strong>{angle}°</strong>
          <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} style={{ width: "100%", display: "block" }} />
        </label>
      </div>
      <div style={{ height: 140, borderRadius: 10, background: css, margin: "12px 0" }} />
      <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(`background: ${css};`); setCopied(true); }}>
        {copied ? "已复制 CSS" : "复制 CSS"}
      </button>
      <pre className="output" style={{ marginTop: 10 }}>background: {css};</pre>
    </div>
  );
}
