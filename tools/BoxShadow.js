"use client";

import { useState } from "react";

export default function BoxShadow() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(8);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#4f6ef7");
  const [opacity, setOpacity] = useState(0.35);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  const hexToRgba = (hex, a) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const css = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;

  const sliders = [
    ["X 偏移", x, setX, -50, 50],
    ["Y 偏移", y, setY, -50, 50],
    ["模糊", blur, setBlur, 0, 100],
    ["扩散", spread, setSpread, -20, 50],
    ["不透明度", opacity, setOpacity, 0, 1],
  ];

  return (
    <div className="panel">
      {sliders.map(([label, val, set, min, max]) => (
        <label key={label} style={{ display: "block", fontSize: 14, margin: "10px 0" }}>
          {label}：<strong>{val}</strong>
          <input type="range" min={min} max={max} step={label === "不透明度" ? 0.05 : 1} value={val} onChange={(e) => set(Number(e.target.value))} style={{ width: "100%", display: "block" }} />
        </label>
      ))}
      <div className="btn-row">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 48, height: 36, border: "none", background: "none" }} />
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={inset} onChange={(e) => setInset(e.target.checked)} />
          内阴影
        </label>
      </div>
      <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", borderRadius: 10, margin: "12px 0" }}>
        <div style={{ width: 110, height: 70, borderRadius: 12, background: "#fff", boxShadow: css }} />
      </div>
      <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(`box-shadow: ${css};`); setCopied(true); }}>
        {copied ? "已复制 CSS" : "复制 CSS"}
      </button>
      <pre className="output" style={{ marginTop: 10 }}>box-shadow: {css};</pre>
    </div>
  );
}
