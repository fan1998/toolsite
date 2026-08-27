"use client";

import { useState } from "react";

function csvParse(text, delimiter) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === delimiter) {
      row.push(field); field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.length > 1 || row[0] !== "") rows.push(row);
  return rows;
}

export default function CsvJson() {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [msg, setMsg] = useState("");

  function csvToJson() {
    setMsg("");
    try {
      const rows = csvParse(csv.trim(), delimiter);
      if (!rows.length) { setMsg("CSV 内容为空。"); return; }
      let out;
      if (hasHeader) {
        const headers = rows[0];
        out = rows.slice(1).map((r) => {
          const obj = {};
          headers.forEach((h, i) => {
            const v = r[i] ?? "";
            obj[h || `列${i + 1}`] = v !== "" && !isNaN(v) && /^-?\d+(\.\d+)?$/.test(v.trim()) ? Number(v) : v;
          });
          return obj;
        });
      } else {
        out = rows.map((r) =>
          r.map((v) => (v !== "" && !isNaN(v) && /^-?\d+(\.\d+)?$/.test(v.trim()) ? Number(v) : v))
        );
      }
      setJson(JSON.stringify(out, null, 2));
    } catch (e) {
      setMsg("转换失败：" + e.message);
    }
  }

  function jsonToCsv() {
    setMsg("");
    try {
      let data = JSON.parse(json);
      if (!Array.isArray(data)) data = [data];
      if (!data.length) { setMsg("JSON 数组为空。"); return; }
      // 收集所有键，保持首次出现顺序
      const cols = [];
      const seen = new Set();
      for (const item of data) {
        if (typeof item !== "object" || item === null || Array.isArray(item)) {
          throw new Error("数组元素必须是对象（转成表格型 CSV）");
        }
        for (const k of Object.keys(item)) {
          if (!seen.has(k)) { seen.add(k); cols.push(k); }
        }
      }
      const esc = (v) => {
        const s = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
        return /["\n\r]|,/u.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      };
      const lines = [];
      if (hasHeader) lines.push(cols.map(esc).join(delimiter));
      for (const item of data) {
        lines.push(cols.map((k) => esc(item[k])).join(delimiter));
      }
      setCsv(lines.join("\n"));
    } catch (e) {
      setMsg("转换失败：" + e.message);
    }
  }

  return (
    <div className="panel">
      <div className="btn-row" style={{ alignItems: "center" }}>
        <label style={{ fontSize: 13.5 }}>
          分隔符
          <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} style={{ marginLeft: 8 }}>
            <option value=",">逗号 ,</option>
            <option value="\t">制表符 Tab</option>
            <option value=";">分号 ;</option>
            <option value="|">竖线 |</option>
          </select>
        </label>
        <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13.5 }}>
          <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
          首行是表头
        </label>
      </div>

      <div className="split">
        <div>
          <p className="success-text">CSV</p>
          <textarea
            value={csv}
            onChange={(e) => setCsv(e.target.value)}
            placeholder={'姓名,年龄\n张三,28\n李四,35'}
            rows={10}
          />
          <button className="btn" style={{ marginTop: 10 }} onClick={csvToJson}>CSV → JSON</button>
        </div>
        <div>
          <p className="success-text">JSON</p>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            placeholder='[{"name":"张三","age":28}]'
            rows={10}
          />
          <button className="btn" style={{ marginTop: 10 }} onClick={jsonToCsv}>JSON → CSV</button>
        </div>
      </div>

      {msg && <p style={{ color: "#f87171", fontSize: 13 }}>{msg}</p>}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
        支持带引号、含换行和转义双引号的标准 CSV；数字列自动转为数值。全部在浏览器本地解析。
      </p>
    </div>
  );
}
