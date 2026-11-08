// icons/icon.svg + icons/icon-maskable.svg -> PNGs (192, 512, maskable 512, apple 180)
// Chalaane ka tareeqa:  npm install --no-save @resvg/resvg-js && node tools/build-icons.mjs
// GitHub Actions khud chala kar PNGs commit kar deta hai (.github/workflows/icons.yml).
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const jobs = [
  ['icons/icon.svg', 'icons/icon-192.png', 192],
  ['icons/icon.svg', 'icons/icon-512.png', 512],
  ['icons/icon-maskable.svg', 'icons/icon-maskable-512.png', 512],
  ['icons/icon.svg', 'icons/apple-touch-icon.png', 180]
];

for (const [src, out, size] of jobs) {
  const svg = readFileSync(root + src);
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(root + out, png);
  console.log(out, png.length, 'bytes');
}
