"use client";

import { useState } from "react";

export default function ImageCompressor() {
  const [result, setResult] = useState(null);
  const [quality, setQuality] = useState(0.7);

  const compress = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          setResult({
            url: URL.createObjectURL(blob),
            before: file.size,
            after: blob.size,
            w: img.width,
            h: img.height,
          });
          URL.revokeObjectURL(url);
        },
        "image/jpeg",
        quality
      );
    };
    img.src = url;
  };

  const kb = (n) => `${Math.max(1, Math.round(n / 1024))} KB`;

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ fontSize: 14 }}>
          压缩质量：{Math.round(quality * 100)}%
          <input type="range" min="0.1" max="0.95" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} style={{ marginLeft: 10, verticalAlign: "middle" }} />
        </label>
      </div>
      <div className="btn-row">
        <input type="file" accept="image/*" onChange={compress} style={{ fontSize: 13 }} />
      </div>
      {result && (
        <>
          <div className="qr-result">
            <img src={result.url} alt="压缩结果" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} />
          </div>
          <p style={{ textAlign: "center", fontSize: 14 }}>
            {result.w}×{result.h} · {kb(result.before)} → <strong style={{ color: "#059669" }}>{kb(result.after)}</strong>
            （节省 {Math.max(0, Math.round((1 - result.after / result.before) * 100))}%）
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <a className="btn" href={result.url} download="compressed.jpg" style={{ textDecoration: "none" }}>下载压缩图</a>
          </div>
        </>
      )}
    </div>
  );
}
