"use client";

import { useState } from "react";

export default function TextSort() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const sortLines = (mode, dedup) => {
    let lines = input.split(/\r?\n/).filter((l) => l.trim() !== "");
    if (dedup) lines = Array.from(new Set(lines));
    const coll = new Intl.Collator("zh-Hans-CN", { numeric: true });
    switch (mode) {
      case "asc":
        lines.sort(coll.compare);
        break;
      case "desc":
        lines.sort(coll.compare).reverse();
        break;
      case "len":
        lines.sort((a, b) => a.length - b.length);
        break;
      case "random":
        for (let i = lines.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        break;
    }
    setResult(lines.join("\n"));
    setCopied(false);
  };

  return (
    <div className="panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="每行一条，粘贴需要排序的文本"
      />
      <div className="btn-row">
        <button onClick={() => sortLines("asc")}>升序 A→Z / 拼音</button>
        <button onClick={() => sortLines("desc")}>降序</button>
        <button onClick={() => sortLines("len")}>按长度</button>
        <button onClick={() => sortLines("random")}>随机打乱</button>
        <button className="secondary" onClick={() => sortLines("asc", true)}>
          升序+去重
        </button>
        {result && (
          <button
            className="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(result);
              setCopied(true);
            }}
          >
            {copied ? "已复制" : "复制结果"}
          </button>
        )}
      </div>
      {result ? <pre className="output">{result}</pre> : null}
    </div>
  );
}
