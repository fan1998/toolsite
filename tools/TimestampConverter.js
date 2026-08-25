"use client";

import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

function tsToDate(tsMs) {
  const d = new Date(tsMs);
  if (isNaN(d.getTime())) return null;
  return {
    local: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
    utc: d.toISOString().replace("T", " ").replace("Z", ""),
    week: ["日", "一", "二", "三", "四", "五", "六"][d.getDay()],
  };
}

export default function TimestampConverter() {
  const [now, setNow] = useState(Date.now());
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [result, setResult] = useState(null);
  const [revResult, setRevResult] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parseTs = () => {
    const raw = tsInput.trim();
    if (!/^\d+$/.test(raw)) return setResult({ error: "请输入纯数字时间戳" });
    const ms = raw.length <= 10 ? Number(raw) * 1000 : Number(raw);
    const d = tsToDate(ms);
    if (!d) return setResult({ error: "时间戳无效，超出可表示范围" });
    setResult(d);
  };

  const parseDate = () => {
    if (!dateInput) return setRevResult({ error: "请先选择日期时间" });
    const ms = new Date(dateInput).getTime();
    setRevResult({
      sec: Math.floor(ms / 1000),
      ms,
    });
  };

  const copy = async (text) => {
    await navigator.clipboard.writeText(String(text));
  };

  return (
    <div>
      <div className="panel">
        <p className="intro">
          当前时间戳（毫秒）：<strong>{now}</strong>
          <button
            className="secondary"
            style={{ marginLeft: 10 }}
            onClick={() => copy(now)}
          >
            复制
          </button>
        </p>
      </div>

      <div className="panel">
        <h3>时间戳 → 日期</h3>
        <input
          type="text"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          placeholder="输入 10 位秒级或 13 位毫秒级时间戳"
        />
        <div className="btn-row">
          <button onClick={parseTs}>转换</button>
        </div>
        {result && result.error && (
          <p className="error-text">{result.error}</p>
        )}
        {result && !result.error && (
          <div className="kv-grid">
            <div className="kv-item" onClick={() => copy(result.local)}>
              <div className="k">本地时间（点击复制）</div>
              <div className="v">{result.local}</div>
            </div>
            <div className="kv-item" onClick={() => copy(result.utc)}>
              <div className="k">UTC 时间</div>
              <div className="v">{result.utc}</div>
            </div>
            <div className="kv-item">
              <div className="k">星期</div>
              <div className="v">周{result.week}</div>
            </div>
          </div>
        )}
      </div>

      <div className="panel">
        <h3>日期 → 时间戳</h3>
        <input
          type="datetime-local"
          value={dateInput}
          step="1"
          onChange={(e) => setDateInput(e.target.value)}
        />
        <div className="btn-row">
          <button onClick={parseDate}>转换</button>
        </div>
        {revResult && revResult.error && (
          <p className="error-text">{revResult.error}</p>
        )}
        {revResult && !revResult.error && (
          <div className="kv-grid">
            <div className="kv-item" onClick={() => copy(revResult.sec)}>
              <div className="k">秒级时间戳（点击复制）</div>
              <div className="v">{revResult.sec}</div>
            </div>
            <div className="kv-item" onClick={() => copy(revResult.ms)}>
              <div className="k">毫秒级时间戳（点击复制）</div>
              <div className="v">{revResult.ms}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
