"use client";

import { useState } from "react";

export default function ColorPalette() {
  const [colors, setColors] = useState([]);
  const [img, setImg] = useState(null);
  const [copied, setCopied] = useState("");

  const extract = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => {
      setImg(image.src);
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 200 / Math.max(image.width, image.height));
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const buckets = {};
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue;
        const key = `${Math.round(data[i] / 24) * 24},${Math.round(data[i + 1] / 24) * 24},${Math.round(data[i + 2] / 24) * 24}`;
        buckets[key] = (buckets[key] || 0) + 1;
      }
      const top = Object.entries(buckets)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([k]) => {
          const [r, g, b] = k.split(",").map(Number);
          return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
        });
      setColors(top);
    };
    image.src = URL.createObjectURL(file);
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <input type="file" accept="image/*" onChange={extract} style={{ fontSize: 13 }} />
      </div>
      {img && (
        <div className="qr-result">
          <img src={img} alt="原图" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, marginBottom: 12 }} />
        </div>
      )}
      {colors.length > 0 && (
        <div className="kv-grid">
          {colors.map((c) => (
            <div key={c} className="kv-item" onClick={() => { navigator.clipboard.writeText(c); setCopied(c); }}>
              <div style={{ height: 40, borderRadius: 6, background: c, marginBottom: 6 }} />
              <div className="v">{copied === c ? "已复制!" : c}</div>
            </div>
          ))}
        </div>
      )}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>提取图片中出现频率最高的 8 种主色调，点击色块复制 HEX 值。</p>
    </div>
  );
}
