"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfCrop() {
  const [file, setFile] = useState(null);
  const [margin, setMargin] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [busy, setBusy] = useState(false);

  const onPick = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    try {
      const doc = await PDFDocument.load(await readFileBytes(f));
      setPageCount(doc.getPageCount());
    } catch (err) {
      setPageCount(0);
      alert("无法读取 PDF：" + err.message);
    }
  };

  const crop = async () => {
    if (!file) return;
    const m = Math.max(0, Math.min(45, margin));
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      src.getPages().forEach((page) => {
        const box = page.getMediaBox();
        const w = box.width;
        const h = box.height;
        const nx = box.x + (w * m) / 100;
        const ny = box.y + (h * m) / 100;
        const nw = w - (2 * w * m) / 100;
        const nh = h - (2 * h * m) / 100;
        page.setMediaBox(nx, ny, nw, nh);
        page.setCropBox(nx, ny, nw, nh);
      });
      const bytes = await src.save();
      downloadBytes(bytes, "cropped.pdf");
    } catch (err) {
      alert("裁剪失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" accept="application/pdf,.pdf" onChange={onPick} />
      <div className="btn-row" style={{ alignItems: "center" }}>
        <label style={{ fontSize: 14 }}>
          每边留白 {margin}%
          <input
            type="range"
            min="0"
            max="45"
            value={margin}
            onChange={(e) => setMargin(Number(e.target.value))}
            style={{ marginLeft: 8, width: 160 }}
          />
        </label>
        <button onClick={crop} disabled={!file || busy}>
          {busy ? "处理中…" : "裁剪并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">
          共 {pageCount} 页（{fmtBytes(file.size)}），从四周按百分比裁剪边距
        </p>
      )}
      <p className="intro" style={{ fontSize: 12, marginTop: 8 }}>
        裁剪会缩小每页的可见区域（不裁剪页面内容本身），返回后的页面四周留白减少。
      </p>
    </div>
  );
}
