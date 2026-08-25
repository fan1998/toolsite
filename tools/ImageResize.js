"use client";

import { useState } from "react";

export default function ImageResize() {
  const [info, setInfo] = useState(null);
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [ratio, setRatio] = useState(true);
  const [result, setResult] = useState("");

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setInfo(img);
      setW(img.width);
      setH(img.height);
    };
    img.src = URL.createObjectURL(file);
    e.target._file = file;
  };

  const onW = (v) => {
    setW(v);
    if (ratio && info && v) setH(Math.round((Number(v) / info.width) * info.height));
  };
  const onH = (v) => {
    setH(v);
    if (ratio && info && v) setW(Math.round((Number(v) / info.height) * info.width));
  };

  const resize = () => {
    if (!info) return;
    const canvas = document.createElement("canvas");
    canvas.width = Number(w);
    canvas.height = Number(h);
    canvas.getContext("2d").drawImage(info, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      setResult(URL.createObjectURL(blob));
    }, "image/png");
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <input type="file" accept="image/*" onChange={onFile} style={{ fontSize: 13 }} />
      </div>
      {info && (
        <>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>原图：{info.width} × {info.height}</p>
          <div className="btn-row">
            <input type="number" value={w} onChange={(e) => onW(e.target.value)} placeholder="宽" style={{ width: 110 }} />
            <span>×</span>
            <input type="number" value={h} onChange={(e) => onH(e.target.value)} placeholder="高" style={{ width: 110 }} />
            <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" checked={ratio} onChange={(e) => setRatio(e.target.checked)} />
              锁定比例
            </label>
            <button onClick={resize}>调整尺寸</button>
          </div>
          {result && (
            <>
              <div className="qr-result">
                <img src={result} alt="结果" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }} />
              </div>
              <div className="btn-row" style={{ justifyContent: "center" }}>
                <a className="btn" href={result} download="resized.png" style={{ textDecoration: "none" }}>下载 PNG</a>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
