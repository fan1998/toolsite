"use client";

import { useState } from "react";

export default function TextCleaner() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const clean = (opts) => {
    let t = text;
    if (opts.spaces) t = t.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n");
    if (opts.emptyLines) t = t.replace(/\n{2,}/g, "\n").replace(/^\n+|\n+$/g, "");
    if (opts.trim) t = t.split("\n").map((l) => l.trim()).join("\n");
    if (opts.width) t = t.replace(/[！-～]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/\u3000/g, " ");
    setResult(t);
    setCopied(false);
  };

  const cleanAll = () => clean({ spaces: true, emptyLines: true, trim: true, width: false });

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="粘贴需要清理的文本" />
      <div className="btn-row">
        <button onClick={cleanAll}>一键清理</button>
        <button className="secondary" onClick={() => clean({ spaces: true, emptyLines: false, trim: false, width: false })}>仅去多余空格</button>
        <button className="secondary" onClick={() => clean({ spaces: false, emptyLines: true, trim: false, width: false })}>仅去空行</button>
        <button className="secondary" onClick={() => clean({ spaces: true, emptyLines: true, trim: true, width: true })}>清理+全角转半角</button>
        {result && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); }}>
            {copied ? "已复制" : "复制"}
          </button>
        )}
      </div>
      {result && <pre className="output" style={{ fontFamily: "inherit" }}>{result}</pre>}
    </div>
  );
}
