"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_HTML = `<div class="card">
  <h1>你好，凡间工具箱</h1>
  <p>在左边写 HTML / CSS，右边实时预览。</p>
  <button onclick="this.textContent='点了我 ' + (++n) + ' 次'">试试点我</button>
</div>
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; }
  .card { border: 2px solid #7c5cff; border-radius: 12px; padding: 20px; max-width: 480px; }
  button { padding: 8px 16px; cursor: pointer; }
</style>
<script>
  var n = 0;
<\/script>`;

export default function HtmlRunner() {
  const [code, setCode] = useState(DEFAULT_HTML);
  const iframeRef = useRef(null);
  const timerRef = useRef(null);

  function render() {
    const doc = iframeRef.current;
    if (!doc) return;
    doc.srcdoc = code;
  }

  // 输入停顿 500ms 后自动刷新
  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(render, 500);
    return () => clearTimeout(timerRef.current);
  }, [code]);

  function openInNewTab() {
    const blob = new Blob([code], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
  }

  return (
    <div className="panel">
      <div className="split">
        <div>
          <p className="success-text">HTML 源码（自动刷新）</p>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={16}
            spellCheck={false}
            style={{ fontFamily: "monospace", fontSize: 13 }}
          />
          <div className="btn-row">
            <button className="btn" onClick={render}>立即运行</button>
            <button className="btn" onClick={openInNewTab}>在新窗口打开</button>
            <button className="btn" onClick={() => setCode(DEFAULT_HTML)}>恢复示例</button>
          </div>
        </div>
        <div>
          <p className="success-text">预览</p>
          <iframe
            ref={iframeRef}
            title="HTML 预览"
            sandbox="allow-scripts allow-modals"
            style={{
              width: "100%",
              height: 420,
              border: "1px solid var(--border)",
              borderRadius: 10,
              background: "#fff",
            }}
          />
        </div>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
        支持 HTML + 内联 CSS/JS。预览使用沙箱 iframe，脚本只在这个隔离环境里执行，不影响本站页面；内容不上传服务器。
      </p>
    </div>
  );
}
