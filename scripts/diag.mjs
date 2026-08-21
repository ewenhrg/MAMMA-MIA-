/**
 * Final quality pass: accessibility structure, the mobile menu, the gallery
 * lightbox, and a reduced-motion render.
 */
import { chromium } from "playwright";

const base = "http://localhost:3000";
const outDir = ".shots";
const problems = [];
const browser = await chromium.launch({ channel: "msedge" });

/* ---------- Structure & accessibility ---------- */

const deskContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await deskContext.newPage();
await page.goto(`${base}/en`, { waitUntil: "networkidle" });
await page.waitForTimeout(2600);

const audit = await page.evaluate(() => {
  const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((el) => ({
    level: Number(el.tagName[1]),
    text: (el.textContent ?? "").trim().slice(0, 48),
  }));

  const issues = [];

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) issues.push(`expected exactly one h1, found ${h1s.length}`);

  let previous = 1;
  for (const heading of headings) {
    if (heading.level > previous + 1) {
      issues.push(`heading jumps h${previous} -> h${heading.level} at "${heading.text}"`);
    }
    previous = heading.level;
  }

  for (const img of document.querySelectorAll("img")) {
    if (!img.getAttribute("alt") && img.getAttribute("aria-hidden") !== "true") {
      issues.push(`image without alt: ${img.getAttribute("src")?.slice(0, 60)}`);
    }
  }

  for (const el of document.querySelectorAll("a,button")) {
    const label =
      (el.textContent ?? "").trim() ||
      el.getAttribute("aria-label") ||
      el.getAttribute("title");
    if (!label) issues.push(`control without accessible name: <${el.tagName.toLowerCase()}>`);
  }

  for (const el of document.querySelectorAll("a[target=_blank]")) {
    const rel = el.getAttribute("rel") ?? "";
    if (!rel.includes("noopener")) issues.push(`external link missing rel=noopener: ${el.getAttribute("href")}`);
  }

  const svgIssues = [...document.querySelectorAll("svg")].filter(
    (svg) => !svg.closest("[aria-hidden=true]") && !svg.getAttribute("aria-hidden"),
  ).length;
  if (svgIssues) issues.push(`${svgIssues} decorative svg(s) not hidden from screen readers`);

  return {
    issues,
    landmarks: {
      header: document.querySelectorAll("header").length,
      main: document.querySelectorAll("main").length,
      footer: document.querySelectorAll("footer").length,
      nav: document.querySelectorAll("nav").length,
    },
    lang: document.documentElement.lang,
  };
});

problems.push(...audit.issues.map((issue) => `[a11y] ${issue}`));
if (audit.landmarks.main !== 1) problems.push(`[a11y] expected one <main>, found ${audit.landmarks.main}`);
if (audit.lang !== "en") problems.push(`[a11y] unexpected html lang: ${audit.lang}`);

/* ---------- Keyboard: skip link then gallery lightbox ---------- */

await page.keyboard.press("Tab");
const focusedFirst = await page.evaluate(() => document.activeElement?.textContent?.trim());
if (focusedFirst !== "Skip to main content") {
  problems.push(`[keyboard] first tab stop is "${focusedFirst}", expected the skip link`);
}

await page.evaluate(() => document.querySelector("#gallery")?.scrollIntoView());
await page.waitForTimeout(1200);
await page.locator("#gallery button[data-cursor]").first().click();
await page.waitForTimeout(700);
const dialogOpen = await page.locator("[role=dialog]").count();
if (!dialogOpen) problems.push("[gallery] lightbox did not open");
await page.screenshot({ path: `${outDir}/qa-lightbox.png` });
await page.keyboard.press("Escape");
await page.waitForTimeout(600);
if (await page.locator("[role=dialog]").count()) problems.push("[gallery] Escape did not close the lightbox");
await deskContext.close();

/* ---------- Mobile menu ---------- */

const mobileContext = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const mobile = await mobileContext.newPage();
await mobile.goto(`${base}/fr`, { waitUntil: "networkidle" });
await mobile.waitForTimeout(2600);
await mobile.locator("header button").last().click();
await mobile.waitForTimeout(900);
await mobile.screenshot({ path: `${outDir}/qa-mobile-menu.png` });
const locked = await mobile.evaluate(() => document.body.classList.contains("is-locked"));
if (!locked) problems.push("[mobile menu] body scroll was not locked");
const menuOverflow = await mobile.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
);
if (menuOverflow > 1) problems.push(`[mobile menu] horizontal overflow: ${menuOverflow}px`);
await mobileContext.close();

/* ---------- Reduced motion ---------- */

const calmContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const calm = await calmContext.newPage();
await calm.goto(`${base}/en`, { waitUntil: "networkidle" });
await calm.waitForTimeout(1500);
await calm.screenshot({ path: `${outDir}/qa-reduced-motion.png` });

// Headlines must be readable without any animation having run.
await calm.evaluate(() => document.querySelector("#drinks")?.scrollIntoView());
await calm.waitForTimeout(2500);
const calmState = await calm.evaluate(() => ({
  queryMatches: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  words: [...document.querySelectorAll("#drinks h2 span span span")].map((word) => ({
    text: word.textContent?.trim(),
    opacity: getComputedStyle(word).opacity,
    transform: getComputedStyle(word).transform,
  })),
}));
if (!calmState.queryMatches) problems.push("[reduced motion] emulation did not apply");
const hidden = calmState.words.filter((word) => Number(word.opacity) < 0.9);
if (hidden.length) {
  problems.push(
    `[reduced motion] ${hidden.length} headline word(s) invisible: ${JSON.stringify(hidden)}`,
  );
}
await calm.screenshot({ path: `${outDir}/qa-reduced-motion-drinks.png` });
await calmContext.close();

await browser.close();
console.log(problems.length ? problems.join("\n") : "No problems detected.");
