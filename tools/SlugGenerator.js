"use client";

import { useState } from "react";

export default function SlugGenerator() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const slugify = (sep) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[!@#$%^&*()+=\[\]{};:'"\\|,.<>\/?~`""'']/g, "")
      .replace(/[\s_]+/g, sep)
      .replace(new RegExp(`${sep}{2,}`, "g"), sep)
      .replace(new RegExp(`^${sep}|${sep}$`, "g"), "");
  };

  const run = (sep) => {
    setResult(slugify(sep));
    setCopied(false);
  };

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入标题，如：10 Tips for Better Code 或 中文标题测试" style={{ minHeight: 100 }} />
      <div className="btn-row">
        <button onClick={() => run("-")}>生成 Slug（连字符）</button>
        <button onClick={() => run("_")}>生成 Slug（下划线）</button>
        {result && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); }}>
            {copied ? "已复制" : "复制"}
          </button>
        )}
      </div>
      {result && <pre className="output">{result}</pre>}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>提示：中文字符会保留，搜索引擎可正常识别；如需纯 ASCII 可先翻译为英文。</p>
    </div>
  );
}
