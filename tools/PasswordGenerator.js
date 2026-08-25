"use client";

import { useMemo, useState } from "react";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [pwd, setPwd] = useState("");
  const [copied, setCopied] = useState(false);

  const pool = useMemo(
    () => Object.keys(SETS).filter((k) => opts[k]).map((k) => SETS[k]).join(""),
    [opts]
  );

  const strength = useMemo(() => {
    if (!pool) return 0;
    const bits = length * Math.log2(pool.length);
    if (bits < 50) return 1;
    if (bits < 80) return 2;
    if (bits < 110) return 3;
    return 4;
  }, [length, pool]);

  const strengthLabel = ["", "弱", "一般", "强", "极强"][strength];
  const strengthColor = ["", "#ef4444", "#f97316", "#10b981", "#059669"][strength];

  const generate = () => {
    if (!pool) return setPwd("");
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPwd(Array.from(arr, (n) => pool[n % pool.length]).join(""));
    setCopied(false);
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ flex: 1, minWidth: 220, fontSize: 14 }}>
          长度：<strong>{length}</strong>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{ width: "100%", display: "block", marginTop: 6 }}
          />
        </label>
      </div>
      <div className="btn-row">
        {Object.keys(SETS).map((k) => (
          <label key={k} style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={opts[k]}
              onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })}
            />
            {{ upper: "大写字母", lower: "小写字母", digits: "数字", symbols: "特殊符号" }[k]}
          </label>
        ))}
      </div>
      <div className="btn-row">
        <button onClick={generate}>生成密码</button>
        <button
          className="secondary"
          disabled={!pwd}
          onClick={async () => {
            await navigator.clipboard.writeText(pwd);
            setCopied(true);
          }}
        >
          {copied ? "已复制" : "复制"}
        </button>
        {pwd && (
          <span style={{ fontWeight: 700, color: strengthColor }}>
            强度：{strengthLabel}
          </span>
        )}
      </div>
      {pwd && <pre className="output">{pwd}</pre>}
    </div>
  );
}
