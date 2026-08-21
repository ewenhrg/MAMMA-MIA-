/**
 * Prepares the official Mamma Mia logo for web use.
 *
 * The supplied master file is a 24-bit PNG with no alpha: the circular badge sits
 * on a flat grey backdrop. This script only removes that backdrop and trims the
 * canvas — the artwork inside the badge is never redrawn, recoloured or rescaled
 * beyond uniform resizing.
 *
 * Usage: npm run brand:logo -- <path-to-master-file>
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const outputDir = resolve(projectRoot, "public/brand");

const source = process.argv[2];

if (!source) {
  console.error("Provide the path to the master logo file.");
  process.exit(1);
}
if (!existsSync(source)) {
  console.error(`File not found: ${source}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const image = sharp(source).ensureAlpha();
const { width, height } = await image.metadata();

if (!width || !height) {
  console.error("Could not read image dimensions.");
  process.exit(1);
}

const { data, info } = await image
  .raw()
  .toBuffer({ resolveWithObject: true });

// Sample the corners to learn the backdrop colour we need to drop.
const channels = info.channels;
const pixelAt = (x, y) => {
  const i = (y * info.width + x) * channels;
  return [data[i], data[i + 1], data[i + 2]];
};
const corners = [
  pixelAt(0, 0),
  pixelAt(info.width - 1, 0),
  pixelAt(0, info.height - 1),
  pixelAt(info.width - 1, info.height - 1),
];
const backdrop = corners[0].map(
  (_, channel) =>
    corners.reduce((sum, corner) => sum + corner[channel], 0) / corners.length,
);

const TOLERANCE = 26;
const isBackdrop = (r, g, b) =>
  Math.abs(r - backdrop[0]) < TOLERANCE &&
  Math.abs(g - backdrop[1]) < TOLERANCE &&
  Math.abs(b - backdrop[2]) < TOLERANCE;

// Flood fill inward from the edges so backdrop-coloured pixels *inside* the
// badge artwork are preserved.
const transparent = new Uint8Array(info.width * info.height);
const queue = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= info.width || y >= info.height) return;
  const index = y * info.width + x;
  if (transparent[index]) return;
  const offset = index * channels;
  if (!isBackdrop(data[offset], data[offset + 1], data[offset + 2])) return;
  transparent[index] = 1;
  queue.push(index);
};

for (let x = 0; x < info.width; x += 1) {
  push(x, 0);
  push(x, info.height - 1);
}
for (let y = 0; y < info.height; y += 1) {
  push(0, y);
  push(info.width - 1, y);
}

while (queue.length) {
  const index = queue.pop();
  const x = index % info.width;
  const y = (index - x) / info.width;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

let minX = info.width;
let minY = info.height;
let maxX = -1;
let maxY = -1;

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const index = y * info.width + x;
    if (transparent[index]) {
      data[index * channels + 3] = 0;
      continue;
    }
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

if (maxX < 0) {
  console.error("Everything was detected as backdrop — aborting.");
  process.exit(1);
}

const cropped = sharp(data, {
  raw: { width: info.width, height: info.height, channels },
}).extract({
  left: minX,
  top: minY,
  width: maxX - minX + 1,
  height: maxY - minY + 1,
});

const master = await cropped.png({ compressionLevel: 9 }).toBuffer();
const meta = await sharp(master).metadata();

await sharp(master).toFile(resolve(outputDir, "logo.png"));
await sharp(master)
  .resize({ width: 512 })
  .png({ compressionLevel: 9 })
  .toFile(resolve(outputDir, "logo-512.png"));
await sharp(master)
  .resize({ width: 180, height: 180, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(resolve(outputDir, "apple-icon.png"));
await sharp(master)
  .resize({ width: 32, height: 32, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(resolve(outputDir, "favicon.png"));

console.log(`Logo prepared: ${meta.width}x${meta.height} -> public/brand/`);
