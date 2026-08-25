"use client";

import { useState } from "react";

function diffLines(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) { out.push(["=", a[i]]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push(["-", a[i]]); i++; }
    else { out.push(["+", b[j]]); j++; }
  }
  while (i < m) { out.push(["-", a[i]]); i++; }
  while (j < n) { out.push(["+", b[j]]); j++; }
  return out;
}

export default function TextDiff() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  const a = left.split(/\r?\n/);
  const b = right.split(/\r?\n/);
  const diff = left || right ? diffLines(a, b) : [];

  return (
    <div className="panel">
      <div className="split">
        <div>
          <p className="success-text">原始文本</p>
          <textarea value={left} onChange={(e) => setLeft(e.target.value)} placeholder="左侧内容" />
        </div>
        <div>
          <p className="success-text">修改后文本</p>
          <textarea value={right} onChange={(e) => setRight(e.target.value)} placeholder="右侧内容" />
        </div>
      </div>
      {diff.length > 0 && (
        <pre className="output" style={{ maxHeight: 400, overflow: "auto" }}>
          {diff.map(([t, line], i) => {
            const color = t === "-" ? "#f87171" : t === "+" ? "#4ade80" : "#94a3b8";
            const sign = t === "=" ? "  " : t;
            return <div key={i} style={{ color }}>{sign} {line}</div>;
          })}
        </pre>
      )}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
        <span style={{ color: "#f87171" }}>- 红色为删除行</span> · <span style={{ color: "#4ade80" }}>+ 绿色为新增行</span>
      </p>
    </div>
  );
}
