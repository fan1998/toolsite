// Scan all live tool pages for console errors / failed renders
import { chromium } from "playwright";
import fs from "fs";

const slugs = JSON.parse(fs.readFileSync("slugs.json", "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage();
const results = [];
for (const slug of slugs) {
  const errors = [];
  const onConsole = (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); };
  const onPageError = (e) => errors.push("PAGEERROR: " + String(e).slice(0, 200));
  page.on("console", onConsole); page.on("pageerror", onPageError);
  let ok = true;
  try {
    await page.goto(`https://www.fanjian.org/tools/${slug}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500);
    // check the main panel actually rendered (tool component mounted)
    const hasPanel = await page.locator(".panel, .card, form, button, input").count();
    if (hasPanel === 0) { ok = false; errors.push("no interactive elements rendered"); }
    const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 100));
    if (/Application error|404|This page could not/i.test(bodyText)) { ok = false; errors.push("body: " + bodyText.replace(/\n/g, " ")); }
  } catch (e) {
    ok = false; errors.push("NAV: " + String(e).slice(0, 150));
  }
  results.push({ slug, ok, errors });
  page.off("console", onConsole); page.off("pageerror", onPageError);
}
await browser.close();
const bad = results.filter(r => !r.ok || r.errors.length);
console.log("TOTAL:", results.length, "BAD:", bad.length);
for (const r of bad) console.log(JSON.stringify(r));
fs.writeFileSync("scan-results.json", JSON.stringify(results, null, 1));
