"use client";

import { useState } from "react";

const enc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const dec = (s) => {
  const d = new DOMParser().parseFromString(s, "text/html");
  return d.documentElement.textContent;
};

export default function HtmlEntity() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (mode) => {
    setResult(mode === "enc" ? enc(text) : dec(text));
    setCopied(false);
  };

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入含尖括号、&和引号的HTML代码或实体" />
      <div className="btn-row">
        <button onClick={() => run("enc")}>转实体</button>
        <button onClick={() => run("dec")}>实体还原</button>
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
