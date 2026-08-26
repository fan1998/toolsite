"use client";

import { useState } from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "@cantoo/pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfWatermark() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("CONFIDENTIAL");
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

  const apply = async () => {
    if (!file || !text.trim()) return;
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      const font = await src.embedFont(StandardFonts.Helvetica);
      src.getPages().forEach((page) => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2,
          y: height / 2,
          size: Math.min(72, width / 10),
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity: 0.18,
          rotate: degrees(45),
        });
      });
      const bytes = await src.save();
      downloadBytes(bytes, "watermarked.pdf");
    } catch (err) {
      alert("加水印失败：" + err.message);
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="水印文字（建议用英文/网址）"
          style={{ maxWidth: 240 }}
        />
        <button onClick={apply} disabled={!file || busy}>
          {busy ? "处理中…" : "添加水印并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">共 {pageCount} 页（{fmtBytes(file.size)}），每页居中斜向水印</p>
      )}
      <p className="intro" style={{ fontSize: 12, marginTop: 8 }}>
        使用 PDF 标准内置字体渲染，建议输入英文或数字（中文可能无法显示）。水印为浅灰色半透明斜向文字。
      </p>
    </div>
  );
}
