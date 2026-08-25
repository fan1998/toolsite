"use client";

import { useState } from "react";

const b64url = (s) => {
  const pad = s.replace(/-/g, "+").replace(/_/g, "/");
  return atob(pad + "=".repeat((4 - (pad.length % 4)) % 4));
};

export default function JwtDecode() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const decode = () => {
    setError("");
    setResult(null);
    const parts = token.trim().split(".");
    if (parts.length < 2) return setError("不是有效的 JWT 格式（应包含两个 . 分隔段）");
    try {
      const header = JSON.parse(b64url(parts[0]));
      const payload = JSON.parse(b64url(parts[1]));
      if (payload.exp) {
        const d = new Date(payload.exp * 1000);
        payload.expReadable = `${d.toLocaleString()}${d.getTime() < Date.now() ? "（已过期）" : "（未过期）"}`;
      }
      setResult({ header, payload, signature: parts[2] || "（无）" });
    } catch (e) {
      setError("解码失败：段内容不是有效的 Base64URL 编码 JSON");
    }
  };

  return (
    <div className="panel">
      <textarea value={token} onChange={(e) => setToken(e.target.value)} placeholder="粘贴 JWT Token（eyJhbGciOi...）" />
      <div className="btn-row">
        <button onClick={decode}>解码</button>
      </div>
      {error && <p className="error-text">{error}</p>}
      {result && (
        <>
          <p className="success-text">Header</p>
          <pre className="output">{JSON.stringify(result.header, null, 2)}</pre>
          <p className="success-text">Payload</p>
          <pre className="output">{JSON.stringify(result.payload, null, 2)}</pre>
          <p className="success-text">Signature</p>
          <pre className="output">{result.signature}</pre>
        </>
      )}
    </div>
  );
}
