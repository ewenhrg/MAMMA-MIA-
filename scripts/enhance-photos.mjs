/**
 * One-off mitigation for the undersized source photos in public/photos/
 * (WhatsApp-compressed exports, ~575-770px wide). Re-samples each file with
 * a high-quality upscale (lanczos3) plus a mild unsharp mask, which reads
 * noticeably crisper than the browser's own CSS upscale of the tiny
 * originals. This cannot recover real detail — swap in real high-res
 * photography when available and delete this script.
 */
import { readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "photos");
const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".png"));

const MAX_LONG_EDGE = 1800;
const SCALE = 2.2;

for (const file of files) {
  const filePath = path.join(dir, file);
  const image = sharp(filePath);
  const { width, height } = await image.metadata();
  if (!width || !height) continue;

  const longEdge = Math.max(width, height);
  const scale = Math.min(SCALE, MAX_LONG_EDGE / longEdge);
  const targetWidth = Math.round(width * scale);
  const targetHeight = Math.round(height * scale);

  const buffer = await sharp(filePath)
    .resize(targetWidth, targetHeight, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 0.3 })
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();

  const tmpPath = `${filePath}.tmp`;
  await writeFile(tmpPath, buffer);
  await rename(tmpPath, filePath);
  console.log(`${file}: ${width}x${height} -> ${targetWidth}x${targetHeight}`);
}
