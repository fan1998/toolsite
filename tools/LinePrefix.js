"use client";

import { useState } from "react";

export default function LinePrefix() {
  const [text, setText] = useState("");
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [numbering, setNumbering] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    const lines = text.split(/\r?\n/).filter((l) => l !== "" || true);
    const out = lines
      .filter((l) => l.trim() !== "")
      .map((l, i) => `${numbering ? `${i + 1}. ` : ""}${prefix}${l}${suffix}`)
      .join("\n");
    setResult(out);
    setCopied(false);
  };

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="每行一条，批量添加前缀/后缀" />
      <div className="btn-row">
        <input type="text" value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="行首前缀" style={{ flex: 1, minWidth: 120 }} />
        <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder="行尾后缀" style={{ flex: 1, minWidth: 120 }} />
      </div>
      <div className="btn-row">
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={numbering} onChange={(e) => setNumbering(e.target.checked)} />
          添加序号
        </label>
        <button onClick={run}>处理</button>
        {result && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); }}>
            {copied ? "已复制" : "复制"}
          </button>
        )}
      </div>
      {result && <pre className="output">{result}</pre>}
    </div>
  );
}
