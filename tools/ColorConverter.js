"use client";

import { useMemo, useState } from "react";

function hexToRgb(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export default function ColorConverter() {
  const [color, setColor] = useState("#2563eb");
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const values = rgb
    ? [
        { k: "HEX", v: `#${color.replace("#", "").toLowerCase()}` },
        { k: "RGB", v: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { k: "HSL", v: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
      ]
    : [];

  return (
    <div className="panel">
      <div className="btn-row" style={{ alignItems: "center" }}>
        <input
          type="color"
          value={rgb ? `#${color.replace("#", "").slice(0, 6).padEnd(6, "0")}` : "#000000"}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: 56, height: 40, border: "none", cursor: "pointer", background: "none" }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="#2563eb"
          style={{ maxWidth: 200 }}
        />
      </div>
      {rgb ? (
        <div
          style={{
            height: 64,
            borderRadius: 8,
            background: `#${color.replace("#", "")}`,
            marginBottom: 12,
          }}
        />
      ) : (
        <p className="error-text">HEX 色值格式不正确</p>
      )}
      <div className="kv-grid">
        {values.map((x) => (
          <div
            key={x.k}
            className="kv-item"
            onClick={() => navigator.clipboard.writeText(x.v)}
          >
            <div className="k">{x.k}（点击复制）</div>
            <div className="v">{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
