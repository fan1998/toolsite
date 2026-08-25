"use client";

import { useMemo, useState } from "react";

const CONTROL = {
  0: "NUL 空字符",
  1: "SOH 标题开始",
  2: "STX 正文开始",
  3: "ETX 正文结束",
  4: "EOT 传输结束",
  5: "ENQ 询问",
  6: "ACK 确认",
  7: "BEL 响铃",
  8: "BS 退格",
  9: "TAB 水平制表",
  10: "LF 换行",
  11: "VT 垂直制表",
  12: "FF 换页",
  13: "CR 回车",
  14: "SO 移出",
  15: "SI 移入",
  16: "DLE 数据链路转义",
  17: "DC1 设备控制1",
  18: "DC2 设备控制2",
  19: "DC3 设备控制3",
  20: "DC4 设备控制4",
  21: "NAK 否定",
  22: "SYN 同步空闲",
  23: "ETB 块传输结束",
  24: "CAN 取消",
  25: "EM 介质结束",
  26: "SUB 替换",
  27: "ESC 转义",
  28: "FS 文件分隔符",
  29: "GS 组分隔符",
  30: "RS 记录分隔符",
  31: "US 单元分隔符",
  127: "DEL 删除",
};

const NAMED = {
  32: "空格",
  33: "感叹号",
  34: "双引号",
  35: "井号",
  36: "美元符",
  37: "百分号",
  38: "和号",
  39: "单引号",
  40: "左括号",
  41: "右括号",
  42: "星号",
  43: "加号",
  44: "逗号",
  45: "连字符",
  46: "句点",
  47: "斜杠",
};

function describe(i) {
  if (CONTROL[i]) return CONTROL[i];
  if (NAMED[i]) return NAMED[i];
  if (i === 32) return "空格";
  if (i >= 48 && i <= 57) return "数字";
  if (i >= 65 && i <= 90) return "大写字母";
  if (i >= 97 && i <= 122) return "小写字母";
  return "符号";
}

export default function AsciiTable() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const list = [];
    for (let i = 0; i < 128; i++) {
      const isControl = i < 32 || i === 127;
      list.push({
        dec: i,
        hex: i.toString(16).toUpperCase().padStart(2, "0"),
        char: isControl ? "·" : String.fromCharCode(i),
        bin: i.toString(2).padStart(8, "0"),
        desc: describe(i),
      });
    }
    const query = q.trim().toLowerCase();
    if (query) {
      return list.filter(
        (r) =>
          r.desc.toLowerCase().includes(query) ||
          String(r.dec).includes(query) ||
          r.hex.toLowerCase().includes(query) ||
          r.char.toLowerCase().includes(query)
      );
    }
    return list;
  }, [q]);

  return (
    <div className="panel">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索：十进制 / 十六进制 / 字符 / 含义"
        style={{ maxWidth: 320 }}
      />
      <div style={{ marginTop: 12, maxHeight: 440, overflow: "auto" }}>
        <table className="ascii-table">
          <thead>
            <tr>
              <th>DEC</th>
              <th>HEX</th>
              <th>字符</th>
              <th>二进制</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.dec}>
                <td>{r.dec}</td>
                <td>{r.hex}</td>
                <td className="ascii-char">{r.char}</td>
                <td style={{ fontFamily: "ui-monospace, Consolas, monospace" }}>
                  {r.bin}
                </td>
                <td>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
