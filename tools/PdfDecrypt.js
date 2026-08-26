"use client";

import { useState } from "react";
import { PDFDocument } from "@cantoo/pdf-lib";
import { readFileBytes, downloadBytes, fmtBytes } from "../lib/pdf-utils";

export default function PdfDecrypt() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [busy, setBusy] = useState(false);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPageCount(0);
  };

  const decrypt = async () => {
    if (!file || !password) {
      alert("请选择文件并输入密码");
      return;
    }
    setBusy(true);
    try {
      const raw = await readFileBytes(file);
      const src = await PDFDocument.load(raw, { password });
      setPageCount(src.getPageCount());
      // 保存时不加密，得到无密码版本
      const bytes = await src.save();
      downloadBytes(bytes, "decrypted.pdf");
    } catch (err) {
      alert("解密失败：密码错误或文件损坏");
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
          placeholder="输入文件打开密码"
          style={{ maxWidth: 220 }}
        />
        <button onClick={decrypt} disabled={!file || busy}>
          {busy ? "处理中…" : "解密并下载"}
        </button>
      </div>
      {pageCount > 0 && (
        <p className="success-text">解密成功，共 {pageCount} 页，已去除打开密码</p>
      )}
      <p className="intro" style={{ fontSize: 12, marginTop: 8 }}>
        仅支持去除通过本工具加密或使用标准 PDF 密码加密的文件。操作在浏览器本地完成。
      </p>
    </div>
  );
}
