"use client";

import { useState } from "react";

export default function JsonFormat() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (indent) => {
    setCopied(false);
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e) {
      setOutput("");
      setError(e.message);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
  };

  return (
    <div className="panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='在此粘贴 JSON，例如 {"name":"工具箱","version":1}'
      />
      <div className="btn-row">
        <button onClick={() => run(2)}>格式化</button>
        <button onClick={() => run(0)}>压缩</button>
        <button className="secondary" onClick={copy} disabled={!output}>
          {copied ? "已复制" : "复制结果"}
        </button>
      </div>
      {error ? (
        <p className="error-text">校验失败：{error}</p>
      ) : output ? (
        <pre className="output">{output}</pre>
      ) : (
        <p className="success-text">等待输入…</p>
      )}
    </div>
  );
}
