"use client";

import { useState } from "react";

const UNITS = [
  { label: "比特 (bit)", base: 1 / 8, short: "bit" },
  { label: "字节 (B)", base: 1, short: "B" },
  { label: "KB", base: 1024, short: "KB" },
  { label: "MB", base: 1024 ** 2, short: "MB" },
  { label: "GB", base: 1024 ** 3, short: "GB" },
  { label: "TB", base: 1024 ** 4, short: "TB" },
  { label: "PB", base: 1024 ** 5, short: "PB" },
  { label: "EB", base: 1024 ** 6, short: "EB" },
];

export default function StorageConverter() {
  const [value, setValue] = useState("1024");
  const [unit, setUnit] = useState("MB");

  const num = parseFloat(value);
  const valid = !isNaN(num) && isFinite(num);
  const bytes = valid ? num * UNITS.find((u) => u.short === unit).base : NaN;

  const fmt = (n) => {
    if (!isFinite(n)) return "—";
    if (Math.abs(n) >= 1e15 || (Math.abs(n) < 1e-5 && n !== 0)) {
      return n.toExponential(4);
    }
    return Number(n.toPrecision(8)).toString();
  };

  return (
    <div className="panel">
      <div className="btn-row" style={{ alignItems: "center" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ maxWidth: 180 }}
        />
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          {UNITS.map((u) => (
            <option key={u.short} value={u.short}>
              {u.label}
            </option>
          ))}
        </select>
      </div>
      {valid ? (
        <div className="kv-grid">
          {UNITS.map((u) => (
            <div
              key={u.short}
              className="kv-item"
              onClick={() => navigator.clipboard.writeText(fmt(bytes / u.base))}
            >
              <div className="k">{u.label}（点击复制）</div>
              <div className="v">{fmt(bytes / u.base)}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="error-text">请输入有效数字</p>
      )}
    </div>
  );
}
