"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);

  const onPick = (e) => setFiles(Array.from(e.target.files || []));

  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true);
    try {
      const merged = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await readFileBytes(f));
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      downloadBytes(bytes, "merged.pdf");
    } catch (err) {
      alert("合并失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  const total = files.reduce((s, f) => s + f.size, 0);

  return (
    <div className="panel">
      <input type="file" multiple accept="application/pdf,.pdf" onChange={onPick} />
      {files.length > 0 && (
        <p className="success-text">
          已选择 {files.length} 个文件，共 {fmtBytes(total)}，按顺序合并
        </p>
      )}
      <div className="btn-row">
        <button onClick={merge} disabled={files.length < 2 || busy}>
          {busy ? "处理中…" : "合并并下载"}
        </button>
      </div>
    </div>
  );
}
