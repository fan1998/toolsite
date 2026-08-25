"use client";

import { useState } from "react";

const DIGITS = "零壹贰叁肆伍陆柒捌玖";
const UNITS = ["", "拾", "佰", "仟"];
const SECTIONS = ["", "万", "亿", "兆"];

function toUpper(num) {
  const n = Math.round(Number(num) * 100) / 100;
  if (n <= 0 || isNaN(n) || n >= 1e16) return "";
  const intPart = Math.floor(n);
  const cent = Math.round((n - intPart) * 100);
  let result = "";
  let sectionIdx = 0;
  if (intPart === 0) result = "零";
  let rest = intPart;
  while (rest > 0) {
    const section = rest % 10000;
    if (section === 0) {
      if (result && !result.startsWith("零")) result = "零" + result;
    } else {
      let s = "";
      let z = false;
      let sec = section;
      for (let u = 0; u < 4; u++) {
        const d = sec % 10;
        if (d === 0) {
          z = s !== "";
        } else {
          s = DIGITS[d] + UNITS[u] + (z ? "零" : "") + s;
          z = false;
        }
        sec = Math.floor(sec / 10);
      }
      result = s + SECTIONS[sectionIdx] + result;
    }
    rest = Math.floor(rest / 10000);
    sectionIdx++;
  }
  result += "元";
  if (cent === 0) result += "整";
  else {
    const j = Math.floor(cent / 10);
    const f = cent % 10;
    if (j > 0) result += DIGITS[j] + "角";
    else if (intPart > 0) result += "零";
    if (f > 0) result += DIGITS[f] + "分";
    else if (j === 0) result += "整";
  }
  return result;
}

export default function AmountUpper() {
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const upper = amount && !isNaN(Number(amount)) && Number(amount) > 0 ? toUpper(Number(amount)) : "";

  return (
    <div className="panel">
      <div className="btn-row">
        <span style={{ fontSize: 20, fontWeight: 700 }}>¥</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setCopied(false); }}
          placeholder="输入金额，如 12345.67"
          style={{ fontSize: 18 }}
        />
      </div>
      {upper && (
        <>
          <pre className="output" style={{ fontFamily: "inherit", fontSize: 16, textAlign: "center" }}>{upper}</pre>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(upper); setCopied(true); }}>
              {copied ? "已复制" : "复制大写金额"}
            </button>
          </div>
        </>
      )}
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>符合财务规范的人民币大写转换，用于合同、发票、报销单据。</p>
    </div>
  );
}
