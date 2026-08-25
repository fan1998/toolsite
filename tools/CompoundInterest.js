"use client";

import { useState } from "react";

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("8");
  const [years, setYears] = useState("10");
  const [monthly, setMonthly] = useState("1000");

  const P = parseFloat(principal) || 0;
  const r = (parseFloat(rate) || 0) / 100;
  const n = parseFloat(years) || 0;
  const m = parseFloat(monthly) || 0;

  const N = Math.round(n * 12);
  const i = r / 12;

  let fv = 0;
  if (N > 0) {
    fv = P * Math.pow(1 + i, N);
    if (i !== 0) fv += m * ((Math.pow(1 + i, N) - 1) / i);
    else fv += m * N;
  } else {
    fv = P;
  }

  const totalInput = P + m * N;
  const interest = fv - totalInput;

  const fmt = (x) =>
    x.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="panel">
      <div className="kv-grid">
        <label className="kv-item" style={{ cursor: "default" }}>
          <span className="k">本金（元）</span>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            style={{ width: "100%", marginTop: 6 }}
          />
        </label>
        <label className="kv-item" style={{ cursor: "default" }}>
          <span className="k">年利率（%）</span>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{ width: "100%", marginTop: 6 }}
          />
        </label>
        <label className="kv-item" style={{ cursor: "default" }}>
          <span className="k">投资年限（年）</span>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={{ width: "100%", marginTop: 6 }}
          />
        </label>
        <label className="kv-item" style={{ cursor: "default" }}>
          <span className="k">每月定投（元，可为0）</span>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
            style={{ width: "100%", marginTop: 6 }}
          />
        </label>
      </div>
      <div className="kv-grid">
        <div className="kv-item" style={{ cursor: "default" }}>
          <div className="k">期末本息合计</div>
          <div className="v" style={{ color: "var(--primary)", fontWeight: 700 }}>
            ¥ {fmt(fv)}
          </div>
        </div>
        <div className="kv-item" style={{ cursor: "default" }}>
          <div className="k">累计投入本金</div>
          <div className="v">¥ {fmt(totalInput)}</div>
        </div>
        <div className="kv-item" style={{ cursor: "default" }}>
          <div className="k">总收益</div>
          <div className="v" style={{ color: "#16a34a", fontWeight: 700 }}>
            ¥ {fmt(interest)}
          </div>
        </div>
        <div className="kv-item" style={{ cursor: "default" }}>
          <div className="k">收益率</div>
          <div className="v">
            {totalInput > 0 ? ((interest / totalInput) * 100).toFixed(2) : "0.00"}%
          </div>
        </div>
      </div>
      <p className="intro" style={{ fontSize: 12, marginTop: 12 }}>
        按每月复利计算（月利率 = 年利率 / 12），结果仅供参考，实际收益受市场波动影响。
      </p>
    </div>
  );
}
