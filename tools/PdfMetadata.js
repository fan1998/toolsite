"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfMetadata() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [keywords, setKeywords] = useState("");
  const [busy, setBusy] = useState(false);

  const onPick = (e) => setFile(e.target.files?.[0] || null);
  const clear =
    !title && !author && !subject && !keywords;

  const save = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      src.setTitle(title || "Untitled");
      src.setAuthor(author);
      src.setSubject(subject);
      src.setKeywords(keywords);
      const bytes = await src.save();
      downloadBytes(bytes, "metadata.pdf");
    } catch (err) {
      alert("保存失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" accept="application/pdf,.pdf" onChange={onPick} />
      <div className="kv-grid">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="标题" />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="作者" />
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="主题" />
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="关键词(逗号分隔)" />
      </div>
      <div className="btn-row">
        <button onClick={save} disabled={!file || busy}>
          {busy ? "处理中…" : "保存并下载"}
        </button>
        {clear && file && <p className="error-text">留空会写入空值，如需仅读取请直接下载</p>}
      </div>
      {file && (
        <p className="success-text">已选择 {file.name}（{fmtBytes(file.size)}）</p>
      )}
    </div>
  );
}
