"use client";

import { useState } from "react";

const SIZES = [16, 32, 48, 64];

export default function FaviconGenerator() {
  const [outputs, setOutputs] = useState([]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      setOutputs(
        SIZES.map((s) => {
          const canvas = document.createElement("canvas");
          canvas.width = s;
          canvas.height = s;
          canvas.getContext("2d").drawImage(img, sx, sy, size, size, 0, 0, s, s);
          return { s, url: canvas.toDataURL("image/png") };
        })
      );
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <input type="file" accept="image/*" onChange={onFile} style={{ fontSize: 13 }} />
      </div>
      {outputs.length > 0 && (
        <>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>自动居中裁剪为正方形，生成网站图标常用尺寸：</p>
          <div className="btn-row" style={{ alignItems: "flex-end" }}>
            {outputs.map((o) => (
              <div key={o.s} style={{ textAlign: "center" }}>
                <img src={o.url} alt={`${o.s}px`} style={{ width: o.s, height: o.s, borderRadius: 6, border: "1px solid var(--border)", display: "block", margin: "0 auto 6px" }} />
                <span style={{ fontSize: 12, color: "var(--muted)" }}>{o.s}px</span>
                <br />
                <a className="btn" href={o.url} download={`favicon-${o.s}.png`} style={{ textDecoration: "none", fontSize: 12, padding: "5px 12px" }}>下载</a>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 12.5 }}>使用方法：将 32px 版本重命名为 favicon.ico（或保留 png），放到网站根目录。</p>
        </>
      )}
    </div>
  );
}
