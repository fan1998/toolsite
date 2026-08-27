"use client";

import { useState } from "react";

const num = (v) => (v === "" || isNaN(Number(v)) ? null : Number(v));
const fmt = (x) =>
  x === null ? "—" : Math.abs(x % 1) > 1e-9 ? (Math.round(x * 10000) / 10000).toString() : String(x);

export default function PercentageCalc() {
  // 模式一：A 是 B 的百分之几
  const [a1, setA1] = useState("");
  const [b1, setB1] = useState("");
  // 模式二：A 的 B% 是多少
  const [a2, setA2] = useState("");
  const [b2, setB2] = useState("");
  // 模式三：A 比 B 多/少百分之几
  const [a3, setA3] = useState("");
  const [b3, setB3] = useState("");

  const r1 = num(a1) !== null && num(b1) !== null && num(b1) !== 0 ? (num(a1) / num(b1)) * 100 : null;
  const r2 = num(a2) !== null && num(b2) !== null ? num(a2) * num(b2) / 100 : null;
  const r3 =
    num(a3) !== null && num(b3) !== null && num(b3) !== 0
      ? ((num(a3) - num(b3)) / Math.abs(num(b3))) * 100
      : null;

  return (
    <div className="panel">
      <h3>① 求 A 是 B 的百分之几</h3>
      <div className="btn-row">
        <input placeholder={"数值 A，如 25"} value={a1} onChange={(e) => setA1(e.target.value)} />
        <input placeholder={"基数 B，如 200"} value={b1} onChange={(e) => setB1(e.target.value)} />
        <div className="result-inline">= {fmt(r1) === "—" ? "—" : fmt(r1) + "%"}</div>
      </div>

      <h3>② 求 A 的 B% 是多少</h3>
      <div className="btn-row">
        <input placeholder={"基数 A，如 850"} value={a2} onChange={(e) => setA2(e.target.value)} />
        <input placeholder={"百分比 B%，如 30"} value={b2} onChange={(e) => setB2(e.target.value)} />
        <div className="result-inline">= {fmt(r2)}</div>
      </div>

      <h3>③ A 比 B 多 / 少百分之几</h3>
      <div className="btn-row">
        <input placeholder={"现值 A，如 130"} value={a3} onChange={(e) => setA3(e.target.value)} />
        <input placeholder={"原值 B，如 100"} value={b3} onChange={(e) => setB3(e.target.value)} />
        <div className="result-inline">
          ={" "}
          {r3 === null
            ? "—"
            : (r3 >= 0 ? "增加 " : "减少 ") + fmt(Math.abs(r3)) + "%"}
        </div>
      </div>

      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
        三种日常最常见的百分比例题：占比、按比例取值、涨跌幅。边输入边出结果，全部本地计算。
      </p>
    </div>
  );
}
