"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { readFileBytes, downloadBytes, parseRanges, fmtBytes } from "../lib/pdf-utils";

export default function PdfExtract() {
  const [file, setFile] = useState(null);
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

  const extract = async () => {
    if (!file) return;
    const idx = parseRanges(range, pageCount);
    if (idx.length === 0) {
      alert("请输入有效的页码范围，如 1-3,5");
      return;
    }
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, idx);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      downloadBytes(bytes, "extracted.pdf");
    } catch (err) {
      alert("提取失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" accept="application/pdf,.pdf" onChange={onPick} />
      <div className="btn-row" style={{ alignItems: "center" }}>
        <input
          type="text"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          placeholder="页范围，如 1-3,5"
          style={{ maxWidth: 220 }}
        />
        <button onClick={extract} disabled={!file || busy}>
          {busy ? "处理中…" : "提取并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">
          共 {pageCount} 页（{fmtBytes(file.size)}），输入要提取的页
        </p>
      )}
    </div>
  );
}
