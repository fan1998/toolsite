"use client";

import { useState } from "react";

function formatCss(css, indent = "  ") {
  // 简易 CSS 格式化：按 {} 拆分
  let out = "";
  let depth = 0;
  let buf = "";
  const flush = () => {
    const t = buf.trim();
    if (t) out += indent.repeat(depth) + t + "\n";
    buf = "";
  };
  for (const ch of css.replace(/\s+/g, " ")) {
    if (ch === "{") {
      flush();
      // 把选择器和 { 合并为一行
      const lines = out.split("\n");
      const last = lines.pop();
      out = lines.join("\n") + (last ? last.replace(/\s*$/, "") : "") + " {\n";
      depth++;
    } else if (ch === "}") {
      flush();
      depth = Math.max(0, depth - 1);
      out += "}\n";
    } else if (ch === ";") {
      buf += ";\n";
      flush();
    } else {
      buf += ch;
    }
  }
  flush();
  return out;
}

function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,>~+])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export default function CssFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState(null);

  function doFormat() {
    setOutput(formatCss(input));
    calc(input);
  }
  function doMinify() {
    const m = minifyCss(input);
    setOutput(m);
    calc(input, m.length);
  }
  function calc(src, minLen) {
    setStats({
      charsIn: src.length,
      charsOut: minLen !== undefined ? minLen : outputOfFormat(src).length,
    });
  }
  function outputOfFormat(src) {
    return formatCss(src);
  }

  async function copyOut() {
    await navigator.clipboard.writeText(output);
  }

  return (
    <div className="panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"粘贴 CSS，例如：\nbody{color:#333;margin:0}.box{padding:4px}"}
        rows={9}
      />
      <div className="btn-row">
        <button className="btn" onClick={doFormat}>美化格式化</button>
        <button className="btn" onClick={doMinify}>压缩单行</button>
        <button className="btn" onClick={() => { setInput(""); setOutput(""); setStats(null); }}>清空</button>
        {output && (
          <button className="btn" onClick={copyOut} style={{ background: "var(--card)", color: "var(--foreground)" }}>
            复制结果
          </button>
        )}
      </div>

      {stats && (
        <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
          原始 {stats.charsIn.toLocaleString()} 字符 → 结果 {stats.charsOut.toLocaleString()} 字符
          {stats.charsOut < stats.charsIn &&
            `（减小 ${((1 - stats.charsOut / stats.charsIn) * 100).toFixed(1)}%）`}
        </p>
      )}

      {output && (
        <pre className="output" style={{ maxHeight: 400 }}>
          {output}
        </pre>
      )}
    </div>
  );
}
