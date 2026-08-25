"use client";

import { useMemo, useState } from "react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");

  const { matches, error, count } = useMemo(() => {
    if (!pattern) return { matches: [], error: "", count: 0 };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const ms = [...text.matchAll(re)];
      return { matches: ms, error: "", count: ms.length };
    } catch (e) {
      return { matches: [], error: e.message, count: 0 };
    }
  }, [pattern, flags, text]);

  return (
    <div className="panel">
      <div className="btn-row">
        <span style={{ fontFamily: "monospace" }}>/</span>
        <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="正则表达式，如 \d+" style={{ flex: 1, minWidth: 160 }} />
        <span style={{ fontFamily: "monospace" }}>/</span>
        <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" style={{ width: 60 }} />
        {count > 0 && <span className="success-text">匹配 {count} 处</span>}
      </div>
      {error && <p className="error-text">正则语法错误：{error}</p>}
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入测试文本" />
      {matches.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {matches.slice(0, 50).map((m, i) => (
            <pre className="output" key={i} style={{ marginBottom: 6 }}>
              {`#${i + 1} "${m[0]}" 位置 ${m.index}` + (m.length > 1 ? ` 分组: [${m.slice(1).join(", ")}]` : "")}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
}
