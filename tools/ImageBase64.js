"use client";

import { useState } from "react";

export default function ImageBase64() {
  const [dataUrl, setDataUrl] = useState("");
  const [b64, setB64] = useState("");
  const [copied, setCopied] = useState(false);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setDataUrl(r.result);
      setB64(r.result);
    };
    r.readAsDataURL(f);
  };

  const download = () => {
    const a = document.createElement("a");
    a.href = b64.trim();
    a.download = "image";
    a.click();
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <input type="file" accept="image/*" onChange={onFile} style={{ fontSize: 13 }} />
      </div>
      {dataUrl && (
        <div className="qr-result">
          <img src={dataUrl} alt="预览" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }} />
          <p style={{ fontSize: 12, color: "var(--muted)" }}>大小：{Math.round(dataUrl.length / 1024)} KB（Base64编码后）</p>
        </div>
      )}
      <textarea value={b64} onChange={(e) => setB64(e.target.value)} placeholder="或在此粘贴 Base64 / DataURL，点击下载还原图片" style={{ minHeight: 100 }} />
      <div className="btn-row">
        {dataUrl && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(b64); setCopied(true); }}>
            {copied ? "已复制" : "复制Base64"}
          </button>
        )}
        <button onClick={download}>Base64 → 下载图片</button>
      </div>
    </div>
  );
}
