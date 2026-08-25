"use client";

import { useState } from "react";

export default function UnicodeConvert() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const toUnicode = () =>
    Array.from(text)
      .map((c) => (c.charCodeAt(0) > 127 ? "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0") : c))
      .join("");

  const fromUnicode = () =>
    text.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入中文/Emoji 或 \uXXXX 序列" />
      <div className="btn-row">
        <button onClick={() => { setResult(toUnicode()); setCopied(false); }}>文字 → \uXXXX</button>
        <button onClick={() => { setResult(fromUnicode()); setCopied(false); }}>\uXXXX → 文字</button>
        {result && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); }}>
            {copied ? "已复制" : "复制结果"}
          </button>
        )}
      </div>
      {result && <pre className="output">{result}</pre>}
    </div>
  );
}
