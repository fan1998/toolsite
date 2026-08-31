"use client";

import { useEffect, useMemo, useState } from "react";

const money = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });

function NumberField({ label, value, onChange, min, max, step = "any", hint, prefix, suffix }) {
  return (
    <label className="en-field">
      <span>{label}</span>
      <div className="en-input-wrap">
        {prefix && <i>{prefix}</i>}
        <input type="number" value={value} min={min} max={max} step={step} onChange={(e) => onChange(e.target.value)} />
        {suffix && <i>{suffix}</i>}
      </div>
      {hint && <small>{hint}</small>}
    </label>
  );
}

function ResultGrid({ items }) {
  return (
    <div className="en-result-grid" aria-live="polite">
      {items.map((item) => (
        <div className={item.primary ? "en-result primary" : "en-result"} key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          {item.note && <small>{item.note}</small>}
        </div>
      ))}
    </div>
  );
}

function RoasCalculator() {
  const [spend, setSpend] = useState("1000");
  const [revenue, setRevenue] = useState("4000");
  const [margin, setMargin] = useState("40");
  const s = Number(spend) || 0;
  const r = Number(revenue) || 0;
  const m = Number(margin) || 0;
  const roas = s > 0 ? r / s : 0;
  const breakEven = m > 0 ? 100 / m : 0;
  const contribution = r * (m / 100) - s;
  const above = roas >= breakEven && breakEven > 0;
  return (
    <ToolFrame eyebrow="Campaign economics" note="Currency-neutral: use the same currency for spend and revenue.">
      <div className="en-field-grid">
        <NumberField label="Ad spend" value={spend} onChange={setSpend} min="0" prefix="$" />
        <NumberField label="Attributed revenue" value={revenue} onChange={setRevenue} min="0" prefix="$" />
        <NumberField label="Gross margin" value={margin} onChange={setMargin} min="0.01" max="100" suffix="%" hint="Before advertising cost" />
      </div>
      <ResultGrid items={[
        { label: "Actual ROAS", value: `${number.format(roas)}×`, primary: true },
        { label: "Break-even ROAS", value: breakEven ? `${number.format(breakEven)}×` : "—" },
        { label: "After product cost + ads", value: `$${money.format(contribution)}`, note: "Simplified contribution" },
        { label: "Break-even check", value: above ? "Above" : "Below", note: above ? "Before overhead and fees" : "Review price, margin or media cost" },
      ]} />
    </ToolFrame>
  );
}

function MarketingMetrics() {
  const [impressions, setImpressions] = useState("100000");
  const [clicks, setClicks] = useState("2500");
  const [spend, setSpend] = useState("2000");
  const [conversions, setConversions] = useState("100");
  const [revenue, setRevenue] = useState("8000");
  const i = Number(impressions) || 0;
  const c = Number(clicks) || 0;
  const s = Number(spend) || 0;
  const v = Number(conversions) || 0;
  const r = Number(revenue) || 0;
  return (
    <ToolFrame eyebrow="Paid media funnel" note="Use unrounded values from the same platform, date range and attribution view.">
      <div className="en-field-grid dense">
        <NumberField label="Impressions" value={impressions} onChange={setImpressions} min="0" />
        <NumberField label="Clicks" value={clicks} onChange={setClicks} min="0" />
        <NumberField label="Spend" value={spend} onChange={setSpend} min="0" prefix="$" />
        <NumberField label="Conversions" value={conversions} onChange={setConversions} min="0" />
        <NumberField label="Revenue" value={revenue} onChange={setRevenue} min="0" prefix="$" />
      </div>
      <ResultGrid items={[
        { label: "CTR", value: i ? `${number.format((c / i) * 100)}%` : "—", primary: true },
        { label: "CPM", value: i ? `$${money.format((s / i) * 1000)}` : "—" },
        { label: "CPC", value: c ? `$${money.format(s / c)}` : "—" },
        { label: "Conversion rate", value: c ? `${number.format((v / c) * 100)}%` : "—" },
        { label: "CPA", value: v ? `$${money.format(s / v)}` : "—" },
        { label: "ROAS", value: s ? `${number.format(r / s)}×` : "—" },
      ]} />
    </ToolFrame>
  );
}

