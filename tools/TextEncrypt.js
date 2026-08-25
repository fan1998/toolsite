"use client";

import { useState } from "react";

const toB64 = (bytes) => btoa(String.fromCharCode(...bytes));
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function deriveKey(password, salt) {
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export default function TextEncrypt() {
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [msg, setMsg] = useState("");

  const encrypt = async () => {
    setMsg("");
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);
      const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text));
      const combined = new Uint8Array(16 + 12 + cipher.byteLength);
      combined.set(salt, 0);
      combined.set(iv, 16);
      combined.set(new Uint8Array(cipher), 28);
      setResult(toB64(combined));
    } catch (e) {
      setMsg("加密失败，请检查输入");
    }
  };

  const decrypt = async () => {
    setMsg("");
    try {
      const data = fromB64(text.trim());
      const salt = data.slice(0, 16);
      const iv = data.slice(16, 28);
      const key = await deriveKey(password, salt);
      const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data.slice(28));
      setResult(new TextDecoder().decode(plain));
    } catch (e) {
      setResult("");
      setMsg("解密失败：密码错误或数据不是有效的加密内容");
    }
  };

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入要加密的明文，或粘贴加密后的 Base64 字符串" />
      <div className="btn-row">
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密码" style={{ flex: 1, minWidth: 160 }} />
        <button onClick={encrypt}>加密</button>
        <button onClick={decrypt}>解密</button>
      </div>
      {msg && <p className={msg.includes("失败") ? "error-text" : "success-text"}>{msg}</p>}
      {result && <pre className="output" style={{ wordBreak: "break-all" }}>{result}</pre>}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>采用 AES-256-GCM + PBKDF2（10万次迭代），全部在浏览器本地完成，密码不会上传。忘记密码无法恢复，请妥善保管。</p>
    </div>
  );
}
