"use client";

import { useState } from "react";

const MORSE = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "/": "-..-.", "@": ".--.-.", "-": "-....-",
};
const REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

export default function MorseCode() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const encode = () =>
    text.toUpperCase().split("").map((c) => (c === " " ? "/" : REV && MORSE[c] || c)).join(" ").replace(/\/ /g, "/ ");

  const decode = () =>
    text.trim().split(/\s*\/\s*|\s{3}/).map((w) =>
      w.trim().split(/\s+/).map((c) => REV[c] || "?").join("")
    ).join(" ");

  return (
    <div className="panel">
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="输入字母数字（编码），或点划序列如 ... --- ...（解码）" />
      <div className="btn-row">
        <button onClick={() => { setResult(encode()); setCopied(false); }}>编码为摩斯电码</button>
        <button onClick={() => { setResult(decode()); setCopied(false); }}>解码摩斯电码</button>
        {result && (
          <button className="secondary" onClick={async () => { await navigator.clipboard.writeText(result); setCopied(true); }}>
            {copied ? "已复制" : "复制"}
          </button>
        )}
      </div>
      {result && <pre className="output">{result}</pre>}
    </div>
  );
}
