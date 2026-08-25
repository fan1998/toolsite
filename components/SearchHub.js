"use client";

import { useState } from "react";

const ENGINES = [
  { name: "Google", url: "https://www.google.com/search?q=", icon: "🔍" },
  { name: "Bing", url: "https://www.bing.com/search?q=", icon: "🌐" },
  { name: "百度", url: "https://www.baidu.com/s?wd=", icon: "🐾" },
  { name: "GitHub", url: "https://github.com/search?q=", icon: "🐙" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/search?q=", icon: "💬" },
  { name: "知乎", url: "https://www.zhihu.com/search?type=content&q=", icon: "📚" },
  { name: "掘金", url: "https://juejin.cn/search?query=", icon: "⛏️" },
];

const RESOURCES = [
  {
    group: "AI 助手",
    items: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "🤖" },
      { name: "DeepSeek", url: "https://www.deepseek.com", icon: "🧠" },
      { name: "Kimi", url: "https://www.kimi.com", icon: "✨" },
      { name: "通义千问", url: "https://www.tongyi.com", icon: "💡" },
      { name: "Claude", url: "https://claude.ai", icon: "🎭" },
      { name: "Gemini", url: "https://gemini.google.com", icon: "♊" },
    ],
  },
  {
    group: "开发查询",
    items: [
      { name: "GitHub", url: "https://github.com", icon: "🐙" },
      { name: "MDN", url: "https://developer.mozilla.org/zh-CN/", icon: "📘" },
      { name: "DevDocs", url: "https://devdocs.io", icon: "📖" },
      { name: "Can I Use", url: "https://caniuse.com", icon: "🧪" },
      { name: "npm", url: "https://www.npmjs.com", icon: "📦" },
      { name: "菜鸟教程", url: "https://www.runoob.com", icon: "🐦" },
    ],
  },
  {
    group: "设计素材",
    items: [
      { name: "Unsplash", url: "https://unsplash.com", icon: "🖼️" },
      { name: "Pexels", url: "https://www.pexels.com", icon: "📷" },
      { name: "Iconify", url: "https://iconify.design", icon: "🎨" },
      { name: "Google Fonts", url: "https://fonts.google.com", icon: "🔤" },
      { name: "Figma", url: "https://www.figma.com", icon: "🛠️" },
      { name: "Favicon.io", url: "https://favicon.io", icon: "🌟" },
    ],
  },
];

export default function SearchHub() {
  const [engine, setEngine] = useState(ENGINES[0]);
  const [query, setQuery] = useState("");

  const search = () => {
    if (!query.trim()) return;
    window.open(engine.url + encodeURIComponent(query.trim()), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="search-hub">
      <h2>全网搜索</h2>
      <div className="search-hub-box">
        <div className="engine-tabs">
          {ENGINES.map((e) => (
            <button
              key={e.name}
              className={`engine-tab ${engine.name === e.name ? "active" : ""}`}
              onClick={() => setEngine(e)}
            >
              {e.icon} {e.name}
            </button>
          ))}
        </div>
        <div className="search-hub-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder={`用 ${engine.name} 搜索…`}
          />
          <button onClick={search}>搜索</button>
        </div>
      </div>
      <div className="res-groups">
        {RESOURCES.map((g) => (
          <div key={g.group} className="res-group">
            <p className="res-title">{g.group}</p>
            <div className="res-grid">
              {g.items.map((it) => (
                <a
                  key={it.name}
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="res-icon">{it.icon}</span> {it.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
