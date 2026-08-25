"use client";

import { useState } from "react";

export default function DateDiff() {
  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [base, setBase] = useState("");
  const [offset, setOffset] = useState("");

  const daysBetween = (() => {
    if (!d1 || !d2) return null;
    const diff = Math.round((new Date(d2) - new Date(d1)) / 86400000);
    return diff;
  })();

  const shifted = (() => {
    if (!base || offset === "") return null;
    const d = new Date(base);
    d.setDate(d.getDate() + Number(offset));
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} 星期${"日一二三四五六"[d.getDay()]}`;
  })();

  return (
    <div className="panel">
      <h3>计算两个日期相差天数</h3>
      <div className="btn-row">
        <input type="date" value={d1} onChange={(e) => setD1(e.target.value)} />
        <span>→</span>
        <input type="date" value={d2} onChange={(e) => setD2(e.target.value)} />
      </div>
      {daysBetween !== null && (
        <p style={{ fontSize: 16 }}>
          相差 <strong style={{ color: "var(--primary)", fontSize: 20 }}>{Math.abs(daysBetween)}</strong> 天
          {daysBetween < 0 && "（第二个日期更早）"}
        </p>
      )}
      <h3 style={{ marginTop: 20 }}>日期推算（加/减天数）</h3>
      <div className="btn-row">
        <input type="date" value={base} onChange={(e) => setBase(e.target.value)} />
        <input type="number" value={offset} onChange={(e) => setOffset(e.target.value)} placeholder="±天数" style={{ width: 110 }} />
      </div>
      {shifted && (
        <p style={{ fontSize: 16 }}>
          推算结果：<strong style={{ color: "var(--primary)", fontSize: 18 }}>{shifted}</strong>
        </p>
      )}
    </div>
  );
}
