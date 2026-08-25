"use client";

import { useState } from "react";

export default function UrlCodec() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (mode) => {
    setCopied(false);
    try {
      setOutput(
        mode === "enc"
          ? encodeURIComponent(input)
          : decodeURIComponent(input.replace(/\+/g, "%20"))
      );
    } catch (e) {
      setOutput("");
    }
  };

  return (
    <div className="panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入 URL 或含中文/特殊字符的文本"
      />
      <div className="btn-row">
        <button onClick={() => run("enc")}>URL编码</button>
        <button onClick={() => run("dec")}>URL解码</button>
        <button
          className="secondary"
          disabled={!output}
          onClick={async () => {
            await navigator.clipboard.writeText(output);
            setCopied(true);
          }}
        >
          {copied ? "已复制" : "复制结果"}
        </button>
      </div>
      {output ? <pre className="output">{output}</pre> : null}
    </div>
  );
}
