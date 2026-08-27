"use client";

import { useMemo, useState } from "react";

const PROVINCES = {
  11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
  21: "辽宁", 22: "吉林", 23: "黑龙江",
  31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
  41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南",
  50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
  61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
  71: "台湾", 81: "香港", 82: "澳门",
};
const WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const CHECK_MAP = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

function analyze(idRaw) {
  const id = idRaw.trim().toUpperCase();
  if (!id) return null;
  if (!/^\d{17}[\dX]$/.test(id)) {
    return { ok: false, reason: "格式不正确：应为18位，前17位为数字，末位为数字或X。" };
  }
  const provinceCode = Number(id.slice(0, 2));
  const province = PROVINCES[provinceCode];
  if (!province) {
    return { ok: false, reason: "前两位不是合法的省份代码：" + id.slice(0, 2) };
  }
  const y = Number(id.slice(6, 10));
  const m = Number(id.slice(10, 12));
  const d = Number(id.slice(12, 14));
  const birthday = new Date(y, m - 1, d);
  const dateOk =
    birthday.getFullYear() === y && birthday.getMonth() === m - 1 && birthday.getDate() === d &&
    y >= 1900 && birthday <= new Date();
  if (!dateOk) {
    return { ok: false, reason: "出生日期段无效：" + id.slice(6, 14) };
  }
  let sum = 0;
  for (let i = 0; i < 17; i++) sum += Number(id[i]) * WEIGHTS[i];
  const expect = CHECK_MAP[sum % 11];
  const real = id[17];
  if (real !== expect) {
    return { ok: false, reason: `校验位错误：末位应为 ${expect}，实际是 ${real}。` };
  }
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now < new Date(now.getFullYear(), m - 1, d)) age--;
  return {
    ok: true,
    province,
    birthday: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    gender: Number(id[16]) % 2 === 1 ? "男" : "女",
    age: age < 0 ? 0 : age,
    expect,
  };
}

export default function IdCardValidate() {
  const [value, setValue] = useState("");
  const r = useMemo(() => analyze(value), [value]);

  return (
    <div className="panel">
      <label style={{ fontSize: 14 }}>
        身份证号码（输入即自动解析校验）
        <input
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^\dxX]/g, ""))}
          maxLength={18}
          placeholder={'例如 110101199003077758'}
          style={{ marginTop: 6 }}
        />
      </label>

      {!r && (
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          输入完整的18位身份证号，本页将本地校验格式、地区码、出生日期和校验位，并解析出省市、生日、性别。
        </p>
      )}

      {r && !r.ok && (
        <div style={{ color: "#f87171", fontSize: 14, marginTop: 12 }}>✘ {r.reason}</div>
      )}

      {r && r.ok && (
        <>
          <div className="kv-grid">
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">校验结果</div>
              <div className="v" style={{ color: "#4ade80" }}>✓ 校验位正确</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">省份</div>
              <div className="v">{r.province}</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">出生日期</div>
              <div className="v">{r.birthday}</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">性别</div>
              <div className="v">{r.gender}</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">周岁</div>
              <div className="v">{r.age} 岁</div>
            </div>
          </div>
          <button className="btn" onClick={() => navigator.clipboard.writeText(r.expect)}>
            复制正确的校验位「{r.expect}」
          </button>
        </>
      )}
    </div>
  );
}
