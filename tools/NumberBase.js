"use client";

import { useState } from "react";

const BASES = [
  { v: 2, label: "二进制" },
  { v: 8, label: "八进制" },
  { v: 10, label: "十进制" },
  { v: 16, label: "十六进制" },
];

export default function NumberBase() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState(10);
  const [error, setError] = useState("");

  const parsed = parseInt(value.replace(/^\s+|\s+$/g, ""), from);

  const convert = (to) => {
    if (value.trim() === "" || isNaN(parsed)) return "-";
    return parsed.toString(to).toUpperCase();
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <select
          value={from}
          onChange={(e) => setFrom(Number(e.target.value))}
          style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)" }}
        >
          {BASES.map((b) => (
            <option key={b.v} value={b.v}>
              {b.label}输入
            </option>
          ))}
        </select>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder="输入数值"
          style={{ flex: 1, minWidth: 180 }}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
      <div className="kv-grid">
        {BASES.map((b) => (
          <div
            key={b.v}
            className="kv-item"
            onClick={() => !isNaN(parsed) && navigator.clipboard.writeText(convert(b.v))}
          >
            <div className="k">{b.label}（点击复制）</div>
            <div className="v">{isNaN(parsed) && value.trim() !== "" ? "输入无效" : convert(b.v)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
