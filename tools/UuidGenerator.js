"use client";

import { useState } from "react";

export default function UuidGenerator() {
  const [list, setList] = useState([]);

  const generate = (n) => {
    const arr = Array.from({ length: n }, () => crypto.randomUUID());
    setList(arr);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(list.join("\n"));
  };

  return (
    <div className="panel">
      <div className="btn-row">
        <button onClick={() => generate(1)}>生成1个</button>
        <button onClick={() => generate(5)}>生成5个</button>
        <button onClick={() => generate(10)}>生成10个</button>
        {list.length > 0 && (
          <button className="secondary" onClick={copyAll}>
            复制全部
          </button>
        )}
      </div>
      {list.map((u) => (
        <pre className="output" key={u} style={{ marginBottom: 8 }}>
          {u}
        </pre>
      ))}
    </div>
  );
}
