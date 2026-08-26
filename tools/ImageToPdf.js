"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { downloadBytes } from "../lib/pdf-utils";

export default function ImageToPdf() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);

  const onPick = (e) => setFiles(Array.from(e.target.files || []));

  const convert = async () => {
    if (files.length === 0) return;
    setBusy(true);
    try {
      const doc = await PDFDocument.create();
      for (const f of files) {
        const bytes = new Uint8Array(await f.arrayBuffer());
        const isPng = /\.png$/i.test(f.name) || f.type === "image/png";
        const img = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        const page = doc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      const out = await doc.save();
      downloadBytes(out, "images-to-pdf.pdf");
    } catch (err) {
      alert("转换失败：" + err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="panel">
      <input type="file" multiple accept="image/png,image/jpeg,image/jpg,image/webp,.png,.jpg,.jpeg,.webp" onChange={onPick} />
      {files.length > 0 && (
        <p className="success-text">已选择 {files.length} 张图片，每张一页（按选择顺序）</p>
      )}
      <div className="btn-row">
        <button onClick={convert} disabled={files.length === 0 || busy}>
          {busy ? "处理中…" : "转换为 PDF"}
        </button>
      </div>
      <p className="intro" style={{ fontSize: 12, marginTop: 8 }}>
        支持 PNG / JPG / WebP，每张图片单独一页，页面尺寸与图片一致。操作在浏览器本地完成，图片不上传。
      </p>
    </div>
  );
}
