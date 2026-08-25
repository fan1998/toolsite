"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function ToolGrid({ items }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("全部");
  const searchRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cats = useMemo(() => {
    const set = new Set(items.map((t) => t.category));
    return ["全部", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      const inCat = activeCat === "全部" || t.category === activeCat;
      const inQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q));
      return inCat && inQuery;
    });
  }, [items, query, activeCat]);

  return (
    <section className="grid-section">
      <div className="grid-toolbar">
        <div className="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索工具..."
          />
          <kbd>Ctrl K</kbd>
        </div>
        <div className="cat-tabs">
          {cats.map((c) => (
            <button
              key={c}
              className={`cat-tab ${activeCat === c ? "active" : ""}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
              <span className="cat-count">
                {c === "全部" ? items.length : items.filter((t) => t.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-grid">
        {filtered.map((t) => (
          <a key={t.slug} className="tool-card" href={`/tools/${t.slug}`}>
            <div className="card-head">
              <h2>{t.title}</h2>
              {t.badge && <span className={`badge ${t.badge === "NEW" ? "badge-new" : ""}`}>{t.badge}</span>}
            </div>
            <p>{t.description.slice(0, 50)}…</p>
            <span className="card-cat">{t.category}</span>
          </a>
        ))}
        {filtered.length === 0 && (
          <p className="empty-tip">没有找到匹配的工具，换个关键词试试</p>
        )}
      </div>
    </section>
  );
}
