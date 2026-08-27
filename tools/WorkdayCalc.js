"use client";

import { useMemo, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

function eachDay(start, end) {
  const days = [];
  const d = new Date(start);
  while (d <= end) {
    days.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return days;
}

export default function WorkdayCalc() {
  const today = new Date();
  const [start, setStart] = useState(today.toISOString().slice(0, 10));
  const [end, setEnd] = useState(
    new Date(today.getTime() + 30 * 86400000).toISOString().slice(0, 10)
  );
  const [skipHolidays, setSkipHolidays] = useState(true);
  // 用户自定义节假日/调休（每行一个日期）
  const [extra, setExtra] = useState("");

  const result = useMemo(() => {
    if (!start || !end) return null;
    const s = new Date(start + "T00:00:00");
    const e = new Date(end + "T00:00:00");
    if (isNaN(s) || isNaN(e)) return null;
    if (s > e) return null;

    // 简易法定节假日表（2026-2027 国务院公布的安排，含调休上班日）
    const holidays = new Set([
      "2026-01-01", "2026-01-02", "2026-02-16", "2026-02-17", "2026-02-18", "2026-02-19",
      "2026-02-20", "2026-04-04", "2026-04-05", "2026-04-06", "2026-05-01", "2026-05-02",
      "2026-05-03", "2026-06-19", "2026-06-20", "2026-06-21", "2026-09-25", "2026-09-26",
      "2026-09-27", "2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05",
      "2026-10-06", "2026-10-07",
      "2027-01-01",
    ]);
    const workdays = new Set([
      "2026-02-14", "2026-02-15", "2026-02-28", "2026-03-01", "2026-04-26", "2026-10-10", "2026-10-11",
    ]);

    for (const line of extra.split(/\r?\n/)) {
      const t = line.trim();
      if (!t) continue;
      if (t.startsWith("+")) workdays.add(t.slice(1).trim());
      else if (t.startsWith("-")) holidays.add(t.slice(1).trim());
    }

    let totalDays = 0, weekendDays = 0, holidayDays = 0, workdayCount = 0;
    const list = [];
    for (const d of eachDay(s, e)) {
      totalDays++;
      const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
      const dow = d.getDay();
      let isWork;
      if (!skipHolidays) isWork = true;            // 不勾选：所有日子都算工作日
      else if (workdays.has(key)) isWork = true;   // 调休补班
      else if (holidays.has(key)) isWork = false;  // 法定假
      else isWork = !(dow === 0 || dow === 6);     // 普通周末

      if (dow === 0 || dow === 6) weekendDays++;
      if (holidays.has(key)) holidayDays++;
      if (isWork) {
        workdayCount++;
        if (list.length < 500) list.push(key);
      }
    }
    return { totalDays, weekendDays, holidayDays, workdayCount, list };
  }, [start, end, skipHolidays, extra]);

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ flex: 1, minWidth: 160, fontSize: 14 }}>
          开始日期
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} style={{ marginTop: 6 }} />
        </label>
        <label style={{ flex: 1, minWidth: 160, fontSize: 14 }}>
          结束日期
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} style={{ marginTop: 6 }} />
        </label>
      </div>
      <div className="btn-row" style={{ alignItems: "center" }}>
        <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13.5 }}>
          <input
            type="checkbox"
            checked={skipHolidays}
            onChange={(e) => setSkipHolidays(e.target.checked)}
          />
          扣除周六日和法定节假日
        </label>
      </div>
      <details>
        <summary style={{ cursor: "pointer", fontSize: 13.5, color: "var(--muted)" }}>
          自定义节假日 / 调休（可选，内置2026年表）
        </summary>
        <textarea
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          placeholder={"每行一个：\n- 2026-10-09 表示把这天算作放假\n+ 2026-10-10 表示把这天算作上班"}
          rows={4}
          style={{ marginTop: 8 }}
        />
      </details>

      {result && (
        <>
          <div className="kv-grid">
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">自然日</div>
              <div className="v">{result.totalDays} 天</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">工作日</div>
              <div className="v">{result.workdayCount} 天</div>
            </div>
          </div>
          {result.list.length > 0 && result.list.length <= 60 && (
            <pre className="output" style={{ maxHeight: 260 }}>
              {result.list.join(" → ")}
            </pre>
          )}
          {result.list.length > 60 && (
            <pre className="output" style={{ maxHeight: 260, overflow: "auto" }}>
              {result.list.join("\n")}
            </pre>
          )}
        </>
      )}
      {!result && start && end && (
        <p style={{ color: "#f87171", fontSize: 13 }}>开始日期不能晚于结束日期。</p>
      )}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
        内置 2026 年国务院放假安排。2027 年及其他年份可在「自定义」里手动补充；纯本地计算。
      </p>
    </div>
  );
}
