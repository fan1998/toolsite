"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FAV_KEY = "fav_tools";

export default function ToolGrid({ items }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("全部");
  const [favs, setFavs] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    setFavs(JSON.parse(localStorage.getItem(FAV_KEY) || "[]"));
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && items.some((t) => t.category === cat)) setActiveCat(cat);
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFav = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    setFavs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  };

  const cats = useMemo(() => {
    const set = new Set(items.map((t) => t.category));
    const list = ["全部", ...Array.from(set)];
    if (favs.length > 0) list.splice(1, 0, "收藏");
    return list;
  }, [items, favs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((t) => {
      const inCat =
        activeCat === "全部"
          ? true
          : activeCat === "收藏"
          ? favs.includes(t.slug)
          : t.category === activeCat;
      const inQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q));
      return inCat && inQuery;
    });
  }, [items, query, activeCat, favs]);

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
              {c === "收藏" ? "★ 收藏" : c}
              <span className="cat-count">
                {c === "全部"
                  ? items.length
                  : c === "收藏"
                  ? favs.length
                  : items.filter((t) => t.category === c).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="tool-grid">
        {filtered.map((t) => (
          <a key={t.slug} className="tool-card" href={`/tools/${t.slug}`}>
            <button
              className={`fav-btn ${favs.includes(t.slug) ? "faved" : ""}`}
              aria-label="收藏"
              onClick={(e) => toggleFav(e, t.slug)}
            >
              ★
            </button>
            {t.icon && <div className="card-icon">{t.icon}</div>}
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
