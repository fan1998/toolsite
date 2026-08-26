"use client";

import { useState } from "react";
import { PDFDocument, degrees } from "@cantoo/pdf-lib";
import { readFileBytes, downloadBytes, parseRanges, fmtBytes } from "../lib/pdf-utils";

export default function PdfRotate() {
  const [file, setFile] = useState(null);
  const [angle, setAngle] = useState(90);
  const [range, setRange] = useState("");
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

  const rotate = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      const targets = range.trim()
        ? new Set(parseRanges(range, pageCount))
        : new Set(src.getPageIndices());
      src.getPages().forEach((page, i) => {
        if (targets.has(i)) {
          page.setRotation(degrees((page.getRotation().angle + angle) % 360));
        }
      });
      const bytes = await src.save();
      downloadBytes(bytes, "rotated.pdf");
    } catch (err) {
      alert("旋转失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" accept="application/pdf,.pdf" onChange={onPick} />
      <div className="btn-row" style={{ alignItems: "center" }}>
        {[90, 180, 270].map((a) => (
          <label key={a} style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}>
            <input type="radio" name="angle" checked={angle === a} onChange={() => setAngle(a)} />
            {a}°
          </label>
        ))}
        <input
          type="text"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          placeholder="页范围(留空=全部)"
          style={{ maxWidth: 200 }}
        />
        <button onClick={rotate} disabled={!file || busy}>
          {busy ? "处理中…" : "旋转并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">共 {pageCount} 页（{fmtBytes(file.size)}）</p>
      )}
    </div>
  );
}
