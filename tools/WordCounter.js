"use client";

import { useMemo, useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const noSpace = text.replace(/\s/g, "").length;
    const cjk = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
    const enWords = (text.match(/[a-zA-Z0-9]+(?:[''-][a-zA-Z0-9]+)*/g) || []).length;
    const lines = text ? text.split(/\r?\n/).length : 0;
    return { chars, noSpace, cjk, enWords, lines };
  }, [text]);

  const items = [
    { k: "总字符数", v: stats.chars },
    { k: "不含空格", v: stats.noSpace },
    { k: "中文字数", v: stats.cjk },
    { k: "英文单词数", v: stats.enWords },
    { k: "行数", v: stats.lines },
  ];

  return (
    <div className="panel">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="粘贴或输入文本，实时统计"
        style={{ minHeight: 220 }}
      />
      <div className="kv-grid">
        {items.map((x) => (
          <div key={x.k} className="kv-item" style={{ cursor: "default" }}>
            <div className="k">{x.k}</div>
            <div className="v">{x.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
