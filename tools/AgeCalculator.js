"use client";

import { useMemo, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");
const ZODIAC = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];
const SX = [
  ["摩羯", "水瓶"], ["水瓶", "双鱼"], ["双鱼", "白羊"], ["白羊", "金牛"], ["金牛", "双子"], ["双子", "巨蟹"],
  ["巨蟹", "狮子"], ["狮子", "处女"], ["处女", "天秤"], ["天秤", "天蝎"], ["天蝎", "射手"], ["射手", "摩羯"],
];
const SX_DAY = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];

export default function AgeCalculator() {
  const [birth, setBirth] = useState("");
  const [target, setTarget] = useState(new Date().toISOString().slice(0, 10));

  const r = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth);
    const t = new Date(target);
    if (isNaN(b) || isNaN(t) || b > t) return null;
    let years = t.getFullYear() - b.getFullYear();
    let months = t.getMonth() - b.getMonth();
    let days = t.getDate() - b.getDate();
    if (days < 0) {
      months--;
      days += new Date(t.getFullYear(), t.getMonth(), 0).getDate();
    }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((t - b) / 86400000);
    const nextB = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (nextB < t) nextB.setFullYear(nextB.getFullYear() + 1);
    const daysToNext = Math.ceil((nextB - t) / 86400000);
    const m = b.getMonth();
    const sign = b.getDate() < SX_DAY[m] ? SX[m][0] : SX[m][1];
    return { years, months, days, totalDays, daysToNext, zodiac: ZODIAC[b.getFullYear() % 12], sign };
  }, [birth, target]);

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ flex: 1, minWidth: 180, fontSize: 14 }}>
          出生日期
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} style={{ marginTop: 6 }} />
        </label>
        <label style={{ flex: 1, minWidth: 180, fontSize: 14 }}>
          计算截止日
          <input type="date" value={target} onChange={(e) => setTarget(e.target.value)} style={{ marginTop: 6 }} />
        </label>
      </div>
      {r && (
        <div className="kv-grid">
          <div className="kv-item" style={{ cursor: "default" }}>
            <div className="k">年龄</div>
            <div className="v">{r.years} 岁 {r.months} 个月 {r.days} 天</div>
          </div>
          <div className="kv-item" style={{ cursor: "default" }}>
            <div className="k">总共生活</div>
            <div className="v">{r.totalDays.toLocaleString()} 天</div>
          </div>
          <div className="kv-item" style={{ cursor: "default" }}>
            <div className="k">距下次生日</div>
            <div className="v">{r.daysToNext} 天</div>
          </div>
          <div className="kv-item" style={{ cursor: "default" }}>
            <div className="k">生肖 / 星座</div>
            <div className="v">属{r.zodiac} · {r.sign}座</div>
          </div>
        </div>
      )}
    </div>
  );
}
