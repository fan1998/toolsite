"use client";

import { useState } from "react";

const GROUPS = [
  {
    name: "笑脸与人",
    items: ["😀","😄","😁","🤣","😂","🙂","😊","😍","🥰","😘","😜","🤪","🧐","🤓","😎","🥳","😏","😴","🤤","😪","😷","🤒","🥵","🥶","😵","🤯","🥺","😭","😱","😡"],
  },
  {
    name: "手势",
    items: ["👍","👎","👌","✌️","🤞","🤟","🤘","👏","🙌","🤝","🙏","💪","👋","🖖","✊","👆","👇","👉","👈","🫶"],
  },
  {
    name: "动物与自然",
    items: ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐦","🦄","🐝","🦋","🐢","🐙","🦀","🐬","🐳","🌸","🌹","🌻","🌴","🌙","⭐","☀️","🌈","⚡","❄️"],
  },
  {
    name: "食物饮料",
    items: ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🥑","🍆","🥕","🌽","🌶️","🍄","🍞","🥐","🥖","🧀","🍗","🍔","🍟","🍕","🌭","🍜","🍣","🍩","☕","🍺","🍷"],
  },
  {
    name: "活动庆祝",
    items: ["⚽","🏀","🏈","⚾","🎾","🏐","🏓","🏸","🎮","🎯","🎲","🎵","🎶","🎤","🎧","🎸","🎹","🏆","🥇","🎉","🎊","🎁","🎈","🎂","🎄","🏮","🧨","🎆"],
  },
  {
    name: "旅行地点",
    items: ["🚗","🚕","🚌","🏎️","🚓","🚑","🚲","🛵","✈️","🚀","🛸","🚁","⛵","🚢","🏠","🏢","🏰","🗼","🗽","🕌","⛩️","🗺️","🧭","🏖️","🏔️","🌋","🏕️","🎡","🎢"],
  },
  {
    name: "物品符号",
    items: ["⌚","📱","💻","⌨️","🖥️","🖨️","💡","🔋","📚","📖","✏️","📝","📁","📂","📌","📎","🔒","🔑","🔨","🔧","💰","💳","💎","🧧","✅","❌","⚠️","❓","❗","💯","🔥","💦","💤","🕐","🏳️","🚩"],
  },
];

export default function EmojiPicker() {
  const [copied, setCopied] = useState("");
  const [query, setQuery] = useState("");

  async function copy(e) {
    await navigator.clipboard.writeText(e);
    setCopied(e);
    setTimeout(() => setCopied(""), 1200);
  }

  const q = query.trim().toLowerCase();

  return (
    <div className="panel">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={"搜索分组名称（如：食物、手势）…"}
      />

      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
        点击任意 emoji 即复制。{copied && <span style={{ color: "#4ade80" }}>已复制：{copied}</span>}
      </p>

      {(q ? GROUPS.filter((g) => g.name.toLowerCase().includes(q)) : GROUPS).map((g) => (
        <div key={g.name} style={{ marginBottom: 18 }}>
          <h3 style={{ fontSize: 15 }}>{g.name}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {g.items.map((e, i) => (
              <button
                key={i}
                onClick={() => copy(e)}
                title="点击复制"
                style={{
                  fontSize: 22,
                  padding: "4px 6px",
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      ))}
      {q && !GROUPS.some((g) => g.name.toLowerCase().includes(q)) && (
        <p style={{ color: "var(--muted)", fontSize: 13 }}>没有匹配的分组，试试「笑脸」「动物」「食物」。</p>
      )}
    </div>
  );
}
