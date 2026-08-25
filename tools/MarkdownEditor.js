"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";

const SAMPLE = "# 标题\n\n这是一段 **Markdown** 文本，右侧实时预览。\n\n- 列表项一\n- 列表项二\n\n> 引用内容\n\n```js\nconsole.log(\"hello\");\n```\n";

export default function MarkdownEditor() {
  const [text, setText] = useState(SAMPLE);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("md_content");
    if (saved !== null) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("md_content", text);
  }, [text]);

  const html = marked.parse(text);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="panel">
      <div className="split">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="在此输入 Markdown…"
        />
        <div
          className="md-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div className="btn-row">
        <button className="secondary" onClick={copyHtml}>
          {copied ? "已复制 HTML" : "复制 HTML"}
        </button>
        <button className="secondary" onClick={() => setText("")}>
          清空
        </button>
      </div>
    </div>
  );
}
