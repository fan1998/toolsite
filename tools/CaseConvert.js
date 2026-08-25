"use client";

import { useState } from "react";

const words = (s) => s.trim().split(/[\s_-]+/).filter(Boolean);

const transforms = {
  大写: (s) => s.toUpperCase(),
  小写: (s) => s.toLowerCase(),
  首字母大写: (s) => s.replace(/\b\w/g, (c) => c.toUpperCase()),
  camelCase: (s) =>
    words(s).map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase())).join(""),
  PascalCase: (s) =>
    words(s).map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(""),
  snake_case: (s) => words(s).map((w) => w.toLowerCase()).join("_"),
  "kebab-case": (s) => words(s).map((w) => w.toLowerCase()).join("-"),
};

export default function CaseConvert() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (fn) => {
    setResult(fn(text));
    setCopied(false);
  };

  return (
    <div className="panel">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入要转换大小写/命名格式的文本"
        style={{ minHeight: 120 }}
      />
      <div className="btn-row">
        {Object.keys(transforms).map((k) => (
          <button key={k} onClick={() => run(transforms[k])}>
            {k}
          </button>
        ))}
      </div>
      {result && (
        <>
          <div className="btn-row">
            <button
              className="secondary"
              onClick={async () => {
                await navigator.clipboard.writeText(result);
                setCopied(true);
              }}
            >
              {copied ? "已复制" : "复制结果"}
            </button>
          </div>
          <pre className="output">{result}</pre>
        </>
      )}
    </div>
  );
}
