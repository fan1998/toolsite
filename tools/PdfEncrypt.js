"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfEncrypt() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
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

  const encrypt = async () => {
    if (!file || !password) {
      alert("请选择文件并设置密码");
      return;
    }
    setBusy(true);
    try {
      const src = await PDFDocument.load(await readFileBytes(file));
      src.encrypt({ userPassword: password, ownerPassword: password });
      const bytes = await src.save();
      downloadBytes(bytes, "encrypted.pdf");
    } catch (err) {
      alert("加密失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" accept="application/pdf,.pdf" onChange={onPick} />
      <div className="btn-row" style={{ alignItems: "center" }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="设置打开密码"
          style={{ maxWidth: 220 }}
        />
        <button onClick={encrypt} disabled={!file || busy}>
          {busy ? "处理中…" : "加密并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">
          共 {pageCount} 页（{fmtBytes(file.size)}），加密后打开需输入此密码
        </p>
      )}
      <p className="intro" style={{ fontSize: 12, marginTop: 8 }}>
        使用 AES-128 加密（PDF 标准），请务必记住密码，遗忘则无法找回。加密操作在你浏览器本地完成，文件不会上传。
      </p>
    </div>
  );
}
