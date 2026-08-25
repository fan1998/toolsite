"use client";

import { useState } from "react";
import QRCode from "qrcode";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  const generate = async () => {
    if (!text.trim()) return;
    const url = await QRCode.toDataURL(text.trim(), {
      width: 320,
      margin: 2,
      errorCorrectionLevel: "M",
    });
    setDataUrl(url);
  };

  return (
    <div className="panel">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && generate()}
        placeholder="输入网址或文字，如 https://example.com"
      />
      <div className="btn-row">
        <button onClick={generate}>生成二维码</button>
        {dataUrl && (
          <a className="btn" href={dataUrl} download="qrcode.png" style={{ textDecoration: "none" }}>
            下载 PNG
          </a>
        )}
      </div>
      {dataUrl && (
        <div className="qr-result">
          <img src={dataUrl} alt="二维码" width={280} height={280} />
        </div>
      )}
    </div>
  );
}
