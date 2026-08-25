"use client";

import { useMemo, useState } from "react";

export default function TextDedup() {
  const [input, setInput] = useState("");
  const [trimLines, setTrimLines] = useState(true);

  const result = useMemo(() => {
    const lines = input.split(/\r?\n/).filter((l) => l.length > 0);
    const seen = new Set();
    const out = [];
    for (let line of lines) {
      const key = trimLines ? line.trim() : line;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(trimLines ? line.trim() : line);
      }
    }
    return { before: lines.length, after: out.length, text: out.join("\n") };
  }, [input, trimLines]);

  const [copied, setCopied] = useState(false);

  return (
    <div className="panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="每行一条，粘贴需要去重的文本列表"
      />
      <div className="btn-row">
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
          />
          忽略行首尾空格
        </label>
        <span className="success-text">
          {result.before} 行 → {result.after} 行，去除 {result.before - result.after} 条重复
        </span>
        <button
          className="secondary"
          disabled={!result.text}
          onClick={async () => {
            await navigator.clipboard.writeText(result.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "已复制" : "复制结果"}
        </button>
      </div>
      {result.text ? <pre className="output">{result.text}</pre> : null}
    </div>
  );
}
