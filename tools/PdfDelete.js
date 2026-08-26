"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import { readFileBytes, downloadBytes, parseRanges, fmtBytes } from "../lib/pdf-utils";

export default function PdfDelete() {
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

  const remove = async () => {
    if (!file) return;
    const del = new Set(parseRanges(range, pageCount));
    if (del.size === 0) {
      alert("请输入要删除的页码范围，如 2-4");
      return;
    }
    if (del.size >= pageCount) {
      alert("不能删除全部页面");
      return;
    }
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      const keep = [];
      for (let i = 0; i < pageCount; i++) if (!del.has(i)) keep.push(i);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, keep);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      downloadBytes(bytes, "deleted.pdf");
    } catch (err) {
      alert("删除失败：" + err.message);
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
          placeholder="要删除的页，如 2-4"
          style={{ maxWidth: 220 }}
        />
        <button onClick={remove} disabled={!file || busy}>
          {busy ? "处理中…" : "删除并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">
          共 {pageCount} 页（{fmtBytes(file.size)}），删除后剩余 {pageCount - new Set(parseRanges(range, pageCount)).size} 页
        </p>
      )}
    </div>
  );
}
