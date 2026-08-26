export async function readFileBytes(file) {
  return new Uint8Array(await file.arrayBuffer());
}

export function downloadBytes(bytes, filename, type = "application/pdf") {
  const blob = new Blob([bytes], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function fmtBytes(n) {
  if (!isFinite(n)) return "—";
  if (n < 1024) return n + " B";
  if (n < 1024 ** 2) return (n / 1024).toFixed(1) + " KB";
  if (n < 1024 ** 3) return (n / 1024 ** 2).toFixed(1) + " MB";
  return (n / 1024 ** 3).toFixed(2) + " GB";
}

// "1-3,5,7-9" -> [0,1,2,4,6,7,8] (0-based). Pages outside 0..max-1 are ignored.
export function parseRanges(str, max) {
  const out = new Set();
  const parts = String(str || "").split(",");
  for (const part of parts) {
    const t = part.trim();
    const m = t.match(/^(\d+)\s*-\s*(\d+)$/);
    if (m) {
      const s = Math.max(0, parseInt(m[1], 10) - 1);
      const e = Math.min(max - 1, parseInt(m[2], 10) - 1);
      for (let i = s; i <= e; i++) out.add(i);
    } else if (/^\d+$/.test(t)) {
      const idx = parseInt(t, 10) - 1;
      if (idx >= 0 && idx < max) out.add(idx);
    }
  }
  return Array.from(out).sort((a, b) => a - b);
}
