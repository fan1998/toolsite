"use client";

import { useMemo, useState } from "react";

export default function PlaceholderImage() {
  const [w, setW] = useState(640);
  const [h, setH] = useState(360);
  const [bg, setBg] = useState("#2563eb");
  const [fg, setFg] = useState("#ffffff");
  const [label, setLabel] = useState("640 × 360");

  const svg = useMemo(() => {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="${bg}"/><text x="50%" y="50%" fill="${fg}" font-family="sans-serif" font-size="${Math.max(
      16,
      Math.min(w, h) * 0.08
    )}" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`;
  }, [w, h, bg, fg, label]);

  const svgUrl = useMemo(
    () => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
    [svg]
  );

  const download = (type) => {
    if (type === "svg") {
      const a = document.createElement("a");
      a.href = svgUrl;
      a.download = `placeholder-${w}x${h}.svg`;
      a.click();
    } else {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `placeholder-${w}x${h}.png`;
        a.click();
      };
      img.src = svgUrl;
    }
  };

  return (
    <div className="panel">
      <div className="btn-row" style={{ alignItems: "center" }}>
        <label style={{ fontSize: 13 }}>
          宽
          <input
            type="number"
            value={w}
            onChange={(e) => setW(Math.max(1, Number(e.target.value) || 1))}
            style={{ width: 80, marginLeft: 4 }}
          />
        </label>
        <label style={{ fontSize: 13 }}>
          高
          <input
            type="number"
            value={h}
            onChange={(e) => setH(Math.max(1, Number(e.target.value) || 1))}
            style={{ width: 80, marginLeft: 4 }}
          />
        </label>
        <label style={{ fontSize: 13 }}>
          背景
          <input
            type="color"
            value={bg}
            onChange={(e) => setBg(e.target.value)}
            style={{
              width: 40,
              height: 32,
              border: "none",
              background: "none",
              marginLeft: 4,
              verticalAlign: "middle",
            }}
          />
        </label>
        <label style={{ fontSize: 13 }}>
          文字色
          <input
            type="color"
            value={fg}
            onChange={(e) => setFg(e.target.value)}
            style={{
              width: 40,
              height: 32,
              border: "none",
              background: "none",
              marginLeft: 4,
              verticalAlign: "middle",
            }}
          />
        </label>
      </div>
      <div className="btn-row">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="占位文字"
          style={{ maxWidth: 300 }}
        />
        <button onClick={() => download("svg")}>下载 SVG</button>
        <button className="secondary" onClick={() => download("png")}>
          下载 PNG
        </button>
      </div>
      <div style={{ marginTop: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={svgUrl}
          alt="占位图预览"
          style={{
            maxWidth: "100%",
            border: "1px solid var(--border)",
            borderRadius: 8,
          }}
        />
      </div>
    </div>
  );
}
