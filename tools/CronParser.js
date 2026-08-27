"use client";

import { useMemo, useState } from "react";

const MONTHS_EN = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const WEEKS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

const DOW_NUM = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };

function parseField(field, min, max, names = {}) {
  // 返回该字段的所有合法取值数组
  const values = new Set();
  for (const part of field.split(",")) {
    const p = part.trim().toUpperCase();
    if (!p) continue;
    const stepMatch = p.split("/");
    const rangePart = stepMatch[0];
    const step = stepMatch[1] ? parseInt(stepMatch[1], 10) : 1;
    if (!step || step < 1) return null;
    let start = min, end = max;
    if (rangePart !== "*" && rangePart !== "?") {
      const dash = rangePart.split("-");
      const toNum = (s) => {
        s = s.trim();
        if (names[s.toUpperCase()] !== undefined) return names[s.toUpperCase()];
        const n = parseInt(s, 10);
        return isNaN(n) ? null : n;
      };
      if (dash.length === 2) {
        start = toNum(dash[0]);
        end = toNum(dash[1]);
      } else {
        start = end = toNum(rangePart);
      }
      if (start === null || end === null || start < min || end > max || start > end) return null;
    }
    for (let v = start; v <= end; v += step) values.add(v);
  }
  if (values.size === 0) return null;
  return [...values].sort((a, b) => a - b);
}

function describe(field, unit, namesRev = {}) {
  if (field === "*") return `每${unit}`;
  const upper = field.toUpperCase();
  let text = field;
  for (const [name, num] of Object.entries(namesRev)) {
    text = text.replace(new RegExp("\\b" + name + "\\b", "gi"), String(num));
  }
  if (text.includes("/")) {
    const [r, s] = text.split("/");
    const from = r === "*" ? (unit === "分钟" ? "从第0分" : `每个${unit}`) : `从${r}`;
    return `${from}开始每隔${s}${unit}`;
  }
  if (text.includes("-")) return `在${text}之间，范围外的${unit}不触发`;
  if (text.includes(",")) return `仅在${text}这些${unit}触发`;
  return `仅在第 ${text} ${unit} 触发`;
}

function nextRuns(expr) {
  // expr: [min hour dom month dow]
  const parts = expr;
  const out = [];
  const d = new Date();
  d.setSeconds(0, 0);
  d.setMinutes(d.getMinutes() + 1);
  const limit = new Date(d.getTime() + 366 * 86400000);
  let guard = 500000;
  while (out.length < 5 && guard-- > 0 && d < limit) {
    if (!parts[1].includes(d.getHours())) { d.setHours(d.getHours() + 1); d.setMinutes(0); continue; }
    if (!parts[0].includes(d.getMinutes())) { d.setMinutes(d.getMinutes() + 1); continue; }
    const domRestricted = parts[2][0] !== "*";
    const dowRestricted = parts[4][0] !== "*";
    let dayOk;
    if (domRestricted && dowRestricted) {
      dayOk = parts[2].includes(d.getDate()) || parts[4].includes(d.getDay());
    } else if (domRestricted) {
      dayOk = parts[2].includes(d.getDate());
    } else if (dowRestricted) {
      dayOk = parts[4].includes(d.getDay());
    } else {
      dayOk = true;
    }
    if (!dayOk) {
      // 跳到明天 00:00
      d.setDate(d.getDate() + 1);
      d.setHours(0, 0, 0, 0);
      continue;
    }
    if (!parts[3].includes(d.getMonth() + 1)) {
      d.setMonth(d.getMonth() + 1, 1);
      d.setHours(0, 0, 0, 0);
      continue;
    }
    out.push(new Date(d));
    d.setMinutes(d.getMinutes() + 1);
  }
  return out;
}

export default function CronParser() {
  const [expr, setExpr] = useState("0 9 * * 1-5");

  const parsed = useMemo(() => {
    const raw = expr.trim().replace(/\s+/g, " ");
    if (!raw) return null;
    const fields = raw.split(" ");
    if (fields.length !== 5) {
      return { error: "需要正好 5 个字段：分 时 日 月 周，用空格分隔。" };
    }
    const specs = [
      ["分钟", 0, 59], ["小时", 0, 23], ["日", 1, 31], ["月", 1, 12], ["周", 0, 7],
    ];
    const parsedFields = [];
    for (let i = 0; i < 5; i++) {
      const [, min, max] = specs[i];
      let vals = parseField(fields[i], min, max);
      if (vals === null) return { error: `第${i + 1}个字段「${fields[i]}」不合法（${specs[i][0]}，允许 ${min}-${max}）。` };
      if (i === 4) vals = [...new Set(vals.map((v) => (v === 7 ? 0 : v)))].sort((a, b) => a - b);
      parsedFields.push(vals);
    }
    const descs = [
      describe(fields[0], "分钟"),
      describe(fields[1], "小时"),
      describe(fields[2], "日"),
      describe(fields[3], "月", Object.fromEntries(MONTHS_EN.map((m, i) => [m, i + 1]))),
      describe(fields[4], "星期", Object.fromEntries(Object.entries(DOW_NUM).map(([k, v]) => [k, v]))),
    ];
    let runs = null;
    try { runs = nextRuns(parsedFields).map(toLocalStr); } catch { runs = null; }
    return { raw, fields, descs, runs };
  }, [expr]);

  function toLocalStr(dt) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())} ${pad(dt.getHours())}:${pad(dt.getMinutes())} ${WEEKS[dt.getDay()]}`;
  }

  return (
    <div className="panel">
      <label style={{ fontSize: 14 }}>
        Cron 表达式（5字段标准格式）
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder={"例如 30 8 * * 1-5"}
          style={{ marginTop: 6 }}
        />
      </label>

      {!parsed || !parsed.raw ? (
        <p style={{ color: "var(--muted)", fontSize: 13 }}>输入表达式后自动解析含义并预测下一次执行时间。</p>
      ) : parsed.error ? (
        <p style={{ color: "#f87171", fontSize: 13 }}>✘ {parsed.error}</p>
      ) : (
        <>
          <pre className="output">
{`表达式：${parsed.raw}
${parsed.fields.map((f, i) => `${["分", "时", "日", "月", "周"][i]} → ${f}`).join("\n")}`}
          </pre>
          <ul style={{ fontSize: 13.5, lineHeight: 1.9, margin: "8px 0" }}>
            {parsed.descs.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
          <h3>接下来 5 次执行时间（按本机时区）</h3>
          <pre className="output">
            {parsed.runs ? parsed.runs.join("\n") : "无法在一年内找到匹配时间，请检查表达式。"}
          </pre>
          <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
            常用示例：<code>*/5 * * * *</code> 每5分钟 · <code>0 9 * * 1-5</code> 工作日每天9点 ·{" "}
            <code>0 3 1 * *</code> 每月1号凌晨3点 · <code>30 21 * * 0</code> 每周日21:30
          </p>
        </>
      )}
    </div>
  );
}
