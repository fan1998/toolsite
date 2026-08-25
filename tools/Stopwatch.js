"use client";

import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const start = () => {
    startRef.current = Date.now() - elapsed;
    setRunning(true);
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 31);
  };

  const pause = () => {
    clearInterval(timerRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps((prev) => [elapsed, ...prev]);
  };

  const fmt = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };

  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 56, fontWeight: 800, fontFamily: "ui-monospace, Consolas, monospace", color: "var(--primary)", margin: "12px 0" }}>
        {fmt(elapsed)}
      </div>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        {!running ? (
          <button onClick={elapsed > 0 ? start : start}>{elapsed > 0 && !running ? "继续" : "启动"}</button>
        ) : (
          <button className="secondary" onClick={pause}>暂停</button>
        )}
        <button className="secondary" onClick={lap} disabled={!running}>计次</button>
        <button className="secondary" onClick={reset}>重置</button>
      </div>
      {laps.length > 0 && (
        <pre className="output" style={{ maxHeight: 260, overflow: "auto", textAlign: "left" }}>
          {laps.map((l, i) => (
            <div key={i}>
              {`第${laps.length - i}次  ${fmt(l)}  （间隔 ${fmt(l - (laps[i + 1] || 0))}）`}
            </div>
          ))}
        </pre>
      )}
    </div>
  );
}