function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState("100");
  const [cost, setCost] = useState("60");
  const [target, setTarget] = useState("40");
  const r = Number(revenue) || 0;
  const c = Number(cost) || 0;
  const t = Number(target) || 0;
  const profit = r - c;
  return (
    <ToolFrame eyebrow="Unit economics" note="Choose one consistent cost definition before comparing margins.">
      <div className="en-field-grid">
        <NumberField label="Revenue / selling price" value={revenue} onChange={setRevenue} prefix="$" />
        <NumberField label="Included cost" value={cost} onChange={setCost} prefix="$" />
        <NumberField label="Target margin" value={target} onChange={setTarget} min="0" max="99.99" suffix="%" />
      </div>
      <ResultGrid items={[
        { label: "Profit", value: `$${money.format(profit)}`, primary: true },
        { label: "Profit margin", value: r ? `${number.format((profit / r) * 100)}%` : "—" },
        { label: "Cost ratio", value: r ? `${number.format((c / r) * 100)}%` : "—" },
        { label: "Price for target margin", value: t < 100 ? `$${money.format(c / (1 - t / 100))}` : "—" },
      ]} />
    </ToolFrame>
  );
}

function MarkupCalculator() {
  const [cost, setCost] = useState("80");
  const [price, setPrice] = useState("100");
  const [target, setTarget] = useState("25");
  const c = Number(cost) || 0;
  const p = Number(price) || 0;
  const t = Number(target) || 0;
  const profit = p - c;
  return (
    <ToolFrame eyebrow="Pricing check" note="Markup uses cost as the denominator; margin uses selling price.">
      <div className="en-field-grid">
        <NumberField label="Unit cost" value={cost} onChange={setCost} prefix="$" />
        <NumberField label="Selling price" value={price} onChange={setPrice} prefix="$" />
        <NumberField label="Target markup" value={target} onChange={setTarget} suffix="%" />
      </div>
      <ResultGrid items={[
        { label: "Markup", value: c ? `${number.format((profit / c) * 100)}%` : "—", primary: true },
        { label: "Margin", value: p ? `${number.format((profit / p) * 100)}%` : "—" },
        { label: "Gross profit", value: `$${money.format(profit)}` },
        { label: "Price for target markup", value: `$${money.format(c * (1 + t / 100))}` },
      ]} />
    </ToolFrame>
  );
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const p = Number(principal) || 0;
  const payment = Number(monthly) || 0;
  const months = Math.max(0, Math.round((Number(years) || 0) * 12));
  const monthlyRate = (Number(rate) || 0) / 100 / 12;
  const futurePrincipal = monthlyRate ? p * (1 + monthlyRate) ** months : p;
  const futurePayments = monthlyRate ? payment * (((1 + monthlyRate) ** months - 1) / monthlyRate) : payment * months;
  const balance = futurePrincipal + futurePayments;
  const deposits = p + payment * months;
  return (
    <ToolFrame eyebrow="Growth scenario" note="Monthly compounding; contributions are added at the end of each month.">
      <div className="en-field-grid dense">
        <NumberField label="Starting balance" value={principal} onChange={setPrincipal} min="0" prefix="$" />
        <NumberField label="Monthly contribution" value={monthly} onChange={setMonthly} min="0" prefix="$" />
        <NumberField label="Annual rate" value={rate} onChange={setRate} step="0.1" suffix="%" />
        <NumberField label="Years" value={years} onChange={setYears} min="0" step="1" />
      </div>
      <ResultGrid items={[
        { label: "Projected balance", value: `$${money.format(balance)}`, primary: true },
        { label: "Total deposits", value: `$${money.format(deposits)}` },
        { label: "Calculated interest", value: `$${money.format(balance - deposits)}` },
        { label: "Monthly periods", value: number.format(months) },
      ]} />
    </ToolFrame>
  );
}

