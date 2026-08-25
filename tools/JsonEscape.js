"use client";

import { useState } from "react";

export default function JsonEscape() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [msg, setMsg] = useState("");

  const escape = () => {
    setMsg("");
    setResult(JSON.stringify(text));
  };

  const unescape = () => {
    setMsg("");
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "string") {
        setResult(JSON.stringify(parsed, null, 2));
        setMsg("输入不是字符串，已按JSON解析展示");
      } else {
        setResult(parsed);
      }
    } catch (e) {
      setMsg("无法解析：不是有效的JSON字符串");
      setResult("");
    }
  };

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="粘贴含换行、引号的文本或被转义的JSON字符串" />
      <div className="btn-row">
        <button onClick={escape}>转义（变为JSON字符串）</button>
        <button onClick={unescape}>去转义（还原内容）</button>
      </div>
      {msg && <p className="success-text">{msg}</p>}
      {result && (
        <>
          <pre className="output">{result}</pre>
          <div className="btn-row">
            <button className="secondary" onClick={() => navigator.clipboard.writeText(result)}>复制结果</button>
            <button className="secondary" onClick={() => setText(result)}>结果放回输入</button>
          </div>
        </>
      )}
    </div>
  );
}
