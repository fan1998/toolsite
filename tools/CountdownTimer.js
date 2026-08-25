"use client";

import { useEffect, useRef, useState } from "react";

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [left, setLeft] = useState(null);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const totalSet = minutes * 60 + seconds;

  const start = () => {
    if (left === null) setLeft(totalSet);
    setRunning(true);
    setDone(false);
    timerRef.current = setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setLeft(null);
    setDone(false);
  };

  const display = left ?? totalSet;
  const mm = String(Math.floor(display / 60)).padStart(2, "0");
  const ss = String(display % 60).padStart(2, "0");
  const progress = ((totalSet - display) / totalSet) * 100;

  return (
    <div className="panel" style={{ textAlign: "center" }}>
      {!running && left === null && (
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <label style={{ fontSize: 14 }}>
            分钟
            <input type="number" min="0" max="999" value={minutes} onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))} style={{ width: 80, marginLeft: 6 }} />
          </label>
          <label style={{ fontSize: 14 }}>
            秒
            <input type="number" min="0" max="59" value={seconds} onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))} style={{ width: 80, marginLeft: 6 }} />
          </label>
        </div>
      )}
      <div style={{
        fontSize: 72,
        fontWeight: 800,
        fontFamily: "ui-monospace, Consolas, monospace",
        color: done ? "#dc2626" : "var(--primary)",
        margin: "16px 0",
      }}>
        {done ? "时间到！" : `${mm}:${ss}`}
      </div>
      <div style={{ height: 8, background: "var(--bg)", borderRadius: 99, overflow: "hidden", maxWidth: 360, margin: "0 auto 16px" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,var(--primary),var(--primary-2))", transition: "width 1s linear" }} />
      </div>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        {!running ? (
          <button onClick={start} disabled={done}>开始</button>
        ) : (
          <button className="secondary" onClick={pause}>暂停</button>
        )}
        <button className="secondary" onClick={reset}>重置</button>
      </div>
    </div>
  );
}