function MortgageCalculator() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState("30");
  const principal = Number(loan) || 0;
  const n = Math.max(0, Math.round((Number(years) || 0) * 12));
  const r = (Number(rate) || 0) / 100 / 12;
  const payment = n ? (r ? principal * (r * (1 + r) ** n) / ((1 + r) ** n - 1) : principal / n) : 0;
  const total = payment * n;
  return (
    <ToolFrame eyebrow="Fixed-rate estimate" note="Principal and interest only; excludes tax, insurance, fees and changing rates.">
      <div className="en-field-grid">
        <NumberField label="Loan amount" value={loan} onChange={setLoan} min="0" prefix="$" />
        <NumberField label="Annual interest rate" value={rate} onChange={setRate} min="0" step="0.01" suffix="%" />
        <NumberField label="Loan term" value={years} onChange={setYears} min="1" step="1" suffix="years" />
      </div>
      <ResultGrid items={[
        { label: "Monthly payment", value: `$${money.format(payment)}`, primary: true },
        { label: "Total paid", value: `$${money.format(total)}` },
        { label: "Total interest", value: `$${money.format(total - principal)}` },
        { label: "Number of payments", value: number.format(n) },
      ]} />
    </ToolFrame>
  );
}

function toDateInput(date) {
  const y = date.getFullYear();
  return `${y}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseLocalDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
}

function isWeekday(date) {
  return date.getDay() !== 0 && date.getDay() !== 6;
}

function countWeekdays(start, end, includeEnd) {
  if (start > end) return -countWeekdays(end, start, includeEnd);
  let count = 0;
  const cursor = new Date(start);
  const limit = new Date(end);
  if (!includeEnd) limit.setDate(limit.getDate() - 1);
  while (cursor <= limit) {
    if (isWeekday(cursor)) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

function addWeekdays(start, amount) {
  const cursor = new Date(start);
  const direction = amount < 0 ? -1 : 1;
  let left = Math.abs(amount);
  while (left > 0) {
    cursor.setDate(cursor.getDate() + direction);
    if (isWeekday(cursor)) left -= 1;
  }
  return cursor;
}

function BusinessDaysCalculator() {
  const today = useMemo(() => new Date(), []);
  const nextWeek = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 7); return d; }, []);
  const [mode, setMode] = useState("between");
  const [start, setStart] = useState(toDateInput(today));
  const [end, setEnd] = useState(toDateInput(nextWeek));
  const [days, setDays] = useState("10");
  const [includeEnd, setIncludeEnd] = useState(true);
  const startDate = parseLocalDate(start);
  const endDate = parseLocalDate(end);
  const total = countWeekdays(startDate, endDate, includeEnd);
  const resultDate = addWeekdays(startDate, Math.trunc(Number(days) || 0));
  return (
    <ToolFrame eyebrow="Weekday scheduling" note="Weekends excluded. Public holidays are not included automatically.">
      <div className="en-segmented" role="group" aria-label="Calculation mode">
        <button className={mode === "between" ? "active" : ""} onClick={() => setMode("between")}>Count between dates</button>
        <button className={mode === "add" ? "active" : ""} onClick={() => setMode("add")}>Add business days</button>
      </div>
      {mode === "between" ? (
        <>
          <div className="en-field-grid">
            <label className="en-field"><span>Start date</span><input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></label>
            <label className="en-field"><span>End date</span><input type="date" value={end} onChange={(e) => setEnd(e.target.value)} /></label>
            <label className="en-check"><input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} /><span>Include the end date</span></label>
          </div>
          <ResultGrid items={[{ label: "Business days", value: number.format(total), primary: true }, { label: "Calendar span", value: `${Math.round((endDate - startDate) / 86400000)} days` }]} />
        </>
      ) : (
        <>
          <div className="en-field-grid">
            <label className="en-field"><span>Start date</span><input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></label>
            <NumberField label="Business days to add" value={days} onChange={setDays} step="1" hint="Use a negative number to move backward" />
          </div>
          <ResultGrid items={[{ label: "Result date", value: resultDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), primary: true }, { label: "Day of week", value: resultDate.toLocaleDateString("en-US", { weekday: "long" }) }]} />
        </>
      )}
    </ToolFrame>
  );
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { field += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += char;
  }
  row.push(field.replace(/\r$/, ""));
  if (row.some((cell) => cell !== "") || rows.length === 0) rows.push(row);
  if (quoted) throw new Error("A quoted CSV field is not closed.");
  return rows;
}

function csvEscape(value) {
  const text = value == null ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function CsvJsonConverter() {
  const [mode, setMode] = useState("csv");
  const [input, setInput] = useState('name,email\nAda,ada@example.com\n"Lin, Wei",lin@example.com');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const convert = () => {
    try {
      if (mode === "csv") {
        const rows = parseCsv(input);
        const headers = rows.shift() || [];
        if (!headers.length || headers.every((h) => !h.trim())) throw new Error("The CSV header row is empty.");
        const data = rows.filter((r) => r.some((cell) => cell !== "")).map((row) => Object.fromEntries(headers.map((header, i) => [header || `column_${i + 1}`, row[i] ?? ""])));
        setOutput(JSON.stringify(data, null, 2));
      } else {
        const data = JSON.parse(input);
        if (!Array.isArray(data)) throw new Error("JSON input must be an array of objects.");
        const headers = [...new Set(data.flatMap((item) => Object.keys(item || {})))];
        setOutput([headers.map(csvEscape).join(","), ...data.map((item) => headers.map((h) => csvEscape(item?.[h])).join(","))].join("\n"));
      }
      setError("");
    } catch (err) {
      setOutput("");
      setError(err.message);
    }
  };
  const switchMode = (next) => {
    setMode(next);
    setOutput("");
    setError("");
    setInput(next === "csv" ? 'name,email\nAda,ada@example.com\n"Lin, Wei",lin@example.com' : '[\n  {"name": "Ada", "email": "ada@example.com"}\n]');
  };
  const download = () => {
    if (!output) return;
    const extension = mode === "csv" ? "json" : "csv";
    const blob = new Blob([output], { type: extension === "json" ? "application/json" : "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `converted.${extension}`; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <ToolFrame eyebrow="Local data conversion" note="The first CSV row becomes JSON keys. JSON input must be an array of objects.">
      <div className="en-segmented"><button className={mode === "csv" ? "active" : ""} onClick={() => switchMode("csv")}>CSV → JSON</button><button className={mode === "json" ? "active" : ""} onClick={() => switchMode("json")}>JSON → CSV</button></div>
      <div className="en-converter-grid">
        <label className="en-field"><span>{mode === "csv" ? "CSV input" : "JSON input"}</span><textarea value={input} onChange={(e) => setInput(e.target.value)} spellCheck="false" /></label>
        <label className="en-field"><span>{mode === "csv" ? "JSON output" : "CSV output"}</span><textarea value={output} readOnly placeholder="Converted output appears here" spellCheck="false" /></label>
      </div>
      {error && <p className="en-error">{error}</p>}
      <div className="en-actions"><button onClick={convert}>Convert data</button><button className="ghost" onClick={() => navigator.clipboard?.writeText(output)} disabled={!output}>Copy output</button><button className="ghost" onClick={download} disabled={!output}>Download</button></div>
    </ToolFrame>
  );
}

function prettyBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${number.format(bytes / 1024 ** index)} ${units[index]}`;
}

