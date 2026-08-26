"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfPageNumbers() {
  const [file, setFile] = useState(null);
  const [start, setStart] = useState(1);
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

  const add = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      const font = await src.embedFont(StandardFonts.Helvetica);
      let n = Math.max(1, parseInt(start, 10) || 1);
      src.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        const label = String(n++);
        const w = font.widthOfTextAtSize(label, 11);
        page.drawText(label, {
          x: (width - w) / 2,
          y: 22,
          size: 11,
          font,
          color: rgb(0.4, 0.4, 0.4),
        });
      });
      const bytes = await src.save();
      downloadBytes(bytes, "numbered.pdf");
    } catch (err) {
      alert("添加页码失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" accept="application/pdf,.pdf" onChange={onPick} />
      <div className="btn-row" style={{ alignItems: "center" }}>
        <label style={{ fontSize: 14 }}>
          起始页码
          <input
            type="number"
            min="1"
            value={start}
            onChange={(e) => setStart(Number(e.target.value) || 1)}
            style={{ width: 90, marginLeft: 6 }}
          />
        </label>
        <button onClick={add} disabled={!file || busy}>
          {busy ? "处理中…" : "添加页码并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">
          共 {pageCount} 页（{fmtBytes(file.size)}），在每页底部居中显示页码
        </p>
      )}
    </div>
  );
}
