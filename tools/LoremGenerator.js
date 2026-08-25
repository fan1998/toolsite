"use client";

import { useState } from "react";

const SENTENCES = [
  "在实际项目开发中，选择合适的工具往往能事半功倍，让团队把精力集中在真正重要的业务逻辑上。",
  "无论是编写文档、调试接口还是整理数据，一个顺手的在线工具箱都能显著减少重复劳动。",
  "效率的本质不是做得更快，而是减少不必要的等待和切换，把碎片时间还给思考。",
  "好的工具应该像空气一样自然存在，不需要学习成本，打开就能解决眼前的问题。",
  "数据安全越来越受到重视，本地化处理正在成为在线工具的基本素养。",
  "把复杂留给自己，把简单留给用户，这是所有优秀产品的共同特征。",
  "细节决定体验，一个按钮的位置、一次点击的反馈，都在悄悄影响使用者的心情。",
  "持续迭代比一次性完美更重要，小步快跑才能快速响应用户的真实需求。",
];

export default function LoremGenerator() {
  const [paras, setParas] = useState(3);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const out = Array.from({ length: paras }, () =>
      Array.from({ length: 4 + Math.floor(Math.random() * 3) }, () => SENTENCES[Math.floor(Math.random() * SENTENCES.length)]).join("")
    ).join("\n\n");
    setResult(out);
    setCopied(false);
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ fontSize: 14 }}>
          段落数：
          <input type="number" min="1" max="20" value={paras} onChange={(e) => setParas(Math.max(1, Math.min(20, Number(e.target.value))))} style={{ width: 70, marginLeft: 8 }} />
        </label>
        <button onClick={generate}>生成占位文本</button>
        {result && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); }}>
            {copied ? "已复制" : "复制"}
          </button>
        )}
      </div>
      {result && <pre className="output" style={{ fontFamily: "inherit", whiteSpace: "pre-wrap" }}>{result}</pre>}
    </div>
  );
}
