"use client";

import { useState } from "react";

export default function BorderRadius() {
  const [all, setAll] = useState(16);
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [linked, setLinked] = useState(true);
  const [copied, setCopied] = useState(false);

  const setAllCorners = (v) => {
    setAll(v);
    setTl(v); setTr(v); setBr(v); setBl(v);
  };

  const css = linked
    ? `${all}px`
    : `${tl}px ${tr}px ${br}px ${bl}px`;

  const corners = linked
    ? [["四角", all, setAllCorners]]
    : [["左上", tl, setTl], ["右上", tr, setTr], ["右下", br, setBr], ["左下", bl, setBl]];

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={linked} onChange={(e) => { setLinked(e.target.checked); if (e.target.checked) setAllCorners(all); }} />
          四角统一
        </label>
      </div>
      {corners.map(([label, val, set]) => (
        <label key={label} style={{ display: "block", fontSize: 14, margin: "8px 0" }}>
          {label}：<strong>{val}px</strong>
          <input type="range" min="0" max="120" value={val} onChange={(e) => set(Number(e.target.value))} style={{ width: "100%", display: "block" }} />
        </label>
      ))}
      <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", borderRadius: 10, margin: "12px 0" }}>
        <div style={{ width: 140, height: 80, background: "linear-gradient(135deg,var(--primary),var(--primary-2))", borderRadius: css }} />
      </div>
      <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(`border-radius: ${css};`); setCopied(true); }}>
        {copied ? "已复制 CSS" : "复制 CSS"}
      </button>
      <pre className="output" style={{ marginTop: 10 }}>border-radius: {css};</pre>
    </div>
  );
}
