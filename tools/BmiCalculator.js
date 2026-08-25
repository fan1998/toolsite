"use client";

import { useState } from "react";

export default function BmiCalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [copied, setCopied] = useState(false);

  const h = Number(height) / 100;
  const w = Number(weight);
  const bmi = h > 0 && w > 0 ? w / (h * h) : null;

  const level = (() => {
    if (bmi === null) return null;
    if (bmi < 18.5) return { label: "偏瘦", color: "#3b82f6", tip: "建议适当增加营养摄入，保证均衡饮食。" };
    if (bmi < 24) return { label: "正常", color: "#10b981", tip: "体重在健康范围内，继续保持良好生活习惯。" };
    if (bmi < 28) return { label: "超重", color: "#f97316", tip: "建议控制饮食并增加运动量。" };
    return { label: "肥胖", color: "#ef4444", tip: "建议咨询医生或营养师，制定科学减重计划。" };
  })();

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ flex: 1, minWidth: 160, fontSize: 14 }}>
          身高（cm）
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            style={{ marginTop: 6 }}
          />
        </label>
        <label style={{ flex: 1, minWidth: 160, fontSize: 14 }}>
          体重（kg）
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="65"
            style={{ marginTop: 6 }}
          />
        </label>
      </div>
      {bmi !== null && level && (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 44, fontWeight: 800, color: level.color }}>
            {bmi.toFixed(1)}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: level.color }}>
            {level.label}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>{level.tip}</p>
        </div>
      )}
      <p style={{ color: "var(--muted)", fontSize: 12.5, margin: 0 }}>
        按中国成人标准划分：偏瘦 &lt;18.5，正常 18.5-23.9，超重 24-27.9，肥胖 ≥28。结果仅供参考。
      </p>
    </div>
  );
}
