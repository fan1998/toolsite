"use client";

import { useState } from "react";

const SETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const LABELS = {
  upper: "大写字母",
  lower: "小写字母",
  digits: "数字",
  symbols: "符号",
};

export default function RandomString() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [chars, setChars] = useState({
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
  });
  const [list, setList] = useState([]);

  const toggle = (k) => setChars((p) => ({ ...p, [k]: !p[k] }));

  const generate = () => {
    let pool = "";
    Object.keys(SETS).forEach((k) => {
      if (chars[k]) pool += SETS[k];
    });
    if (!pool) return;
    const out = Array.from({ length: count }, () => {
      const a = new Uint32Array(length);
      crypto.getRandomValues(a);
      return Array.from(a, (x) => pool[x % pool.length]).join("");
    });
    setList(out);
  };

  return (
    <div className="panel">
      <div className="btn-row" style={{ alignItems: "center" }}>
        <label style={{ fontSize: 14 }}>
          长度
          <input
            type="number"
            min="1"
            max="256"
            value={length}
            onChange={(e) =>
              setLength(Math.max(1, Math.min(256, Number(e.target.value) || 1)))
            }
            style={{ width: 80, marginLeft: 6 }}
          />
        </label>
        <label style={{ fontSize: 14 }}>
          个数
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))
            }
            style={{ width: 80, marginLeft: 6 }}
          />
        </label>
      </div>
      <div className="btn-row" style={{ gap: 14 }}>
        {Object.keys(SETS).map((k) => (
          <label
            key={k}
            style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}
          >
            <input type="checkbox" checked={chars[k]} onChange={() => toggle(k)} />
            {LABELS[k]}
          </label>
        ))}
      </div>
      <div className="btn-row">
        <button onClick={generate}>生成</button>
      </div>
      {list.length > 0 && (
        <>
          {list.map((s, i) => (
            <pre className="output" key={i} style={{ marginBottom: 8 }}>
              {s}
            </pre>
          ))}
          <button
            className="secondary"
            onClick={() => navigator.clipboard.writeText(list.join("\n"))}
          >
            复制全部
          </button>
        </>
      )}
    </div>
  );
}
