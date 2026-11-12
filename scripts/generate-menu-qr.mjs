/**
 * Generates a printable QR code pointing to the digital menu.
 * Usage: node scripts/generate-menu-qr.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPng = join(root, "public", "menu-qr.png");
const outUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://mammamiahrg.com";
const menuUrl = `${outUrl}/menu`;

mkdirSync(dirname(outPng), { recursive: true });

const py = `
import sys
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont

url = sys.argv[1]
out = sys.argv[2]

qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=18,
    border=2,
)
qr.add_data(url)
qr.make(fit=True)
img = qr.make_image(fill_color="#0a0a0a", back_color="#fbf4e6").convert("RGB")

# Canvas with brand label for print / table tents
pad_x, pad_top, pad_bottom = 48, 72, 96
canvas = Image.new("RGB", (img.width + pad_x * 2, img.height + pad_top + pad_bottom), "#fbf4e6")
canvas.paste(img, (pad_x, pad_top))
draw = ImageDraw.Draw(canvas)

def fit_font(size):
    for name in ("arial.ttf", "Arial.ttf", "segoeui.ttf", "DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()

title_font = fit_font(36)
sub_font = fit_font(22)
title = "MAMMA MIA"
subtitle = "Scan for the menu"
tw = draw.textlength(title, font=title_font)
sw = draw.textlength(subtitle, font=sub_font)
draw.text(((canvas.width - tw) / 2, 22), title, fill="#0a0a0a", font=title_font)
draw.text(((canvas.width - sw) / 2, canvas.height - 62), subtitle, fill="#3d5566", font=sub_font)

canvas.save(out, "PNG")
print(out)
`;

const result = spawnSync("python", ["-c", py, menuUrl, outPng], {
  encoding: "utf8",
  cwd: root,
});

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || "Failed to generate QR");
  process.exit(result.status ?? 1);
}

console.log(`QR ready → ${outPng}`);
console.log(`URL      → ${menuUrl}`);
