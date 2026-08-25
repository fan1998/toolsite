"use client";

import { useState } from "react";

const ALGOS = [
  { id: "SHA-1", label: "SHA-1" },
  { id: "SHA-256", label: "SHA-256" },
  { id: "SHA-384", label: "SHA-384" },
  { id: "SHA-512", label: "SHA-512" },
];

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState([]);

  const generate = async () => {
    const data = new TextEncoder().encode(text);
    const out = await Promise.all(
      ALGOS.map(async (a) => {
        const buf = await crypto.subtle.digest(a.id, data);
        const hex = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
        return { label: a.label, hex };
      })
    );
    setHashes(out);
  };

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入要计算哈希的文本" />
      <div className="btn-row">
        <button onClick={generate}>计算哈希</button>
      </div>
      {hashes.map((h) => (
        <div key={h.label}>
          <p className="success-text" style={{ marginBottom: 2 }}>{h.label}（点击复制）</p>
          <pre className="output" style={{ cursor: "pointer" }} onClick={() => navigator.clipboard.writeText(h.hex)}>{h.hex}</pre>
        </div>
      ))}
    </div>
  );
}
