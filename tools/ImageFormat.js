"use client";

import { useState } from "react";

const FORMATS = [
  ["image/jpeg", "JPG", "jpg"],
  ["image/png", "PNG", "png"],
  ["image/webp", "WebP", "webp"],
];

export default function ImageFormat() {
  const [img, setImg] = useState(null);
  const [results, setResults] = useState([]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image = new Image();
    image.onload = () => setImg(image);
    image.src = URL.createObjectURL(file);
  };

  const convert = () => {
    if (!img) return;
    const out = FORMATS.map(([mime, label, ext]) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (mime === "image/jpeg") {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      return { label, ext, url: canvas.toDataURL(mime, 0.9) };
    });
    setResults(out);
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <input type="file" accept="image/*" onChange={onFile} style={{ fontSize: 13 }} />
        <button onClick={convert} disabled={!img}>转换为 JPG / PNG / WebP</button>
      </div>
      {results.map((r) => (
        <div key={r.ext} className="btn-row">
          <span style={{ fontSize: 14, fontWeight: 600, minWidth: 50 }}>{r.label}</span>
          <img src={r.url} alt={r.ext} style={{ height: 40, borderRadius: 6, border: "1px solid var(--border)" }} />
          <a className="btn" href={r.url} download={`converted.${r.ext}`} style={{ textDecoration: "none", fontSize: 13 }}>下载</a>
        </div>
      ))}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>提示：JPG 不支持透明背景，透明区域会填充为白色。</p>
    </div>
  );
}
