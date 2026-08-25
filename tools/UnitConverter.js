"use client";

import { useState } from "react";

const UNITS = {
  长度: { 米: 1, 千米: 1000, 分米: 0.1, 厘米: 0.01, 毫米: 0.001, 英里: 1609.344, 码: 0.9144, 英尺: 0.3048, 英寸: 0.0254, 海里: 1852 },
  重量: { 千克: 1, 克: 0.001, 吨: 1000, 毫克: 0.000001, 磅: 0.45359237, 盎司: 0.028349523, 斤: 0.5, 两: 0.05 },
  面积: { 平方米: 1, 平方千米: 1000000, 公顷: 10000, 亩: 666.6667, 平方厘米: 0.0001, 平方英尺: 0.09290304 },
  容积: { 升: 1, 毫升: 0.001, 立方米: 1000, "加仑(美)": 3.785412, "品脱(美)": 0.473176 },
  速度: { "米/秒": 1, "千米/时": 0.2777778, "英里/时": 0.44704, 节: 0.5144444 },
};

const TEMPS = ["摄氏度", "华氏度", "开尔文"];
const toC = { 摄氏度: (v) => v, 华氏度: (v) => (v - 32) / 1.8, 开尔文: (v) => v - 273.15 };
const fromC = { 摄氏度: (v) => v, 华氏度: (v) => v * 1.8 + 32, 开尔文: (v) => v + 273.15 };

export default function UnitConverter() {
  const [cat, setCat] = useState("长度");
  const [from, setFrom] = useState("米");
  const [to, setTo] = useState("千米");
  const [value, setValue] = useState("");

  const units = cat === "温度" ? TEMPS : Object.keys(UNITS[cat]);
  const out = (() => {
    const v = Number(value);
    if (!value || isNaN(v)) return "";
    if (cat === "温度") return fromC[to](toC[from](v));
    return (v * UNITS[cat][from]) / UNITS[cat][to];
  })();

  const switchCat = (c) => {
    setCat(c);
    const u = c === "温度" ? TEMPS : Object.keys(UNITS[c]);
    setFrom(u[0]);
    setTo(u[1]);
  };

  const selStyle = { padding: "8px 12px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)" };

  return (
    <div className="panel">
      <div className="cat-tabs" style={{ justifyContent: "flex-start", marginBottom: 14 }}>
        {[...Object.keys(UNITS), "温度"].map((c) => (
          <button key={c} className={`cat-tab ${cat === c ? "active" : ""}`} onClick={() => switchCat(c)}>{c}</button>
        ))}
      </div>
      <div className="btn-row">
        <select value={from} onChange={(e) => setFrom(e.target.value)} style={selStyle}>
          {units.map((u) => <option key={u}>{u}</option>)}
        </select>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="输入数值" style={{ flex: 1, minWidth: 100 }} />
      </div>
      <div className="btn-row">
        <select value={to} onChange={(e) => setTo(e.target.value)} style={selStyle}>
          {units.map((u) => <option key={u}>{u}</option>)}
        </select>
        <input type="text" value={out ? String(Math.round(out * 1e8) / 1e8) : ""} readOnly placeholder="结果" style={{ flex: 1, minWidth: 100 }} />
      </div>
    </div>
  );
}
