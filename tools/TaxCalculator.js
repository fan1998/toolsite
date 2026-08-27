"use client";

import { useMemo, useState } from "react";

const fmtMoney = (x) =>
  x.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// 2019年起综合所得税率表（年度累计应纳税所得额 → 税率、速算扣除数，单位元）
const BRACKETS = [
  [36000, 0.03, 0],
  [144000, 0.1, 2520],
  [300000, 0.2, 16920],
  [420000, 0.25, 31920],
  [660000, 0.3, 52920],
  [960000, 0.35, 85920],
  [Infinity, 0.45, 181920],
];

// 起征点 5000/月，每年基本减除费用60000元
const ANNUAL_DEDUCTION = 60000;

function calc({ monthlySalary, socialBase, insuranceRate, housingRate, special }) {
  const perYearIncome = [];
  let details = [];
  // 逐月累计预扣预缴
  let cumIncome = 0, cumDeductSocial = 0, cumSpecial = 0, cumTax = 0;
  let sumInsurance = 0, sumHousing = 0;
  for (let m = 1; m <= 12; m++) {
    const salary = monthlySalary;
    const social = socialBase * insuranceRate;
    const housing = socialBase * housingRate;
    sumInsurance += social;
    sumHousing += housing;
    cumIncome += salary;
    cumDeductSocial += social + housing;
    cumSpecial += special;
    const taxable = cumIncome - ANNUAL_DEDUCTION - cumDeductSocial - cumSpecial;
    let tax = 0;
    if (taxable > 0) {
      const br = BRACKETS.find((b) => taxable <= b[0]);
      tax = Math.round((taxable * br[1] - br[2]) * 100) / 100;
    }
    const due = Math.max(0, Math.round((tax - cumTax) * 100) / 100);
    cumTax += due;
    details.push({
      month: m,
      income: salary,
      social: Math.round((social + housing) * 100) / 100,
      special,
      tax: due,
      net: Math.round((salary - social - housing - due) * 100) / 100,
      cumulativeTaxable: Math.max(0, Math.round(taxable * 100) / 100),
    });
  }
  const yearNet = details.reduce((s, x) => s + x.net, 0);
  const yearTax = cumTax;
  const annualTaxable =
    cumIncome - ANNUAL_DEDUCTION - cumDeductSocial - cumSpecial;
  const effective = annualTaxable > 0 ? (yearTax / cumIncome) * 100 : 0;
  return { details, yearNet, yearTax, annualTaxable: Math.max(0, annualTaxable), effective };
}

export default function TaxCalculator() {
  const [salary, setSalary] = useState("15000");
  const [socialBase, setSocialBase] = useState("15000");
  const [insurancePct, setInsurancePct] = useState("10.5"); // 五险个人部分经验值：养老8%+医疗2%+失业0.5%
  const [housingPct, setHousingPct] = useState("12");
  const [special, setSpecial] = useState("1000");

  const r = useMemo(() => {
    const s = Number(salary), b = Number(socialBase),
      ir = Number(insurancePct) / 100, hr = Number(housingPct) / 100, sp = Number(special) || 0;
    if (![s, b, ir, hr].every((x) => !isNaN(x) && x >= 0)) return null;
    if (sp < 0 || isNaN(sp)) return null;
    return calc({ monthlySalary: s, socialBase: b, insuranceRate: ir, housingRate: hr, special: sp });
  }, [salary, socialBase, insurancePct, housingPct, special]);

  return (
    <div className="panel">
      <div className="btn-row">
        <label style={{ flex: 1, minWidth: 150, fontSize: 14 }}>
          月薪（税前）<br />
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </label>
        <label style={{ flex: 1, minWidth: 150, fontSize: 14 }}>
          社保公积金基数<br />
          <input type="number" value={socialBase} onChange={(e) => setSocialBase(e.target.value)} />
        </label>
        <label style={{ flex: 1, minWidth: 130, fontSize: 14 }}>
          五险个人比例 %<br />
          <input type="number" step="0.1" value={insurancePct} onChange={(e) => setInsurancePct(e.target.value)} />
        </label>
        <label style={{ flex: 1, minWidth: 130, fontSize: 14 }}>
          公积金比例 %<br />
          <input type="number" step="1" value={housingPct} onChange={(e) => setHousingPct(e.target.value)} />
        </label>
        <label style={{ flex: 1, minWidth: 130, fontSize: 14 }}>
          月专项附加扣除<br />
          <input type="number" value={special} onChange={(e) => setSpecial(e.target.value)} />
        </label>
      </div>

      {r && (
        <>
          <div className="kv-grid">
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">首月到手（约）</div>
              <div className="v">{fmtMoney(r.details[0].net)} 元</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">全年到手合计</div>
              <div className="v">{fmtMoney(r.yearNet)} 元</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">全年个税合计</div>
              <div className="v">{fmtMoney(r.yearTax)} 元</div>
            </div>
            <div className="kv-item" style={{ cursor: "default" }}>
              <div className="k">实际税率</div>
              <div className="v">{r.effective.toFixed(2)}%</div>
            </div>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 12 }}>
            下表为逐月税前/五险一金/个税/到手明细（按累计预扣法估算，专项附加扣除只影响个税、不改变到手工资的扣款项）：
          </p>
          <pre className="output" style={{ maxHeight: 320, overflow: "auto" }}>
{`月份   税前收入     五险一金     缴纳个税     当月到手
` + r.details.map((d) =>
`${String(d.month).padStart(2)}    ${d.income.toFixed(2).padStart(10)} ${String(d.social.toFixed(2)).padStart(12)} ${String(d.tax.toFixed(2)).padStart(10)} ${d.net.toFixed(2).padStart(12)}`
).join("\n")}
          </pre>
          <p style={{ color: "var(--muted)", fontSize: 12.5 }}>
            本工具为简化估算：社保基数默认等于月薪且不考虑上下限封顶，未计年终奖等一次性收入；实际以单位申报为准。
          </p>
        </>
      )}
    </div>
  );
}
