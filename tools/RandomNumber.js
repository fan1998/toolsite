"use client";

import { useState } from "react";

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [unique, setUnique] = useState(false);
  const [nums, setNums] = useState([]);

  const generate = () => {
    const lo = Math.ceil(Math.min(min, max));
    const hi = Math.floor(Math.max(min, max));
    const range = hi - lo + 1;
    const n = Math.min(count, unique ? range : count);
    const set = new Set();
    const out = [];
    while (out.length < n) {
      const v = lo + Math.floor(Math.random() * range);
      if (unique && set.has(v)) continue;
      set.add(v);
      out.push(v);
    }
    setNums(out);
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ fontSize: 14, flex: 1, minWidth: 100 }}>
          最小值
          <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} style={{ marginTop: 6 }} />
        </label>
        <label style={{ fontSize: 14, flex: 1, minWidth: 100 }}>
          最大值
          <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} style={{ marginTop: 6 }} />
        </label>
        <label style={{ fontSize: 14, flex: 1, minWidth: 100 }}>
          生成个数
          <input type="number" min="1" value={count} onChange={(e) => setCount(Math.max(1, Number(e.target.value)))} style={{ marginTop: 6 }} />
        </label>
      </div>
      <div className="btn-row">
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
          不重复
        </label>
        <button onClick={generate}>生成</button>
      </div>
      {nums.length > 0 && (
        <div style={{ textAlign: "center", padding: 12, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {nums.map((n, i) => (
            <span key={i} style={{ padding: "8px 18px", background: "linear-gradient(135deg,var(--primary),var(--primary-2))", color: "#fff", borderRadius: 10, fontSize: 17, fontWeight: 700, fontFamily: "monospace" }}>
              {n}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