function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState("78");
  const [maxWidth, setMaxWidth] = useState("1920");
  const [format, setFormat] = useState("image/webp");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => () => { if (result?.url) URL.revokeObjectURL(result.url); }, [result]);
  const compress = async () => {
    if (!file) return;
    setBusy(true); setError("");
    try {
      const bitmap = await createImageBitmap(file);
      const targetWidth = Math.min(bitmap.width, Math.max(1, Number(maxWidth) || bitmap.width));
      const targetHeight = Math.round(bitmap.height * (targetWidth / bitmap.width));
      const canvas = document.createElement("canvas"); canvas.width = targetWidth; canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (format === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, targetWidth, targetHeight); }
      ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight); bitmap.close();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, format, Math.max(0.05, Math.min(1, Number(quality) / 100))));
      if (!blob) throw new Error("This browser could not export the selected format.");
      if (result?.url) URL.revokeObjectURL(result.url);
      setResult({ blob, url: URL.createObjectURL(blob), width: targetWidth, height: targetHeight });
    } catch (err) { setError(err.message); setResult(null); }
    finally { setBusy(false); }
  };
  const download = () => {
    if (!result) return;
    const extension = format.split("/")[1].replace("jpeg", "jpg");
    const a = document.createElement("a"); a.href = result.url; a.download = `compressed.${extension}`; a.click();
  };
  return (
    <ToolFrame eyebrow="Browser-local media" note="Keep the original until you have inspected the downloaded result.">
      <div className="en-file-drop"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { setFile(e.target.files?.[0] || null); setResult(null); }} /><div><strong>{file ? file.name : "Choose an image"}</strong><span>{file ? prettyBytes(file.size) : "JPEG, PNG or WebP"}</span></div></div>
      <div className="en-field-grid">
        <NumberField label="Quality" value={quality} onChange={setQuality} min="5" max="100" suffix="%" />
        <NumberField label="Maximum width" value={maxWidth} onChange={setMaxWidth} min="1" step="1" suffix="px" />
        <label className="en-field"><span>Output format</span><select value={format} onChange={(e) => setFormat(e.target.value)}><option value="image/webp">WebP</option><option value="image/jpeg">JPEG</option><option value="image/png">PNG</option></select></label>
      </div>
      {error && <p className="en-error">{error}</p>}
      {result && <ResultGrid items={[{ label: "Output size", value: prettyBytes(result.blob.size), primary: true }, { label: "Dimensions", value: `${result.width} × ${result.height}` }, { label: "Size change", value: file ? `${number.format((1 - result.blob.size / file.size) * 100)}%` : "—", note: "Positive means smaller" }]} />}
      <div className="en-actions"><button onClick={compress} disabled={!file || busy}>{busy ? "Compressing…" : "Compress image"}</button><button className="ghost" onClick={download} disabled={!result}>Download result</button></div>
    </ToolFrame>
  );
}

