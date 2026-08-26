"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfReorder() {
  const [file, setFile] = useState(null);
  const [order, setOrder] = useState("");
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

  const reorder = async () => {
    if (!file) return;
    const nums = order
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= pageCount);
    if (nums.length === 0) {
      alert("请输入新的页顺序，如 3,1,2");
      return;
    }
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      const idx = nums.map((n) => n - 1);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(src, idx);
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save();
      downloadBytes(bytes, "reordered.pdf");
    } catch (err) {
      alert("排序失败：" + err.message);
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
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          placeholder="新顺序，如 3,1,2"
          style={{ maxWidth: 220 }}
        />
        <button onClick={reorder} disabled={!file || busy}>
          {busy ? "处理中…" : "排序并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">
          共 {pageCount} 页（{fmtBytes(file.size)}），按逗号输入新顺序（需包含所有页）
        </p>
      )}
    </div>
  );
}
