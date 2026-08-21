/**
 * Visual QC helper: captures the site at the breakpoints we care about and
 * reports any console errors or horizontal overflow.
 *
 * Usage: node scripts/shots.mjs [baseUrl]
 */
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = ".shots";
mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "mobile-375", width: 375, height: 812, mobile: true },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
  { name: "mobile-430", width: 430, height: 932, mobile: true },
  { name: "tablet-768", width: 768, height: 1024, mobile: true },
  { name: "laptop-1366", width: 1366, height: 768, mobile: false },
  { name: "laptop-1440", width: 1440, height: 900, mobile: false },
  { name: "desktop-1920", width: 1920, height: 1080, mobile: false },
];

const scrollStops = [0, 0.14, 0.3, 0.46, 0.6, 0.74, 0.88, 1];

const browser = await chromium.launch({ channel: "msedge" });
const problems = [];

for (const view of viewports) {
  const context = await browser.newContext({
    viewport: { width: view.width, height: view.height },
    deviceScaleFactor: 2,
    isMobile: view.mobile,
    hasTouch: view.mobile,
    locale: "en-GB",
  });
  const page = await context.newPage();

  page.on("console", (message) => {
    if (message.type() === "error") {
      problems.push(`[${view.name}] console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    problems.push(`[${view.name}] pageerror: ${error.message}`);
  });

  await page.goto(`${base}/en`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2600); // let the intro finish

  const height = await page.evaluate(() => document.body.scrollHeight);

  for (const [index, stop] of scrollStops.entries()) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(stop * (height - view.height)));
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${outDir}/${view.name}-${index}.png` });
  }

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 1) problems.push(`[${view.name}] horizontal overflow: ${overflow}px`);

  const mood = await page.evaluate(() => document.documentElement.dataset.mood);
  if (mood !== "night") problems.push(`[${view.name}] journey did not reach night (mood=${mood})`);

  await context.close();
}

// French pass on one breakpoint.
const frContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const frPage = await frContext.newPage();
await frPage.goto(`${base}/fr`, { waitUntil: "networkidle" });
await frPage.waitForTimeout(2600);
await frPage.screenshot({ path: `${outDir}/fr-mobile.png` });
const frOverflow = await frPage.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
if (frOverflow > 1) problems.push(`[fr-390] horizontal overflow: ${frOverflow}px`);
await frContext.close();

await browser.close();

console.log(problems.length ? problems.join("\n") : "No problems detected.");
