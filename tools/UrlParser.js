"use client";

import { useState } from "react";

export default function UrlParser() {
  const [url, setUrl] = useState("");

  let info = null;
  let error = null;
  try {
    if (url.trim()) {
      const u = new URL(url.trim());
      const params = [];
      u.searchParams.forEach((v, k) => params.push([k, v]));
      info = { u, params };
    }
  } catch {
    error = "不是合法的 URL，请检查是否带了协议（http:// 或 https://）。";
  }

  const rows = info
    ? [
        ["协议 protocol", info.u.protocol.replace(":", "")],
        ["主机 host", info.u.host],
        ["域名 hostname", info.u.hostname],
        ["端口 port", info.u.port || "（默认）"],
        ["路径 pathname", info.u.pathname],
        ["查询字符串 search", info.u.search || "（无）"],
        ["哈希 hash", info.u.hash || "（无）"],
        ["来源 origin", info.u.origin],
      ]
    : [];

  return (
    <div className="panel">
      <label style={{ fontSize: 14 }}>
        输入 URL
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={"https://example.com:8080/path/page?id=42&tab=edit#section-2"}
          style={{ marginTop: 6 }}
        />
      </label>

      {error && <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>}

      {info && (
        <>
          <pre className="output">
            {rows.map(([k, v]) => `${k.padEnd(16)} ${v}`).join("\n")}
          </pre>
          {info.params.length > 0 && (
            <>
              <h3>查询参数</h3>
              <pre className="output" style={{ maxHeight: 240 }}>
                {info.params.map(([k, v], i) => `${i + 1}. ${k} = ${v}`).join("\n")}
              </pre>
            </>
          )}
          <button className="btn" onClick={() => navigator.clipboard.writeText(info.u.href)}>
            复制规范化的 URL
          </button>
        </>
      )}

      {!info && !error && (
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          粘贴任意网址，自动拆解出协议、域名、端口、路径、查询参数和锚点；所有解析在本地完成。
        </p>
      )}
    </div>
  );
}
