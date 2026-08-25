"use client";

import { useState } from "react";

const STATUS = [
  [200, "OK", "请求成功"],
  [201, "Created", "资源创建成功"],
  [204, "No Content", "成功但无返回内容"],
  [301, "Moved Permanently", "永久重定向"],
  [302, "Found", "临时重定向"],
  [304, "Not Modified", "资源未变化，使用缓存"],
  [400, "Bad Request", "请求参数错误"],
  [401, "Unauthorized", "未认证，需要登录"],
  [403, "Forbidden", "已认证但无权限"],
  [404, "Not Found", "资源不存在"],
  [405, "Method Not Allowed", "HTTP方法不被允许"],
  [408, "Request Timeout", "请求超时"],
  [413, "Payload Too Large", "请求体过大"],
  [415, "Unsupported Media Type", "媒体类型不支持"],
  [422, "Unprocessable Entity", "参数校验失败"],
  [429, "Too Many Requests", "请求频率超限"],
  [500, "Internal Server Error", "服务器内部错误"],
  [501, "Not Implemented", "功能未实现"],
  [502, "Bad Gateway", "网关收到无效响应"],
  [503, "Service Unavailable", "服务暂时不可用"],
  [504, "Gateway Timeout", "网关超时"],
];

export default function HttpStatus() {
  const [q, setQ] = useState("");
  const list = STATUS.filter(
    ([code, name, desc]) =>
      !q || String(code).includes(q) || name.toLowerCase().includes(q.toLowerCase()) || desc.includes(q)
  );

  return (
    <div className="panel">
      <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索状态码、名称或含义，如 404" />
      <div style={{ marginTop: 12 }}>
        {list.map(([code, name, desc]) => (
          <div key={code} className="kv-item" style={{ display: "flex", gap: 14, marginBottom: 8, alignItems: "baseline", cursor: "default" }}>
            <strong style={{ fontSize: 17, color: code < 300 ? "#059669" : code < 400 ? "#2563eb" : code < 500 ? "#f97316" : "#dc2626", minWidth: 44 }}>
              {code}
            </strong>
            <span style={{ fontFamily: "monospace", fontSize: 13.5, minWidth: 170 }}>{name}</span>
            <span style={{ color: "var(--muted)", fontSize: 13.5 }}>{desc}</span>
          </div>
        ))}
        {list.length === 0 && <p className="empty-tip">没有匹配的状态码</p>}
      </div>
    </div>
  );
}
