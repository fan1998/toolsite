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

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function rgbToCmyk(r, g, b) {
  const rr = r / 255;
  const gg = g / 255;
  const bb = b / 255;
  const k = 1 - Math.max(rr, gg, bb);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rr - k) / (1 - k)) * 100),
    m: Math.round(((1 - gg - k) / (1 - k)) * 100),
    y: Math.round(((1 - bb - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

export default function ColorConverter() {
  const [color, setColor] = useState("#2563eb");
  const rgb = useMemo(() => hexToRgb(color), [color]);

  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
  const hsv = rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null;
  const cmyk = rgb ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : null;

  const values = rgb
    ? [
        { k: "HEX", v: `#${color.replace("#", "").toLowerCase()}` },
        { k: "RGB", v: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
        { k: "HSL", v: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        { k: "HSV", v: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
        { k: "CMYK", v: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
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