function PdfMerger() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const move = (index, direction) => setFiles((current) => {
    const next = [...current];
    const target = index + direction;
    if (target < 0 || target >= next.length) return current;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  });
  const merge = async () => {
    if (files.length < 2) return;
    setBusy(true); setError(""); setDone("");
    try {
      const { PDFDocument } = await import("@cantoo/pdf-lib");
      const merged = await PDFDocument.create();
      for (const file of files) {
        const source = await PDFDocument.load(await file.arrayBuffer());
        const pages = await merged.copyPages(source, source.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "merged.pdf"; a.click(); URL.revokeObjectURL(url);
      setDone(`Merged ${files.length} files into ${prettyBytes(blob.size)}.`);
    } catch (err) { setError(`Merge failed: ${err.message}`); }
    finally { setBusy(false); }
  };
  return (
    <ToolFrame eyebrow="Browser-local documents" note="Large PDFs can use significant device memory. Merge smaller batches if needed.">
      <div className="en-file-drop"><input type="file" multiple accept="application/pdf,.pdf" onChange={(e) => { setFiles(Array.from(e.target.files || [])); setDone(""); }} /><div><strong>Choose two or more PDFs</strong><span>Files stay on this device</span></div></div>
      {files.length > 0 && <ol className="en-file-list">{files.map((file, index) => <li key={`${file.name}-${file.lastModified}`}><span><b>{index + 1}</b><span>{file.name}<small>{prettyBytes(file.size)}</small></span></span><div><button className="mini" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Move ${file.name} up`}>↑</button><button className="mini" onClick={() => move(index, 1)} disabled={index === files.length - 1} aria-label={`Move ${file.name} down`}>↓</button><button className="mini danger" onClick={() => setFiles((current) => current.filter((_, i) => i !== index))} aria-label={`Remove ${file.name}`}>×</button></div></li>)}</ol>}
      {error && <p className="en-error">{error}</p>}{done && <p className="en-success">{done}</p>}
      <div className="en-actions"><button onClick={merge} disabled={files.length < 2 || busy}>{busy ? "Merging…" : "Merge and download"}</button></div>
    </ToolFrame>
  );
}

function ToolFrame({ eyebrow, note, children }) {
  return (
    <section className="en-workbench">
      <div className="en-workbench-head"><span>{eyebrow}</span><small>LOCAL COMPUTE</small></div>
      <div className="en-workbench-body">{children}</div>
      <p className="en-workbench-note"><span>i</span>{note}</p>
    </section>
  );
}

const registry = {
  "roas-calculator": RoasCalculator,
  "marketing-metrics-calculator": MarketingMetrics,
  "profit-margin-calculator": ProfitMarginCalculator,
  "markup-calculator": MarkupCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "mortgage-payment-calculator": MortgageCalculator,
  "business-days-calculator": BusinessDaysCalculator,
  "csv-json-converter": CsvJsonConverter,
  "image-compressor": ImageCompressor,
  "pdf-merger": PdfMerger,
};

export default function EnglishToolRenderer({ slug }) {
  const Component = registry[slug];
  return Component ? <Component /> : null;
}
