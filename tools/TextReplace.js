"use client";

import { useState } from "react";

export default function TextReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    setError("");
    setCopied(false);
    if (!find) return;
    try {
      const pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(pattern, "g" + (caseSensitive ? "" : "i"));
      let n = 0;
      const out = text.replace(re, (...args) => {
        n++;
        return replace;
      });
      setResult(out);
      setCount(n);
    } catch (e) {
      setError("正则表达式无效，请检查语法");
      setResult("");
      setCount(0);
    }
  };

  return (
    <div className="panel">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="粘贴原始文本"
      />
      <div className="btn-row">
        <input
          type="text"
          value={find}
          onChange={(e) => setFind(e.target.value)}
          placeholder="查找内容"
          style={{ flex: 1, minWidth: 140 }}
        />
        <input
          type="text"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          placeholder="替换为"
          style={{ flex: 1, minWidth: 140 }}
        />
      </div>
      <div className="btn-row">
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
          区分大小写
        </label>
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} />
          正则模式
        </label>
        <button onClick={run}>全部替换</button>
        {count > 0 && <span className="success-text">已替换 {count} 处</span>}
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
      {error && <p className="error-text">{error}</p>}
      {result ? <pre className="output">{result}</pre> : null}
    </div>
  );
}
