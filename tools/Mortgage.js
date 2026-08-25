"use client";

import { useMemo, useState } from "react";

export default function Mortgage() {
  const [total, setTotal] = useState(100);
  const [rate, setRate] = useState(3.6);
  const [years, setYears] = useState(30);

  const r = useMemo(() => {
    const P = total * 10000;
    const m = years * 12;
    const mr = rate / 100 / 12;
    const monthPI = (P * mr * Math.pow(1 + mr, m)) / (Math.pow(1 + mr, m) - 1);
    const totalPI = monthPI * m;
    const firstMonth = P / m + P * mr;
    const totalDEBJ = P * mr * (m + 1) / 2 + P;
    const monthDEBJ = P / m;
    return {
      monthPI,
      totalPI,
      interestPI: totalPI - P,
      firstMonth,
      totalDEBJ,
      interestDEBJ: totalDEBJ - P,
      monthDEBJ,
    };
  }, [total, rate, years]);

  const w = (n) => Math.round(n).toLocaleString();

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ flex: 1, minWidth: 150, fontSize: 14 }}>
          贷款总额（万元）
          <input type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} style={{ marginTop: 6 }} />
        </label>
        <label style={{ flex: 1, minWidth: 150, fontSize: 14 }}>
          年利率（%）
          <input type="number" step="0.05" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ marginTop: 6 }} />
        </label>
        <label style={{ flex: 1, minWidth: 150, fontSize: 14 }}>
          贷款年限
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ marginTop: 6 }} />
        </label>
      </div>
      <div className="split" style={{ marginTop: 8 }}>
        <div className="kv-item" style={{ cursor: "default" }}>
          <div className="k" style={{ fontSize: 14, fontWeight: 700 }}>等额本息</div>
          <div className="k">每月还款（固定）</div>
          <div className="v" style={{ color: "var(--primary)", fontSize: 18 }}>{w(r.monthPI)} 元</div>
          <div className="k" style={{ marginTop: 6 }}>还款总额 {w(r.totalPI)} 元</div>
          <div className="k">支付利息 {w(r.interestPI)} 元</div>
        </div>
        <div className="kv-item" style={{ cursor: "default" }}>
          <div className="k" style={{ fontSize: 14, fontWeight: 700 }}>等额本金</div>
          <div className="k">首月还款（逐月递减）</div>
          <div className="v" style={{ color: "var(--primary)", fontSize: 18 }}>{w(r.firstMonth)} 元</div>
          <div className="k" style={{ marginTop: 6 }}>每月递减 {w(r.monthDEBJ * rate / 100 / 12)} 元</div>
          <div className="k">还款总额 {w(r.totalDEBJ)} 元 · 利息 {w(r.interestDEBJ)} 元</div>
        </div>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>结果仅供参考，实际以银行核算为准。等额本息每月固定好规划；等额本金总利息更少但前期压力大。</p>
    </div>
  );
}
