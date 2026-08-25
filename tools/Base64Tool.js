"use client";

import { useState } from "react";

const encode = (text) => {
  const bytes = new TextEncoder().encode(text);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
};

const decode = (b64) => {
  const bin = atob(b64.trim());
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = (mode) => {
    setCopied(false);
    setError("");
    try {
      setOutput(mode === "enc" ? encode(input) : decode(input));
    } catch (e) {
      setOutput("");
      setError("解码失败：输入的不是有效的 Base64 字符串");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setError("");
  };

  return (
    <div className="panel">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="输入要编码或解码的文本"
      />
      <div className="btn-row">
        <button onClick={() => run("enc")}>编码 →</button>
        <button onClick={() => run("dec")}>← 解码</button>
        <button className="secondary" onClick={swap} disabled={!output}>
          结果换到输入
        </button>
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
      {error ? <p className="error-text">{error}</p> : null}
      {output ? <pre className="output">{output}</pre> : null}
    </div>
  );
}
